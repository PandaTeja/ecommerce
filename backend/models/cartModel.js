const db = require('./database');

exports.addToCart = (userId, item) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO cart (userId, itemName, price) VALUES (?, ?, ?)`,
      [userId, item.name, item.price],
      function (err) {
        if (err) return reject(err);
        resolve(this.lastID);
      }
    );
  });
};

exports.getUserCart = (userId) => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM cart WHERE userId = ?`, [userId], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

exports.clearUserCart = (userId) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM cart WHERE userId = ?`, [userId], function (err) {
      if (err) return reject(err);
      resolve(this.changes);
    });
  });
};
