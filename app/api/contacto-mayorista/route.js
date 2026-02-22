import { NextResponse } from 'next/server';
import TelegramBot from 'node-telegram-bot-api';

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
        const empresa = formData.get('empresa');
        const email = formData.get('email');
        const telefono = formData.get('telefono');
        const volumen = formData.get('volumen');

        const message = `
🏢 <b>¡NUEVA SOLICITUD MAYORISTA!</b> 🏢

🏢 <b>Empresa:</b> ${empresa}
📧 <b>Email:</b> ${email}
📞 <b>Teléfono:</b> ${telefono}
📊 <b>Volumen:</b> ${volumen}

💼 <i>Contactar para enviar tarifas personalizadas.</i>
        `;

        if (bot && ADMIN_CHAT_ID) {
            await bot.sendMessage(ADMIN_CHAT_ID, message, { parse_mode: 'HTML' });
            console.log(`Solicitud mayorista de ${empresa} enviada a Telegram`);
        }
        
        // Redirigir a la nueva página de agradecimiento
        return NextResponse.redirect(new URL('/gracias-mayorista', request.url), 303);
        
    } catch (err) {
        console.error('Error enviando solicitud mayorista a Telegram:', err);
        return NextResponse.json({ error: 'Error al enviar la solicitud' }, { status: 500 });
    }
}
