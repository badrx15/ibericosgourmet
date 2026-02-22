import { NextResponse } from 'next/server';
import { Client, Environment } from 'square';
import TelegramBot from 'node-telegram-bot-api';
import { v4 as uuidv4 } from 'uuid';

// Configuración de Square
const squareClient = new Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN || 'sandbox-token-placeholder',
    environment: process.env.SQUARE_ENVIRONMENT === 'production' ? Environment.Production : Environment.Sandbox,
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
        const email = formData.get('email');
        const address = formData.get('address');
        const city = formData.get('city');
        const postalCode = formData.get('postalCode');

        const orderId = uuidv4().substring(0, 8).toUpperCase();
        
        let totalAmount = price;
        const isCod = paymentMethod === 'cod';
        
        if (isCod) {
            totalAmount += 3.00; // Cargo extra por contrareembolso
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
💰 <b>Total a Cobrar:</b> ${totalAmount.toFixed(2)}€ (Incluye +3€ COD)

👤 <b>Cliente:</b> ${name}
📧 <b>Email:</b> ${email}

📍 <b>DIRECCIÓN DE ENVÍO:</b>
${address}
${city}, CP: ${postalCode}

⚠️ <i>Pedido pendiente de cobro en la entrega.</i>
                `;
                await bot.sendMessage(ADMIN_CHAT_ID, message, { parse_mode: 'HTML' });
            }
            
            // Redirigir a success
            return NextResponse.redirect(new URL(`/success?orderId=${orderId}&method=cod`, request.url), 303);
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
                redirectUrl: `${new URL(request.url).origin}/success?orderId=${orderId}&method=card`,
            }
        };

        const response = await squareClient.checkoutApi.createPaymentLink(body);
        const paymentLink = response.result.paymentLink;

        if (paymentLink && paymentLink.url) {
            // Notificar intento de pago (opcional, o hacerlo en success)
            if (bot && ADMIN_CHAT_ID) {
                 const message = `
💳 <b>¡INTENTO DE PAGO CON TARJETA!</b> 💳

🆔 <b>ID Pedido:</b> #${orderId}
🍖 <b>Pack:</b> ${productName}
💰 <b>Importe:</b> ${totalAmount.toFixed(2)}€
👤 <b>Cliente:</b> ${name}

⏳ <i>El cliente ha sido redirigido a Square. Esperando confirmación.</i>
                `;
                await bot.sendMessage(ADMIN_CHAT_ID, message, { parse_mode: 'HTML' });
            }

            return NextResponse.redirect(paymentLink.url, 303);
        } else {
            throw new Error('No checkout URL received from Square');
        }

    } catch (error) {
        console.error('Error Checkout Jamón:', error);
        return NextResponse.json({ error: 'Error al procesar el pedido' }, { status: 500 });
    }
}
