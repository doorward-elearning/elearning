import { Injectable, LoggerService, Scope } from '@nestjs/common';
import winstonConfig from './winston.config';
import * as winston from 'winston';

@Injectable({ scope: Scope.TRANSIENT })
export default class DoorwardLogger implements LoggerService {
  private logger: winston.Logger;
  private context: string;

  constructor() {
    this.logger = winston.createLogger(winstonConfig);
  }

  setContext(context?: string): DoorwardLogger {
    this.context = context;
    return this;
  }

  log(message: any, context?: string) {
    return this.logger.log({ level: 'info', message, context });
  }

  emergency(error: Error, message?: string) {
    return this.logger.error({
      level: 'error',
      message: message || error.message,
      trace: error.stack,
      context: this.context,
    });
  }

  alert(error: Error, message?: string) {
    return this.logger.error({
      level: 'error',
      message: message || error.message,
      trace: error.stack,
      context: this.context,
    });
  }

  critical(error: Error, message?: string) {
    return this.logger.error({
      level: 'error',
      message: message || error.message,
      trace: error.stack,
      context: this.context,
    });
  }

  error(error: Error, message?: string) {
    return this.logger.error({
      level: 'error',
      message: message || error.message,
      trace: error.stack,
      context: this.context,
    });
  }

  warn(message: any) {
    return this.logger.log({ level: 'warn', message, context: this.context });
  }

  notice(message: any) {
    return this.logger.log({ level: 'notice', message, context: this.context });
  }

  info(message: any) {
    return this.logger.log({ level: 'info', message, context: this.context });
  }

  debug(message: any) {
    return this.logger.log({ level: 'debug', message, context: this.context });
  }

  verbose(message: any) {
    return this.logger.log({ level: 'verbose', message, context: this.context });
  }

  vverbose(message: any): any {
    return this.logger.log({ level: 'vverbose', message, context: this.context });
  }
}
