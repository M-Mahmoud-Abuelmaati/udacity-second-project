import { Application, Request, Response } from 'express';
import { OrderStore } from '../models/orders';
import { verifyToken } from '../middlewares/verifyTokenMiddleware';

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  const orderesFinded = await store.index();
  res.status(200).json(orderesFinded);
};

const show = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const orderFinded = await store.show(id);
    res.status(200).json(orderFinded);
  } catch (error) {
    res.status(500).json(error);
  }
};

const showUserOrders = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const userOrderes = await store.showUserOrders(id);
    res.status(200).json(userOrderes);
  } catch (error) {
    res.status(500).json(error);
  }
};

const showCompletedOrders = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const userOrderes = await store.showCompletedOrders(id);
    res.status(200).json(userOrderes);
  } catch (error) {
    res.status(500).json(error);
  }
};

const create = async (req: Request, res: Response) => {
  const { user_id, status } = req.body;
  try {
    const orderCreated = await store.create(user_id, status);
    res.status(200).json(orderCreated);
  } catch (error) {
    res.status(500).json(error);
  }
};

const addProduct = async (req: Request, res: Response) => {
  const order_id: number = parseInt(req.params.id);
  const { product_id, quantity } = req.body;
  try {
    const productAdded = await store.addProduct(order_id, product_id, quantity);
    res.status(200).json(productAdded);
  } catch (error) {
    res.status(500).json(error);
  }
};

const destroy = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await store.delete(id);
    res.status(200).json({ success: `order ${id} deleted successfully` });
  } catch (error) {
    res.status(500).json(error);
  }
};

const orderRoutes = (app: Application) => {
  app.get('/orders', verifyToken, index);
  app.get('/orders/:id', verifyToken, show);
  app.get('/orders/user/:id', verifyToken, showUserOrders);
  app.get('/orders/user/:id/completed', verifyToken, showCompletedOrders);
  app.post('/orders', verifyToken, create);
  app.post('/orders/:id/product', verifyToken, addProduct);
  app.delete('/orders/:id', verifyToken, destroy);
};

export default orderRoutes;
