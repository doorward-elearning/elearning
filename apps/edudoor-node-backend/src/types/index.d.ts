import { Model } from '@edudoor/common/models/Model';
import { DataTypes, Sequelize } from 'sequelize';

export type ModelCreator<T extends Model> = (sequelize: Sequelize, DataTypes: typeof DataTypes) => T;
