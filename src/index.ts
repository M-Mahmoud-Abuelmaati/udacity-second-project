import bodyParser from 'body-parser';
import express, { Application } from 'express';
import cors from 'cors';
import userRoutes from './handlers/userRoutes';
import orderRoutes from './handlers/orderRoutes';
import productRoutes from './handlers/productRoutes';
import logMiddleware from './middlewares/logMiddleware';

const app: Application = express();

//Middlewares
app.use(cors(), bodyParser.json());
app.use(logMiddleware);

userRoutes(app);
orderRoutes(app);
productRoutes(app);

app.listen(process.env.PORT, () => {
  console.log(`App is listening on port ${process.env.PORT}`);
});

export default app;
