import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/index';
import expressValidation from "express-validation";

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/v1', indexRouter);

app.use((err, req, res, next) => {
  res.status(err.status).json({
    error : err.message
  });
});


export default app;
