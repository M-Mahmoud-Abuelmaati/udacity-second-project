import supertest from 'supertest';
import app from '../../../index';
import { createAccount } from '../utils/createFunctions';
const request = supertest(app);

describe('Users api endpoint response', () => {
  let token: string;

  beforeAll(async () => {
    const userCreated = await createAccount(request);
    token = userCreated;
  });

  it('get api and expected to be 401 without auth token', (done: DoneFn): void => {
    request
      .get('/users')
      .then((response): void => {
        expect(response.status).toBe(401);
        done();
      })
      .catch((err): void => console.log(err));
  });
  it('get api and expected to be 200 with auth token', (done: DoneFn): void => {
    request
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .then((response): void => {
        expect(response.status).toBe(200);
        done();
      })
      .catch((err): void => console.log(err));
  });
  it('get user by id api and expected to be 401 without auth token', (done: DoneFn): void => {
    request
      .get('/users/1')
      .then((response): void => {
        expect(response.status).toBe(401);
        done();
      })
      .catch((err): void => console.log(err));
  });
  it('get user by id api and expected to be 200 with auth token', (done: DoneFn): void => {
    request
      .get('/users/1')
      .set('Authorization', `Bearer ${token}`)
      .then((response): void => {
        expect(response.status).toBe(200);

        done();
      })
      .catch((err): void => console.log(err));
  });
  it('post api and expected to be 200 with auth token', (done: DoneFn): void => {
    request
      .post('/users')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstName: 'Mohamed',
        lastName: 'Mahmoud',
        password: '123456',
      })
      .then((response): void => {
        expect(response.status).toBe(200);
        done();
      })
      .catch((err): void => console.log(err));
  });
  it('post api and expected to be 401 without auth token', (done: DoneFn): void => {
    request
      .post('/users')
      .set('Content-Type', 'application/json')
      .send({
        firstName: 'Mohamed',
        lastName: 'Mahmoud',
        password: '123456',
      })
      .then((response): void => {
        expect(response.status).toBe(401);
        done();
      })
      .catch((err): void => console.log(err));
  });
  it('create user api and expected to be 200 without auth token (USED FOR GEN TOKEN)', (done: DoneFn): void => {
    request
      .post('/users/signup')
      .set('Content-Type', 'application/json')
      .send({
        firstName: 'Mohamed',
        lastName: 'Mahmoud',
        password: '123456',
      })
      .then((response): void => {
        expect(response.status).toBe(200);
        done();
      })
      .catch((err): void => console.log(err));
  });
  it('delete user api and expected to return status code 200', (done: DoneFn): void => {
    request
      .delete('/users/1')
      .set('Authorization', `Bearer ${token}`)
      .then((response): void => {
        expect(response.status).toBe(200);
        done();
      })
      .catch((err): void => console.log(err));
  });

  it('delete user api and expected to return status code 401', (done: DoneFn): void => {
    request
      .delete('/users/1')
      .then((response): void => {
        expect(response.status).toBe(401);
        done();
      })
      .catch((err): void => console.log(err));
  });
});
