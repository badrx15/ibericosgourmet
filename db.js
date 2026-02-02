const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'database.sqlite'));

// Tabla de Pedidos de Jamón
db.prepare(`
    CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id TEXT UNIQUE,
        customer_name TEXT NOT NULL,
        customer_email TEXT NOT NULL,
        address TEXT NOT NULL,
        city TEXT NOT NULL,
        postal_code TEXT NOT NULL,
        product_name TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        amount REAL NOT NULL,
        payment_method TEXT DEFAULT 'card',
        payment_status TEXT DEFAULT 'pending',
        checkout_session_id TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`).run();

// Asegurar que la columna payment_method existe (Migración rápida)
try {
    db.prepare("ALTER TABLE orders ADD COLUMN payment_method TEXT DEFAULT 'card'").run();
    console.log("Columna payment_method añadida con éxito.");
} catch (e) {
    // Si ya existe, fallará silenciosamente
}

module.exports = db;
