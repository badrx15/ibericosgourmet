require('dotenv').config();
const express = require('express');
const DodoPayments = require('dodopayments').default;
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
    bot.sendMessage(ADMIN_CHAT_ID, "🚀 Servidor de Jamonería iniciado y bot vinculado correctamente.")
        .then(() => console.log("Mensaje de prueba enviado a Telegram con éxito."))
        .catch(err => console.error("Error al enviar mensaje de prueba a Telegram:", err.message));
}

// Initialize Dodo Payments client
const client = new DodoPayments({
    bearerToken: process.env.DODO_PAYMENTS_API_KEY,
    environment: process.env.DODO_ENVIRONMENT === 'live' ? 'live_mode' : 'test_mode'
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

        // Lógica para TARJETA (Dodo Payments SDK con Precio Dinámico Corregido)
        console.log(`Creando sesión para ${productName} a ${totalAmount}€`);
        
        const sessionDodo = await client.checkoutSessions.create({
            product_cart: [{
                product_id: process.env.DODO_PRODUCT_ID, 
                quantity: 1,
                amount: Math.round(totalAmount * 100) // Probamos con 'amount' en lugar de 'price'
            }],
            customer: {
                name: name,
                email: email
            },
            billing: {
                city: city,
                zip: postalCode,
                street: address,
                country: 'ES'
            },
            metadata: {
                order_id: orderId,
                type: 'jamon_order',
                product_name: productName,
                amount: totalAmount.toString()
            },
            return_url: `${req.protocol}://${req.get('host')}/success?order_id=${orderId}`,
        });

        if (sessionDodo && sessionDodo.checkout_url) {
            // Guardar pedido pendiente en DB (Pago con Tarjeta)
            db.prepare(`
                INSERT INTO orders (order_id, customer_name, customer_email, address, city, postal_code, product_name, quantity, amount, payment_method, payment_status, checkout_session_id)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `).run(orderId, name, email, address, city, postalCode, productName, quantity, totalAmount, 'card', 'pending', sessionDodo.checkout_session_id);

            res.redirect(sessionDodo.checkout_url);
        } else {
            throw new Error('No checkout URL received');
        }
    } catch (error) {
        console.error('Error Checkout Jamón:', error);
        res.status(500).send('Error al procesar el pedido de jamón');
    }
});

// Webhook para notificar al admin
app.post('/webhook', async (req, res) => {
    console.log('--- NUEVO EVENTO WEBHOOK ---');
    console.log('Body:', JSON.stringify(req.body, null, 2));
    
    const event = req.body;
    
    if (event.type === 'payment.succeeded' || event.type === 'payment_succeeded') {
        const payment = event.data;
        const metadata = payment.metadata || {};
        
        console.log('Metadata detectada:', metadata);
        
        if (metadata.type === 'jamon_order') {
            const orderId = metadata.order_id;
            console.log(`Procesando pedido: ${orderId}`);
            
            try {
                // Actualizar estado del pedido en DB
                db.prepare("UPDATE orders SET payment_status = 'completed' WHERE order_id = ?").run(orderId);
                
                // Obtener datos completos del pedido
                const order = db.prepare('SELECT * FROM orders WHERE order_id = ?').get(orderId);
                
                if (order) {
                    // Notificar al ADMIN por Telegram
                    const message = `
📦 <b>¡NUEVO PEDIDO CONFIRMADO!</b> 📦

🆔 <b>ID Pedido:</b> #${order.order_id}
🍖 <b>Pack:</b> ${order.product_name}
🔢 <b>Contenido:</b> ${order.quantity} sobres (100g)
💰 <b>Total Pagado:</b> ${order.amount.toFixed(2)}€

👤 <b>Cliente:</b> ${order.customer_name}
📧 <b>Email:</b> ${order.customer_email}

📍 <b>DIRECCIÓN DE ENVÍO:</b>
${order.address}
${order.city}, CP: ${order.postal_code}

✅ <i>El pago ha sido verificado correctamente vía Dodo Payments.</i>
                    `;

                    await bot.sendMessage(ADMIN_CHAT_ID, message, { parse_mode: 'HTML' });
                    console.log(`Notificación enviada al admin para el pedido ${orderId}`);
                }
            } catch (dbErr) {
                console.error('Error procesando en DB o enviando Telegram:', dbErr);
            }
        }
    }

    res.json({ received: true });
});

app.get('/success', async (req, res) => {
    const orderId = req.query.order_id;
    const paymentId = req.query.payment_id;
    const status = req.query.status;

    console.log(`Página de éxito alcanzada: Order=${orderId}, Payment=${paymentId}, Status=${status}`);

    // Si el estado es succeeded, forzamos la notificación por si el webhook falló o no está configurado
    if (status === 'succeeded' && orderId) {
        try {
            const order = db.prepare('SELECT * FROM orders WHERE order_id = ?').get(orderId);
            
            if (order && order.payment_status !== 'completed') {
                console.log(`Notificación forzada desde página success para pedido: ${orderId}`);
                
                // Actualizar estado
                db.prepare("UPDATE orders SET payment_status = 'completed' WHERE order_id = ?").run(orderId);
                
                // Enviar Telegram
                const message = `
📦 <b>¡NUEVO PEDIDO CONFIRMADO!</b> 📦
(Confirmado vía Redirección)

🆔 <b>ID Pedido:</b> #${order.order_id}
🍖 <b>Pack:</b> ${order.product_name}
🔢 <b>Contenido:</b> ${order.quantity} sobres (100g)
💰 <b>Total Pagado:</b> ${order.amount.toFixed(2)}€

👤 <b>Cliente:</b> ${order.customer_name}
📧 <b>Email:</b> ${order.customer_email}

📍 <b>DIRECCIÓN DE ENVÍO:</b>
${order.address}
${order.city}, CP: ${order.postal_code}

✅ <i>El pago ha sido verificado en la redirección de éxito.</i>
                `;

                await bot.sendMessage(ADMIN_CHAT_ID, message, { parse_mode: 'HTML' });
                console.log(`Notificación enviada con éxito desde página success.`);
            }
        } catch (err) {
            console.error('Error en notificación forzada success:', err);
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
        res.send(`
            <script>
                alert('Tu solicitud ha sido enviada con éxito. Contactaremos contigo pronto.');
                window.location.href = '/#mayorista';
            </script>
        `);
    } catch (err) {
        console.error('Error enviando solicitud mayorista a Telegram:', err);
        res.status(500).send('Error al enviar la solicitud. Por favor, inténtalo de nuevo.');
    }
});

app.listen(port, () => {
    console.log(`Servidor de Jamonería corriendo en http://localhost:${port}`);
});
