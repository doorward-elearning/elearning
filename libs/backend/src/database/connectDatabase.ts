import { Connection, createConnection, getConnection } from 'typeorm';
import { ConnectionNotFoundError } from 'typeorm/error/ConnectionNotFoundError';

const connectDatabase = async (entities: Array<any>, ormConfig: any): Promise<Connection> => {
  try {
    return getConnection(ormConfig.name);
  } catch (e) {
    if (e.constructor !== ConnectionNotFoundError) throw e;
    return await createConnection({
      ...ormConfig,
      entities: [...entities],
      migrationsRun: false
    });
  }
};

export default connectDatabase;
