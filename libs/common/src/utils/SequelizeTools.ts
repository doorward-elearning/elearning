import { ModelAttributes, ModelOptions, Sequelize } from 'sequelize';

export function defineModel<T>(
  sequelize: Sequelize,
  modelName: string,
  attributes: ModelAttributes,
  options?: ModelOptions
): T {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return sequelize.define(modelName, attributes, options) as T;
}
