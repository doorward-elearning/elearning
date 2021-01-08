import { Logger, QueryRunner } from 'typeorm';
import DoorwardLogger from './doorward.logger';
import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export default class DoorwardDbLogger extends DoorwardLogger implements Logger {
  constructor() {
    super();
    this.setContext('DoorwardDbLogger');
  }

  logMigration(message: string, queryRunner?: QueryRunner): any {
    this.info(message);
  }

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    const sql = query + (parameters && parameters.length ? ' -- PARAMETERS: ' + this.stringifyParams(parameters) : '');
    this.verbose('query' + ': ' + sql);
  }

  logQueryError(error: string | Error, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    const sql = query + (parameters && parameters.length ? ' -- PARAMETERS: ' + this.stringifyParams(parameters) : '');
    this.error(typeof error === 'string' ? new Error(error) : error, 'query failed: ' + sql);
  }

  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    const sql = query + (parameters && parameters.length ? ' -- PARAMETERS: ' + this.stringifyParams(parameters) : '');
    this.warn(`query is slow: ` + sql);
    this.warn(`execution time: ` + time);
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner): any {
    this.info(message);
  }
  // -------------------------------------------------------------------------
  // Protected Methods
  // -------------------------------------------------------------------------

  /**
   * Converts parameters to a string.
   * Sometimes parameters can have circular objects and therefor we are handle this case too.
   */
  protected stringifyParams(parameters: any[]) {
    try {
      return JSON.stringify(parameters);
    } catch (error) {
      // most probably circular objects in parameters
      return parameters;
    }
  }
}
