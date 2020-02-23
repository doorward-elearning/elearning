import StorageController from './StorageController';
import express from 'express';
import Multer from 'multer';
import BaseValidator from '../../middleware/BaseValidator';
import Authorization from '../../middleware/Authorization';

const Router = express.Router();

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: +(process.env.MAX_UPLOAD_SIZE || 10) * 1024 * 104,
  },
});

Router.post(
  '/storage/upload',
  multer.single('file'),
  BaseValidator.withErrorHandler(Authorization.authenticate),
  BaseValidator.withErrorHandler(StorageController.uploadFile)
);

Router.get(
  '/storage/files/:id',
  BaseValidator.withErrorHandler(Authorization.authenticate),
  BaseValidator.withErrorHandler(StorageController.getFile)
);

export default Router;
