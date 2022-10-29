import { ProductStore } from '../../products';

const store = new ProductStore();

describe('Product Model', () => {
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

  it('Create method should add a product', () => {
    setTimeout(async () => {
      const createProduct = await store.create({
        name: 'PS5',
        price: 500,
        category: 'Video Games',
      });
      expect(createProduct).toEqual({
        id: 1,
        name: 'PS5',
        price: 500,
        category: 'Video Games',
      });
    }, 200);
  });

  it('Index method should return a list of products', () => {
    setTimeout(async () => {
      const findedProducts = await store.index();
      expect(findedProducts).toEqual([
        {
          id: 1,
          name: 'PS5',
          price: 500,
          category: 'Video Games',
        },
      ]);
    }, 290);
  });

  it('Show method should return a product', () => {
    setTimeout(async () => {
      const findedProduct = await store.show(1);
      expect(findedProduct).toEqual({
        id: 1,
        name: 'PS5',
        price: 500,
        category: 'Video Games',
      });
    }, 290);
  });

  it('Delete method should delete a product', () => {
    setTimeout(async () => {
      await store.delete(1);
      const findedProduct = await store.index();

      expect(findedProduct).toEqual([]);
    }, 300);
  });
});
