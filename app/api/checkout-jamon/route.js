import { NextResponse } from 'next/server';
import { SquareClient, SquareEnvironment } from 'square';
import TelegramBot from 'node-telegram-bot-api';
import { v4 as uuidv4 } from 'uuid';
import prisma from '@/lib/prisma';

// Configuración de Square
const squareClient = new SquareClient({
    token: process.env.SQUARE_ACCESS_TOKEN || 'sandbox-token-placeholder',
    environment: process.env.SQUARE_ENVIRONMENT === 'production' ? SquareEnvironment.Production : SquareEnvironment.Sandbox,
});

// Configuración de Telegram
const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID;
const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
let bot = null;

if (telegramToken) {
    try {
        bot = new TelegramBot(telegramToken, { polling: false });
    } catch (error) {
        console.error("Error inicializando Telegram Bot:", error);
    }
}

export async function POST(request) {
    try {
        const formData = await request.formData();
        const productName = formData.get('productName');
        const price = parseFloat(formData.get('price'));
        const quantity = parseInt(formData.get('quantity'));
        const paymentMethod = formData.get('paymentMethod');
        
        const name = formData.get('name');
        const email = formData.get('email') || 'No especificado';
        const phone = formData.get('phone');
        const address = formData.get('address');
        const city = formData.get('city');
        const postalCode = formData.get('postalCode');

        const orderId = uuidv4().substring(0, 8).toUpperCase();
        
        let totalAmount = price;
        const isCod = paymentMethod === 'cod';
        
        // Guardar pedido en base de datos
        try {
            await prisma.order.create({
                data: {
                    orderId,
                    productName,
                    quantity,
                    totalAmount,
                    paymentMethod,
                    status: isCod ? 'pending' : 'pending_payment',
                    customerName: name,
                    email,
                    phone,
                    address,
                    city,
                    postalCode
                }
            });
        } catch (dbError) {
            console.error('Error guardando pedido en DB:', dbError);
            // No bloqueamos el flujo si falla la DB, pero lo logueamos
        }

        // Lógica para CONTRAREEMBOLSO
        if (isCod) {
            // Notificar al ADMIN por Telegram de inmediato
            if (bot && ADMIN_CHAT_ID) {
                const message = `
🚚 <b>¡NUEVO PEDIDO CONTRAREEMBOLSO!</b> 🚚

🆔 <b>ID Pedido:</b> #${orderId}
🍖 <b>Pack:</b> ${productName}
🔢 <b>Contenido:</b> ${quantity} sobres (100g)
💰 <b>Total a Cobrar:</b> ${totalAmount.toFixed(2)}€ (Precio COD)

👤 <b>Cliente:</b> ${name}
📞 <b>Teléfono:</b> ${phone}
📧 <b>Email:</b> ${email}

📍 <b>DIRECCIÓN DE ENVÍO:</b>
${address}
${city}, CP: ${postalCode}

⚠️ <i>Pedido pendiente de cobro en la entrega.</i>
                `;
                await bot.sendMessage(ADMIN_CHAT_ID, message, { parse_mode: 'HTML' });
            }
            
            // Redirigir a success
            return NextResponse.redirect(new URL(`/success?orderId=${orderId}&method=cod&amount=${totalAmount}&product=${encodeURIComponent(productName)}`, request.url), 303);
        }

        // Lógica para TARJETA (Square Checkout API)
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
                redirectUrl: `${new URL(request.url).origin}/success?orderId=${orderId}&method=card&amount=${totalAmount}&product=${encodeURIComponent(productName)}`,
            }
        };

        console.log("Enviando petición a Square...");

        const response = await squareClient.checkout.paymentLinks.create(body);
        
        // Serializar respuesta de forma segura (BigInt)
        console.log("Respuesta de Square:", JSON.stringify(response, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ));

        // Adaptar manejo de respuesta para SDK v44+
        // Puede venir directamente en response.paymentLink o en response.result.paymentLink
        const paymentLink = response.paymentLink || (response.result && response.result.paymentLink);

        if (paymentLink && paymentLink.url) {
            // Notificar intento de pago (opcional, o hacerlo en success)
            if (bot && ADMIN_CHAT_ID) {
                const message = `
💳 <b>INTENTO DE PAGO CON TARJETA</b> 💳

🆔 <b>ID Pedido:</b> #${orderId}
💰 <b>Total:</b> ${totalAmount.toFixed(2)}€
🔗 <b>Link Generado:</b> <a href="${paymentLink.url}">Pagar Aquí</a>

👤 <b>Cliente:</b> ${name}
📞 <b>Teléfono:</b> ${phone}
📧 <b>Email:</b> ${email}

<i>El cliente ha sido redirigido a la pasarela de pago.</i>
                `;
                try {
                    await bot.sendMessage(ADMIN_CHAT_ID, message, { parse_mode: 'HTML' });
                } catch (telegramError) {
                    console.error("Error enviando notificación a Telegram:", telegramError);
                }
            }

            return NextResponse.redirect(paymentLink.url, 303);
        } else {
            console.error('Error al crear link de pago:', response);
            return NextResponse.json({ error: 'No se pudo generar el link de pago' }, { status: 500 });
        }

    } catch (error) {
        console.error('Error Checkout Jamón:', error);
        if (error.errors) {
            console.error('Detalles del error de Square:', JSON.stringify(error.errors, null, 2));
        }
        return NextResponse.json({ 
            error: 'Error al procesar el pedido',
            details: error.message 
        }, { status: 500 });
    }
}
