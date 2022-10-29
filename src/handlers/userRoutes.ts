import { verifyToken } from '../middlewares/verifyTokenMiddleware';
import { Application, Request, Response } from 'express';
import { UserStore } from '../models/users';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.TOKEN_SECRET;

const store = new UserStore();

const index = async (_req: Request, res: Response): Promise<void> => {
  const usersFinded = await store.index();
  res.status(200).json(usersFinded);
};

const show = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const userFinded = await store.show(parseInt(id));
    res.status(200).json(userFinded);
  } catch (error) {
    res.status(500).json(error);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  const { firstName, lastName, password } = req.body;
  try {
    const createdUser = await store.create({ firstName, lastName, password });
    const token = jwt.sign({ id: createdUser }, secret as unknown as string);

    res.status(200).json(token);
  } catch (error) {
    res.status(400).json(error);
  }
};

const destroy = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    await store.delete(parseInt(id));
    res.status(200).json({ success: `user ${id} deleted successfully` });
  } catch (error) {
    res.status(500).json(error);
  }
};

const userRoutes = (app: Application) => {
  app.get('/users', verifyToken, index);
  app.get('/users/:id', verifyToken, show);
  app.post('/users', verifyToken, create);
  app.post('/users/signup', create);
  app.delete('/users/:id', verifyToken, destroy);
};

export default userRoutes;
