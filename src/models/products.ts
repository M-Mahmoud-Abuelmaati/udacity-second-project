import Client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const connection = await Client.connect();
      const sql = 'SELECT * FROM products';
      const result = await connection.query(sql);
      connection.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Couldn't get all products ${error}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const connection = await Client.connect();
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Couldn't get product id ${id} ${error}`);
    }
  }

  async showTopFive(): Promise<Product> {
    try {
      const connection = await Client.connect();
      const sql = 'SELECT * FROM products ORDER BY price DESC LIMIT 5';
      const result = await connection.query(sql);
      connection.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Couldn't get products ${error}`);
    }
  }

  async showByCategory(categoryName: string): Promise<Product> {
    try {
      const connection = await Client.connect();
      const sql = 'SELECT * FROM products WHERE category = ($1)';
      const result = await connection.query(sql, [categoryName]);
      connection.release();

      if (!result.rows[0]) {
        throw new Error(`Couldn't get products ${categoryName}`);
      }

      return result.rows;
    } catch (error) {
      throw new Error(`Couldn't get products ${error}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const connection = await Client.connect();
      const sql =
        'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *';
      const result = await connection.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);
      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Couldn't create product ${error}`);
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const connection = await Client.connect();
      const sql = 'DELETE FROM products WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Couldn't delete product id ${id} ${error}`);
    }
  }
}
