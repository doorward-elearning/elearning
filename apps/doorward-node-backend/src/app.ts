import logger from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import expressValidator from 'express-validator';
import express from 'express';
import cors from 'cors';
import modules from './modules';
import ApiRequest from './utils/ApiRequest';
import fs from 'fs';
import httpsOptions from '@doorward/backend/bootstrap/httpsOptions';
import mime from 'mime';

ApiRequest.setBaseURL(process.env.OPENOLAT_API_URL);
ApiRequest.setAuth(process.env.OPENOLAT_USERNAME, process.env.OPENOLAT_PASSWORD);

const app = express();

// view engine setup

app.use(cors());
app.use(logger('dev'));
app.use(cookieParser());
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: false }));

if (process.env.NODE_ENV === 'development') {
  app.get('/download-certificate', (req, res) => {
    res.download(httpsOptions.rootCertificate, 'doorward.crt');
  });
}

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

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
