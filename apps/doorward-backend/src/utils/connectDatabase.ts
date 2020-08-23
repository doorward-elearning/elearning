import { ConnectionManager } from 'typeorm';
import * as ormconfig from '../../ormconfig';
import entities from '@doorward/common/entities';

const connectDatabase = async (): Promise<ConnectionManager> => {
  const connectionManager = new ConnectionManager();
  const connection = await connectionManager.create({
    ...ormconfig,
    entities: [...entities],
  });

  await connection.connect();

  return connectionManager;
};

export default connectDatabase;
