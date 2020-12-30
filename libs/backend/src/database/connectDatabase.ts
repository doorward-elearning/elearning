import { ConnectionManager } from 'typeorm';

const connectDatabase = async (entities: Array<any>, ormConfig: any): Promise<ConnectionManager> => {
  const connectionManager = new ConnectionManager();
  const connection = await connectionManager.create({
    ...ormConfig,
    entities: [...entities],
  });

  await connection.connect();

  return connectionManager;
};

export default connectDatabase;
