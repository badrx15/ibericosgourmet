const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

let db;
try {
    // Check if we are in a Vercel environment
    // VERCEL is set to '1' in Vercel.
    const isVercel = process.env.VERCEL === '1';
    
    if (isVercel) {
        // Use in-memory database for Vercel (Ephemeral, safe, fast)
        console.log('Running on Vercel: Using in-memory SQLite database');
        db = new Database(':memory:');
    } else {
        // Local development: Use file-based DB
        const dbPath = path.join(__dirname, 'database.sqlite');
        db = new Database(dbPath);
    }
} catch (err) {
    console.error('Failed to initialize database:', err);
    // Fallback to memory in case of any error (e.g. read-only filesystem)
    console.log('Falling back to in-memory database');
    db = new Database(':memory:');
}

// Create tables if they don't exist
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
