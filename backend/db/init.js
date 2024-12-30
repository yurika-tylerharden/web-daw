const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'database.db');
const schemaPath = path.join(__dirname, 'schema.sql');

const db = new sqlite3.Database(dbPath);

const initDb = () => {
    const schema = fs.readFileSync(schemaPath, 'utf8');
    db.exec(schema, (err) => {
        if (err) {
            console.error('Error initializing database:', err);
        } else {
            console.log('Database initialized successfully');
        }
    });
};

module.exports = { db, initDb };