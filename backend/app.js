require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const cartRoutes = require('./routes/cart');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/cart', cartRoutes);
app.use('/admin', adminRoutes);

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.MAIN_PORT ;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
