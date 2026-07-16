import express from 'express';
import cors from 'cors';
import routes from './routes';
import path from 'path';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

app.use(errorHandler);

export default app;
