import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import bluebird from 'bluebird';
import cors from 'cors';

// import flash from "express-flash";
import express, { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST } from 'http-status-codes';
import 'express-async-errors';

import BaseRouter from './routes';
import logger from '@shared/Logger';

// Import env settings
require('dotenv').config();

// Init expressz
const app = express();

/************************************************************************************
 *                                 Connect to MongoDB
 ***********************************************************************************/
const mongoose = require('mongoose');
mongoose.Promise = bluebird;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err: Error) => {
    console.log(err);
  });

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const whitelist = [
  'http://127.0.0.1:3000',
  'http://localhost:3000',
  'http://127.0.0.1:3001',
  'http://localhost:3001',
];

app.use(
  cors({
    origin(origin, callback) {
      // allow requests with no origin
      if (!origin) return callback(null, true);
      if (whitelist.indexOf(origin) === -1) {
        const message =
          "The CORS policy for this origin doesn't " +
          'allow access from the particular origin.';
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
}

// Add APIs
app.use('/', BaseRouter);

// Print API errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message, err);
  return res.status(BAD_REQUEST).json({
    error: err.message,
  });
});

/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

// const viewsDir = path.join(__dirname, "views");
// app.set("views", viewsDir);
// const staticDir = path.join(__dirname, "public");
// app.use(express.static(staticDir));
// app.get("*", (req: Request, res: Response) => {
//   res.sendFile("index.html", { root: viewsDir });
// });

// Export express instance
export default app;
