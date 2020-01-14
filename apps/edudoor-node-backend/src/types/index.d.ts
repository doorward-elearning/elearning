import { DBModel } from '@edudoor/common/models/DBModel';
import { Model, Sequelize } from 'sequelize';

export type ModelCreator<T extends DBModel & Model> = (sequelize: Sequelize) => () => T;
