import { DBModel } from '@doorward/common/models/DBModel';
import { Model, Sequelize } from 'sequelize';

export type ModelCreator<T extends DBModel & Model> = (sequelize: Sequelize) => () => T;
