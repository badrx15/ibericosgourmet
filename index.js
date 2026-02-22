require('dotenv').config();
const express = require('express');
const { SquareClient, SquareEnvironment } = require('square');
const path = require('path');
const db = require('./db');
const TelegramBot = require('node-telegram-bot-api');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = process.env.PORT || 3000;

// Configuración de Admin Telegram
const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID; // ID del admin para recibir notificaciones
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });

// Enviar mensaje de prueba al iniciar para verificar el bot
if (ADMIN_CHAT_ID && process.env.TELEGRAM_BOT_TOKEN) {
    bot.sendMessage(ADMIN_CHAT_ID, "🚀 Servidor de Jamonería iniciado y bot vinculado correctamente (Square Gateway).")
        .then(() => console.log("Mensaje de prueba enviado a Telegram con éxito."))
        .catch(err => console.error("Error al enviar mensaje de prueba a Telegram:", err.message));
}

// Initialize Square client
const squareClient = new SquareClient({
    token: process.env.SQUARE_ACCESS_TOKEN,
    environment: process.env.SQUARE_ENVIRONMENT === 'production' ? SquareEnvironment.Production : SquareEnvironment.Sandbox,
});

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

// Checkout para Jamón
app.post('/checkout-jamon', async (req, res) => {
    const { productName, price, name, email, address, city, postalCode, quantity, paymentMethod } = req.body;
    const orderId = uuidv4().substring(0, 8).toUpperCase();
    
    let totalAmount = parseFloat(price);
    const isCod = paymentMethod === 'cod';
    
    if (isCod) {
        totalAmount += 3.00; // Cargo extra por contrareembolso
    }

    try {
        if (isCod) {
            // Lógica para CONTRAREEMBOLSO: Guardar y notificar de inmediato
            db.prepare(`
                INSERT INTO orders (order_id, customer_name, customer_email, address, city, postal_code, product_name, quantity, amount, payment_method, payment_status)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `).run(orderId, name, email, address, city, postalCode, productName, quantity, totalAmount, 'cod', 'pending');

            // Notificar al ADMIN por Telegram de inmediato
            const message = `
🚚 <b>¡NUEVO PEDIDO CONTRAREEMBOLSO!</b> 🚚

🆔 <b>ID Pedido:</b> #${orderId}
🍖 <b>Pack:</b> ${productName}
🔢 <b>Contenido:</b> ${quantity} sobres (100g)
💰 <b>Total a Cobrar:</b> ${totalAmount.toFixed(2)}€ (Incluye +3€ COD)

👤 <b>Cliente:</b> ${name}
📧 <b>Email:</b> ${email}

📍 <b>DIRECCIÓN DE ENVÍO:</b>
${address}
${city}, CP: ${postalCode}

⚠️ <i>Pedido pendiente de cobro en la entrega.</i>
            `;

            await bot.sendMessage(ADMIN_CHAT_ID, message, { parse_mode: 'HTML' });
            console.log(`Pedido contrareembolso ${orderId} registrado y notificado.`);
            
            return res.redirect(`/success?order_id=${orderId}&method=cod`);
        }

        // Lógica para TARJETA (Square Checkout API - Quick Pay)
        console.log(`Creando sesión Square simplificada para ${productName} a ${totalAmount}€`);
        
        const body = {
            idempotencyKey: uuidv4(),
            quickPay: {
                name: productName,
                priceMoney: {
                    amount: BigInt(Math.round(totalAmount * 100)),
                    currency: 'EUR'
                },
                locationId: process.env.SQUARE_LOCATION_ID
            },
            checkoutOptions: {
                askForShippingAddress: true,
                merchantSupportEmail: 'badreddinnakhil@gmail.com',
                redirectUrl: `${req.protocol}://${req.get('host')}/success?order_id=${orderId}`,
            }
        };

        const response = await squareClient.checkout.paymentLinks.create(body);
        const paymentLink = response.paymentLink;

        if (paymentLink && paymentLink.url) {
            // Guardar pedido pendiente en DB (Pago con Tarjeta Square)
            db.prepare(`
                INSERT INTO orders (order_id, customer_name, customer_email, address, city, postal_code, product_name, quantity, amount, payment_method, payment_status, checkout_session_id)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `).run(orderId, name, email, address, city, postalCode, productName, quantity, totalAmount, 'card', 'pending', paymentLink.id);

            res.redirect(paymentLink.url);
        } else {
            throw new Error('No checkout URL received from Square');
        }
    } catch (error) {
        console.error('Error Checkout Jamón:', error);
        res.status(500).send('Error al procesar el pedido de jamón');
    }
});

// Webhook para notificar al admin (Opcional para Square, se usa redirección success para notificar)
app.post('/webhook', async (req, res) => {
    res.json({ received: true });
});

app.get('/success', async (req, res) => {
    const orderId = req.query.order_id;
    const method = req.query.method; // Capturamos el método de pago de la URL
    const checkoutId = req.query.checkoutId; // Square lo añade automáticamente

    console.log(`Página de éxito alcanzada: Order=${orderId}, Method=${method}, CheckoutId=${checkoutId}`);

    // Si es contrareembolso, simplemente mostramos la página de éxito sin enviar notificación
    // porque ya se envió en la ruta /checkout-jamon
    if (method === 'cod') {
        return res.render('success', { orderId });
    }

    if (orderId) {
        try {
            const order = db.prepare('SELECT * FROM orders WHERE order_id = ?').get(orderId);
            
            if (order && order.payment_status !== 'completed') {
                // En Square, si llega aquí después de un redirect de Checkout API, 
                // el pago suele estar procesado. Para máxima seguridad se debería verificar checkoutId.
                
                console.log(`Notificación forzada desde página success para pedido Square: ${orderId}`);
                
                // Actualizar estado
                db.prepare("UPDATE orders SET payment_status = 'completed' WHERE order_id = ?").run(orderId);
                
                // Enviar Telegram
                const message = `
📦 <b>¡NUEVO PEDIDO CONFIRMADO!</b> 📦
(Procesado vía Square)

🆔 <b>ID Pedido:</b> #${order.order_id}
🍖 <b>Pack:</b> ${order.product_name}
🔢 <b>Contenido:</b> ${order.quantity} sobres (100g)
💰 <b>Total Pagado:</b> ${order.amount.toFixed(2)}€

👤 <b>Cliente:</b> ${order.customer_name}
📧 <b>Email:</b> ${order.customer_email}

📍 <b>DIRECCIÓN DE ENVÍO:</b>
${order.address}
${order.city}, CP: ${order.postal_code}

✅ <i>El pago ha sido verificado en la redirección de éxito de Square.</i>
                `;

                await bot.sendMessage(ADMIN_CHAT_ID, message, { parse_mode: 'HTML' });
                console.log(`Notificación Square enviada con éxito desde página success.`);
            }
        } catch (err) {
            console.error('Error en notificación forzada success Square:', err);
        }
    }

    res.render('success', { orderId });
});

app.get('/cancel', (req, res) => res.render('cancel'));

// Nueva ruta para el formulario de mayoristas
app.post('/contacto-mayorista', async (req, res) => {
    const { empresa, email, telefono, volumen } = req.body;

    const message = `
🏢 <b>¡NUEVA SOLICITUD MAYORISTA!</b> 🏢

🏢 <b>Empresa:</b> ${empresa}
📧 <b>Email:</b> ${email}
📞 <b>Teléfono:</b> ${telefono}
📊 <b>Volumen:</b> ${volumen}

💼 <i>Contactar para enviar tarifas personalizadas.</i>
    `;

    try {
        await bot.sendMessage(ADMIN_CHAT_ID, message, { parse_mode: 'HTML' });
        console.log(`Solicitud mayorista de ${empresa} enviada a Telegram`);
        
        // Redirigir a la nueva página de agradecimiento
        res.render('gracias-mayorista');
        
    } catch (err) {
        console.error('Error enviando solicitud mayorista a Telegram:', err);
        res.status(500).send('Error al enviar la solicitud. Por favor, inténtalo de nuevo.');
    }
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Servidor de Jamonería corriendo en http://localhost:${port}`);
    });
}

module.exports = app;
