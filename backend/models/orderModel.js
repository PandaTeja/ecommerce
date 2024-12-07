const db = require('./database');

exports.placeOrder = (userId, totalAmount, discount) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO orders (userId, totalAmount, discount) VALUES (?, ?, ?)`,
      [userId, totalAmount, discount],
      function (err) {
        if (err) return reject(err);
        resolve(this.lastID);
      }
    );
  });
};

exports.getStatistics = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM orders`, [], (err, rows) => {
      if (err) return reject(err);
      const stats = rows.reduce(
        (acc, order) => {
          acc.totalItems += 1;
          acc.totalAmount += order.totalAmount;
          acc.totalDiscount += order.discount;
          return acc;
        },
        { totalItems: 0, totalAmount: 0, totalDiscount: 0 }
      );
      resolve(stats);
    });
  });
};
