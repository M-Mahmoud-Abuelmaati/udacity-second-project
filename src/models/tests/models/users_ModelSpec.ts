import { UserStore } from '../../users';

const store = new UserStore();

describe('Users Model', () => {
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

  it('Create method should add a user', () => {
    setTimeout(async () => {
      const createUser = await store.create({
        firstName: 'Mohamed',
        lastName: 'Mahmoud',
        password: '123456',
      });
      expect(createUser).toEqual({
        id: 1,
        firstName: 'Mohamed',
        lastName: 'Mahmoud',
        password: '123456',
      });
    }, 100);
  });

  it('Index method should return a list of users', () => {
    setTimeout(async () => {
      const findedUsers = await store.index();
      expect(findedUsers).toEqual([
        {
          id: 1,
          firstName: 'Mohamed',
          lastName: 'Mahmoud',
          password: '123456',
        },
      ]);
    }, 90);
  });

  it('Show method should return a user', () => {
    setTimeout(async () => {
      const findedUser = await store.show(1);
      expect(findedUser).toEqual({
        id: 1,
        firstName: 'Mohamed',
        lastName: 'Mahmoud',
        password: '123456',
      });
    }, 90);
  });

  it('Delete method should delete a user', () => {
    setTimeout(async () => {
      await store.delete(1);
      const findedUsers = await store.index();

      expect(findedUsers).toEqual([]);
    }, 150);
  });
});
