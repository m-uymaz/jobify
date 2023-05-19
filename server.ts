import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app: Express = express();

import morgan from 'morgan';

//db and auth
import connectDB from './db/connect';

//middleware
import errorHandlerMiddleware from './middleware/errorHandler';

//routers
import authRouter from './routes/authRoutes';
import jobsRouter from './routes/jobsRoutes';

if(process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);

app.use(errorHandlerMiddleware);

app.use('*', (req: Request, res: Response) => {
  res.status(404).send('Route does exist... :(');
});

const PORT: string = process.env.PORT as string;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
  } catch (err) {
    console.log(err);
  }
}

start();