const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');


db.serialize(() => {
  db.run(`CREATE TABLE cart (id INTEGER PRIMARY KEY, userId INTEGER, itemName TEXT, price REAL)`);
  db.run(`CREATE TABLE orders (id INTEGER PRIMARY KEY, userId INTEGER, totalAmount REAL, discount REAL)`);
  db.run(`CREATE TABLE discount_codes (id INTEGER PRIMARY KEY, code TEXT, used BOOLEAN)`);
});

module.exports = db;
