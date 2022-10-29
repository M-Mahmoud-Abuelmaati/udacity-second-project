import supertest from 'supertest';
import app from '../../../index';
import { Order } from '../../orders';
import {
  createAccount,
  createOrder,
  createProduct,
} from '../utils/createFunctions';

const request = supertest(app);

describe('Orders api endpoint response', () => {
  let token: string;
  let order: Order;

  beforeAll(async () => {
    const userCreated = await createAccount(request);
    token = userCreated;
    const orderCreated = await createOrder(request, 'active');
    order = orderCreated;
    await createProduct(request);
  });

  it('get api and expected to be 401 without auth token', (done: DoneFn): void => {
    setTimeout(() => {
      request
        .get('/orders')
        .then((response): void => {
          expect(response.status).toBe(401);
          done();
        })
        .catch((err): void => console.log(err));
    });
  });
  it('get api and expected to be 200 with auth token', (done: DoneFn): void => {
    setTimeout(() => {
      request
        .get('/orders')
        .set('Authorization', `Bearer ${token}`)
        .then((response): void => {
          expect(response.status).toBe(200);
          done();
        })
        .catch((err): void => console.log(err));
    });
  });

  it('post api and expected to be 401 without auth token', (done: DoneFn): void => {
    setTimeout(() => {
      request
        .post('/orders')
        .then((response): void => {
          expect(response.status).toBe(401);
          done();
        })
        .catch((err): void => console.log(err));
    });
  });
  it('post api and expected to be 200 with auth token', (done: DoneFn): void => {
    setTimeout(() => {
      request
        .post('/orders')
        .set('Authorization', `Bearer ${token}`)
        .send({
          user_id: 1,
          status: 'active',
        })
        .then((response): void => {
          expect(response.status).toBe(200);
          done();
        })
        .catch((err): void => console.log(err));
    });
  });

  it('show api and expected to return order id 1', (done: DoneFn): void => {
    setTimeout(() => {
      request
        .get('/orders/1')
        .set('Authorization', `Bearer ${token}`)
        .then((response): void => {
          expect(response.body).toEqual(order);
          done();
        })
        .catch((err): void => console.log(err));
    });
  });

  it('create product in order api and expected to return a product with order details', (done: DoneFn): void => {
    setTimeout(() => {
      request
        .post('/orders/1/product')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          order_id: 1,
          product_id: 1,
          quantity: 1,
        })
        .then((response): void => {
          expect(response.body).toEqual({
            id: 1,
            product_id: '1',
            order_id: '1',
            quantity: 1,
          });
          done();
        })
        .catch((err): void => console.log(err));
    });
  });

  it('show order api and expected to return orders for user id 1', (done: DoneFn): void => {
    setTimeout(() => {
      request
        .get('/orders/user/1')
        .set('Authorization', `Bearer ${token}`)
        .then((response): void => {
          expect(response.body).toEqual([
            {
              id: 1,
              user_id: '1',
              status: 'active',
              order_id: '1',
              product_id: '1',
              quantity: 1,
            },
          ]);
          done();
        })
        .catch((err): void => console.log(err));
    });
  });

  it('show completed order api and expected to return status code 200', (done: DoneFn): void => {
    setTimeout(async () => {
      await createOrder(request, 'completed');
      request
        .get('/orders/user/1/completed')
        .set('Authorization', `Bearer ${token}`)
        .then((response): void => {
          expect(response.status).toBe(200);
          done();
        })
        .catch((err): void => console.log(err));
    });
  });

  it('delete order api and expected to return status code 200', (done: DoneFn): void => {
    setTimeout(() => {
      request
        .delete('/orders/1')
        .set('Authorization', `Bearer ${token}`)
        .then((response): void => {
          expect(response.status).toBe(200);
          done();
        })
        .catch((err): void => console.log(err));
    }, 600);
  });

  it('delete order api and expected to return status code 401', (done: DoneFn): void => {
    setTimeout(() => {
      request
        .delete('/orders/1')
        .then((response): void => {
          expect(response.status).toBe(401);
          done();
        })
        .catch((err): void => console.log(err));
    }, 600);
  });
});
