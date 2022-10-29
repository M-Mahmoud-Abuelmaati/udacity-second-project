import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD;
const salt = process.env.SALT_ROUNDS;

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const connection = await Client.connect();
      const sql = 'SELECT * FROM users';
      const result = await connection.query(sql);
      connection.release();

      return result.rows;
    } catch (error) {
      throw new Error(`Couldn't get all users ${error}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const connection = await Client.connect();
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();

      if (!result.rows[0]) {
        throw new Error(`Couldn't get user id ${id}`);
      }

      return result.rows[0];
    } catch (error) {
      throw new Error(`Couldn't get user id ${id} ${error}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const connection = await Client.connect();

      const sql =
        'INSERT INTO users ("firstName", "lastName", password) VALUES ($1, $2, $3) RETURNING *';

      const hashedPassword = await bcrypt.hash(
        user.password + pepper,
        parseInt(salt as unknown as string)
      );

      const result = await connection.query(sql, [
        user.firstName,
        user.lastName,
        hashedPassword,
      ]);

      connection.release();

      return result.rows[0].id;
    } catch (error) {
      throw new Error(`Couldn't create user ${error}`);
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const connection = await Client.connect();
      const sql = 'DELETE FROM users WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Couldn't delete users id ${id} ${error}`);
    }
  }
}
