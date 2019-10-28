import logger from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import expressValidator from 'express-validator';
import express from 'express';
import modules from './modules';

const app = express();

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.USE_LATENCY === 'true') {
  app.use((req, res, next) => {
    setTimeout(next, 2000);
  });
}

modules(app);

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).json({
    message: 'Not found',
  });
});

export default app;
