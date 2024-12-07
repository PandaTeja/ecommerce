const { cart, orders, discountCodes, usedCodes } = require('../data');
const NTH_ORDER = parseInt(process.env.NTH_ORDER, 10) || 5;

exports.addItem = (req, res) => {
  const { userId, item } = req.body;

  if (!item || !item.name || !item.price) {
    return res.status(400).json({ message: 'Invalid item data' });
  }

  cart.push({ userId, ...item });
  res.status(201).json({ message: 'Item added to cart' });
};

exports.checkout = (req, res) => {
  const { userId, discountCode } = req.body;

  try {
    if (!cart.length) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    let totalAmount = cart.reduce((total, item) => total + item.price, 0);

    if (discountCode) {
      const validCode = discountCodes.find(
        (code) => code.code === discountCode && !usedCodes.has(discountCode)
      );

      if (!validCode) {
        return res.status(400).json({ message: 'Invalid or already used discount code' });
      }

      validCode.used = true;
      usedCodes.add(discountCode);

      totalAmount *= 0.9; // Apply a 10% discount
    }

    orders.push({ userId, items: [...cart], totalAmount });

    cart.length = 0;

    require('../data').orderCounter++;

    if (require('../data').orderCounter % NTH_ORDER === 0) {
      const newCode = `DISCOUNT${require('../data').orderCounter}`;
      discountCodes.push({ code: newCode, used: false });
    }

    res.status(200).json({
      message: 'Order placed successfully',
      totalAmount,
      discountCode: discountCode || null,
    });
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
