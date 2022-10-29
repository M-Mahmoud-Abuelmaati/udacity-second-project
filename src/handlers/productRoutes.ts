import { Application, Request, Response } from 'express';
import { verifyToken } from '../middlewares/verifyTokenMiddleware';
import { ProductStore } from '../models/products';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  const productsFinded = await store.index();
  res.status(200).json(productsFinded);
};

const showTopFive = async (_req: Request, res: Response) => {
  const productsFinded = await store.showTopFive();
  res.status(200).json(productsFinded);
};

const showByCategory = async (_req: Request, res: Response) => {
  const { name } = _req.params;
  try {
    const productsFinded = await store.showByCategory(name);
    res.status(200).json(productsFinded);
  } catch (error) {
    res.status(500).json(error);
  }
};

const show = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const productFinded = await store.show(parseInt(id));
    res.status(200).json(productFinded);
  } catch (error) {
    res.status(500).json(error);
  }
};

const create = async (req: Request, res: Response) => {
  const { name, price, category } = req.body;
  try {
    const productCreated = await store.create({
      name,
      price,
      category,
    });
    res.status(200).json(productCreated);
  } catch (error) {
    res.status(400).json(error);
  }
};

const destroy = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await store.delete(parseInt(id));
    res.status(200).json({ success: `product ${id} deleted successfully` });
  } catch (error) {
    res.status(500).json(error);
  }
};

const productRoutes = (app: Application) => {
  app.get('/products', index);
  app.get('/products/top', showTopFive);
  app.get('/products/category/:name', showByCategory);
  app.get('/products/:id', show);
  app.post('/products', verifyToken, create);
  app.delete('/products/:id', verifyToken, destroy);
};

export default productRoutes;
