import { OrderStore } from '../../orders';
import { ProductStore } from '../../products';
import { UserStore } from '../../users';

const store = new OrderStore();
const productStore = new ProductStore();
const userStore = new UserStore();

describe('Orders Model', () => {
  it('Index method must be defined', () => {
    expect(store.index).toBeDefined();
  });
  it('Show method must be defined', () => {
    expect(store.show).toBeDefined();
  });
  it('Create method must be defined', () => {
    expect(store.create).toBeDefined();
  });
  it('Delete method must be defined', () => {
    expect(store.delete).toBeDefined();
  });

  it('Create method should add a new order', () => {
    setTimeout(async () => {
      await productStore.create({
        name: 'PS5',
        price: 500,
        category: 'Video Games',
      });
      await userStore.create({
        firstName: 'Mohamed',
        lastName: 'Mahmoud',
        password: '123456',
      });
      const createOrder: unknown = await store.create(1, 'active');
      expect(createOrder).toEqual({
        id: 1,
        user_id: 1,
        status: 'active',
      });
    }, 200);
  });

  it('Add product method should add products to an order', async () => {
    setTimeout(async () => {
      const createOrder: unknown = await store.addProduct(1, 1, 1);
      expect(createOrder).toEqual({
        id: 1,
        order_id: 1,
        product_id: 1,
        quantity: 1,
      });
    }, 220);
  });

  it('Show user orders method should return user orders', async () => {
    setTimeout(async () => {
      const findedOrder: unknown = await store.showUserOrders('1');
      expect(findedOrder).toEqual({
        id: 1,
        user_id: 1,
        status: 'active',
        order_id: 1,
        product_id: 1,
        quantity: 1,
      });
    }, 230);
  });

  it('Show completed orders method should return user orders completed', async () => {
    setTimeout(async () => {
      await store.create(1, 'completed');
      const findedOrder: unknown = await store.showCompletedOrders('1');
      expect(findedOrder).toEqual({
        id: 2,
        user_id: 1,
        status: 'completed',
      });
    }, 230);
  });

  it('Index method should return a list of orders', () => {
    setTimeout(async () => {
      const findedOrders: unknown = await store.index();
      expect(findedOrders).toEqual([
        {
          id: 1,
          user_id: 1,
          status: 'active',
        },
      ]);
    }, 290);
  });

  it('Show method should return an order', () => {
    setTimeout(async () => {
      const findedOrder: unknown = await store.show('1');
      expect(findedOrder).toEqual({
        id: 1,
        user_id: 1,
        status: 'active',
      });
    }, 290);
  });

  it('Delete method should delete an order', () => {
    setTimeout(async () => {
      await store.delete('1');
      const findedOrder = await store.index();

      expect(findedOrder).toEqual([]);
    }, 300);
  });
});
