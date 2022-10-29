import Client from '../database';

export type Order = {
  id?: number;
  product_id?: number;
  quantity?: number;
  user_id: number;
  status: string;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const connection = await Client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await connection.query(sql);
      connection.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Couldn't get all orders ${error}`);
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const connection = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();

      if (!result.rows[0]) {
        throw new Error(`Couldn't get order id ${id}`);
      }

      return result.rows[0];
    } catch (error) {
      throw new Error(`Couldn't get order id ${id} ${error}`);
    }
  }

  async showUserOrders(userId: string): Promise<Order> {
    try {
      const connection = await Client.connect();
      const sql =
        'SELECT * FROM orders INNER JOIN order_products ON order_id = orders.id WHERE user_id=($1)';
      const result = await connection.query(sql, [userId]);
      connection.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Couldn't get orders for user ${userId} ${error}`);
    }
  }

  async showCompletedOrders(userId: string): Promise<Order> {
    try {
      const connection = await Client.connect();
      const sql =
        "SELECT * FROM users INNER JOIN orders ON user_id = users.id WHERE users.id=($1) AND status = 'completed'";
      const result = await connection.query(sql, [userId]);
      connection.release();

      return result.rows;
    } catch (error) {
      throw new Error(
        `Couldn't get completed orders for user ${userId} ${error}`
      );
    }
  }
  async create(user_id: number, status: string): Promise<[]> {
    try {
      const connection = await Client.connect();
      const sql =
        'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *';
      const result = await connection.query(sql, [user_id, status]);
      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Couldn't create order ${error}`);
    }
  }

  async addProduct(
    order_id: number,
    product_id: number,
    quantity: number
  ): Promise<Order> {
    try {
      const connection = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const result = await connection.query(sql, [order_id]);
      connection.release();

      const order = result.rows[0];
      if (order.status !== 'active') {
        throw new Error(
          `Couldn't add product ${product_id} to order ${order_id} because status is ${order.status}`
        );
      }
    } catch (error) {
      throw new Error(`${error}`);
    }

    try {
      const connection = await Client.connect();
      const sql =
        'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
      const result = await connection.query(sql, [
        order_id,
        product_id,
        quantity,
      ]);
      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Couldn't add product to order ${order_id}, product ${product_id}`
      );
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      const connection = await Client.connect();
      const sql = 'DELETE FROM orders WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Couldn't delete order ${id} ${error}`);
    }
  }
}
