import { Models } from '../database/models';

declare namespace NodeJS {
  interface Global {
    models: Models;
    socketIO: any;
  }
}
