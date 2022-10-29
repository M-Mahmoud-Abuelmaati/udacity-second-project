import supertest from 'supertest';
import app from '../../../index';
import { createAccount } from '../utils/createFunctions';

const request = supertest(app);

describe('Products api endpoint response', () => {
  let token: string;

  beforeAll(async () => {
    const userCreated = await createAccount(request);
    token = userCreated;
  });

  it('get api and expected to be 200 without auth token', (done: DoneFn): void => {
    request
      .get('/products')
      .then((response): void => {
        expect(response.status).toBe(200);
        done();
      })
      .catch((err): void => console.log(err));
  });
  it('post api and expected to be 401 without auth token', (done: DoneFn): void => {
    request
      .post('/products')
      .then((response): void => {
        expect(response.status).toBe(401);
        done();
      })
      .catch((err): void => console.log(err));
  });

  it('post api and expected to be 200 with auth token', (done: DoneFn): void => {
    setTimeout(() => {
      request
        .post('/products')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Test',
          price: 100,
          category: 'Test',
        })
        .then((response): void => {
          expect(response.status).toBe(200);
          done();
        })
        .catch((err): void => console.log(err));
    });
  });

  it('show api and expected to return product id 1', (done: DoneFn): void => {
    setTimeout(() => {
      request
        .get('/products/1')
        .set('Authorization', `Bearer ${token}`)
        .then((response): void => {
          expect(response.body).toEqual({
            id: 1,
            name: 'Test',
            price: 100,
            category: 'Test',
          });
          done();
        })
        .catch((err): void => console.log(err));
    });
  });

  it('create product api and expected to return a product', (done: DoneFn): void => {
    setTimeout(() => {
      request
        .post('/products/')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Test',
          price: 100,
          category: 'Test',
        })
        .then((response): void => {
          expect(response.body).toEqual({
            id: 3,
            name: 'Test',
            price: 100,
            category: 'Test',
          });
          done();
        })
        .catch((err): void => console.log(err));
    });
  });
  it('get top products api and expected to return status code 200', (done: DoneFn): void => {
    request
      .get('/products/top')
      .then((response): void => {
        expect(response.status).toBe(200);
        done();
      })
      .catch((err): void => console.log(err));
  });
  it('get products by category api (Test) and expected to return status code 200', (done: DoneFn): void => {
    request
      .get('/products/category/Test')
      .then((response): void => {
        expect(response.status).toBe(200);
        done();
      })
      .catch((err): void => console.log(err));
  });
  it('get products by category api (random name) and expected to return status code 500', (done: DoneFn): void => {
    request
      .get('/products/category/random')
      .then((response): void => {
        expect(response.status).toBe(500);
        done();
      })
      .catch((err): void => console.log(err));
  });
  it('delete order api and expected to return status code 200', (done: DoneFn): void => {
    setTimeout(() => {
      request
        .delete('/products/1')
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
        .delete('/products/1')
        .then((response): void => {
          expect(response.status).toBe(401);
          done();
        })
        .catch((err): void => console.log(err));
    }, 600);
  });
});
