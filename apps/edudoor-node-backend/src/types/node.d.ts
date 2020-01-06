import { Models } from '../database/models';
declare global {
  declare namespace NodeJS {
    interface Global {
      models: Models;
      socketIO: any;
    }
  }
}
