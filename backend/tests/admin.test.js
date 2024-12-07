const request = require('supertest');
const app = require('../app');
const { orders, discountCodes } = require('../data');

describe('Admin API', () => {
  let server;

  beforeAll(() => {
    const port = process.env.TEST_PORT || 7002;
    server = app.listen(port);
  });

  afterAll((done) => {
    server.close(done);
  });

  beforeEach(() => {
    orders.length = 0;
    discountCodes.length = 0;
  });

  it('should get statistics', async () => {
    const res = await request(app).get('/admin/stats');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('totalItems', 0);
    expect(res.body).toHaveProperty('totalAmount', 0);
    expect(res.body).toHaveProperty('totalDiscountAmount', 0);
    expect(res.body.discountCodes).toEqual([]);
  });

  it('should generate a discount code if conditions are met', async () => {
    orders.push({ items: [{ name: 'Book', price: 100 }], totalAmount: 100 });
    const res = await request(app).post('/admin/generate-discount').send({ nthOrder: 1, discountPercent: 10 });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message', 'Discount code generated successfully');
    expect(res.body).toHaveProperty('discountCode');
    expect(discountCodes.length).toBe(1);
  });

  it('should not generate a discount code if conditions are not met', async () => {
    orders.push({ items: [{ name: 'Pen', price: 50 }], totalAmount: 50 });
    const res = await request(app).post('/admin/generate-discount').send({ nthOrder: 5, discountPercent: 10 });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('Not eligible to generate a discount code');
    expect(discountCodes.length).toBe(0);
  });
});
