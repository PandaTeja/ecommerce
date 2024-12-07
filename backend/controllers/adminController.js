const { orders, discountCodes } = require('../data');

exports.getStats = (req, res) => {
  try {
    const totalItems = orders.reduce((sum, order) => sum + order.items.length, 0);
    const totalAmount = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalDiscountAmount = orders.reduce((sum, order) => {
      const originalAmount = order.items.reduce((total, item) => total + item.price, 0);
      return sum + (originalAmount - order.totalAmount);
    }, 0);

    res.status(200).json({
      totalItems,
      totalAmount,
      discountCodes,
      totalDiscountAmount,
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.generateDiscountCode = (req, res) => {
  const { nthOrder, discountPercent } = req.body;

  try {
    if (!nthOrder || !discountPercent || nthOrder <= 0 || discountPercent <= 0) {
      return res.status(400).json({ message: 'Invalid nthOrder or discountPercent' });
    }

    const eligibleOrders = orders.length;
    if (eligibleOrders % nthOrder === 0) {
      const discountCode = `DISCOUNT${Math.floor(Math.random() * 1000)}`;
      discountCodes.push({
        code: discountCode,
        percent: discountPercent,
        used: false,
      });

      return res.status(201).json({
        message: 'Discount code generated successfully',
        discountCode,
      });
    }

    return res.status(400).json({
      message: `Not eligible to generate a discount code. Next eligible order is the ${nthOrder - (eligibleOrders % nthOrder)}th order.`,
    });
  } catch (error) {
    console.error('Error generating discount code:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
