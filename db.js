const path = require('path');
const fs = require('fs');

let db;

// Mock DB for Vercel (Pure JS, no native dependencies)
class MockDB {
    constructor() {
        this.orders = [];
        console.log('Using MockDB (Pure JS)');
    }

    prepare(sql) {
        sql = sql.trim().toUpperCase();
        
        // INSERT
        if (sql.startsWith('INSERT')) {
            return {
                run: (...args) => {
                    // Detect if it's card or cod based on args length
                    // COD: 11 args (no session id)
                    // CARD: 12 args (with session id)
                    const isCard = args.length >= 12;
                    
                    const order = {
                        order_id: args[0],
                        customer_name: args[1],
                        customer_email: args[2],
                        address: args[3],
                        city: args[4],
                        postal_code: args[5],
                        product_name: args[6],
                        quantity: args[7],
                        amount: args[8],
                        payment_method: args[9],
                        payment_status: args[10],
                        checkout_session_id: isCard ? args[11] : null,
                        created_at: new Date().toISOString()
                    };
                    this.orders.push(order);
                    return { changes: 1, lastInsertRowid: this.orders.length };
                }
            };
        }

        // SELECT
        if (sql.startsWith('SELECT')) {
            return {
                get: (id) => {
                    // Assuming WHERE order_id = ?
                    return this.orders.find(o => o.order_id === id);
                }
            };
        }

        // UPDATE
        if (sql.startsWith('UPDATE')) {
            return {
                run: (id) => {
                    // Assuming UPDATE ... WHERE order_id = ?
                    // The only update in index.js is for payment_status = 'completed'
                    const order = this.orders.find(o => o.order_id === id);
                    if (order) {
                        order.payment_status = 'completed';
                    }
                    return { changes: order ? 1 : 0 };
                }
            };
        }
        
        // ALTER TABLE or CREATE TABLE (ignore for mock)
        return { run: () => {} };
    }
}

try {
    // Check if we are in a Vercel environment
    const isVercel = process.env.VERCEL === '1';
    
    if (isVercel) {
        console.log('Running on Vercel: Using Pure JS Mock DB');
        db = new MockDB();
    } else {
        // Local development: Use better-sqlite3
        // Require inside the block to avoid loading native module on Vercel
        const Database = require('better-sqlite3');
        const dbPath = path.join(__dirname, 'database.sqlite');
        db = new Database(dbPath);
        
        // Create tables if they don't exist (Only for real DB)
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

        // Migration check
        try {
            db.prepare("ALTER TABLE orders ADD COLUMN payment_method TEXT DEFAULT 'card'").run();
        } catch (e) {}
    }
} catch (err) {
    console.error('Failed to initialize database, falling back to MockDB:', err);
    db = new MockDB();
}

module.exports = db;
