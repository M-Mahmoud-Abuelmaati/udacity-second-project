import { SuperTest, Test } from 'supertest';
import { Order } from '../../orders';
import { Product } from '../../products';

let token: string;

const createAccount = async (request: SuperTest<Test>): Promise<string> => {
  const newAccount = await request.post('/users/signup').send({
    firstName: 'Mohamed',
    lastName: 'Mahmoud',
    password: '123456',
  });
  token = newAccount.body;
  return newAccount.body;
};

const createOrder = async (
  request: SuperTest<Test>,
  status: string
): Promise<Order> => {
  const newOrder = await request
    .post('/orders/')
    .send({
      user_id: 1,
      status,
    })
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`);
  return newOrder.body;
};

const createProduct = async (request: SuperTest<Test>): Promise<Product> => {
  const newOrder = await request
    .post('/products/')
    .send({
      name: 'Test',
      price: 100,
      category: 'Test',
    })
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`);
  return newOrder.body;
};

export { createAccount, createOrder, createProduct };
