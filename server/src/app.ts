import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

//routes
import userRouter from './routes/user.route';
import categoryRouter from './routes/category.route';
import subcategoryRouter from './routes/subcategory.route';
import productRouter from './routes/product.route';
app.use('/api/v1/user', userRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/subcategory', subcategoryRouter);
app.use('/api/v1/product', productRouter);
export { app };
