const request = require('supertest');
const app = require('../app');
const { cart, discountCodes, usedCodes, orders } = require('../data');

describe('Cart API', () => {
  let server;

  beforeAll(() => {
    const port = process.env.TEST_PORT || 7002;
    server = app.listen(port);
  });

  afterAll((done) => {
    server.close(done);
  });

  beforeEach(() => {
    cart.length = 0;
    discountCodes.length = 0;
    usedCodes.clear();
    orders.length = 0;
    require('../data').orderCounter = 0;

    discountCodes.push({ code: 'DISCOUNT5', percent: 10, used: false });
  });

  it('should add an item to the cart', async () => {
    const res = await request(app).post('/cart/add').send({ userId: 1, item: { name: 'Book', price: 100 } });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Item added to cart');
    expect(cart.length).toBe(1);
  });

  it('should apply a valid discount code', async () => {
    await request(app).post('/cart/add').send({ userId: 1, item: { name: 'Book', price: 100 } });

    const res = await request(app).post('/cart/checkout').send({ userId: 1, discountCode: 'DISCOUNT5' });

    expect(res.status).toBe(200);
    expect(res.body.totalAmount).toBe(90); // 10% off of 100
    expect(usedCodes.has('DISCOUNT5')).toBe(true);
  });

  it('should reject an invalid discount code', async () => {
    await request(app).post('/cart/add').send({ userId: 1, item: { name: 'Book', price: 100 } });

    const res = await request(app).post('/cart/checkout').send({ userId: 1, discountCode: 'INVALID' });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Invalid or already used discount code');
  });

  it('should handle checkout without a discount code', async () => {
    await request(app).post('/cart/add').send({ userId: 1, item: { name: 'Pen', price: 50 } });

    const res = await request(app).post('/cart/checkout').send({ userId: 1 });

    expect(res.status).toBe(200);
    expect(res.body.totalAmount).toBe(50); // No discount
    expect(cart.length).toBe(0); // Cart should be cleared
  });

  it('should clear cart after checkout', async () => {
    await request(app).post('/cart/add').send({ userId: 1, item: { name: 'Laptop', price: 1000 } });

    await request(app).post('/cart/checkout').send({ userId: 1 });

    expect(cart.length).toBe(0);
  });
});
