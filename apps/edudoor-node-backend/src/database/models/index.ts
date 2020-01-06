import { environment } from '../../environments/environment';
import database from '../../config/database';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = environment.environment || 'development';
const config = database[env];

const models = {};

const sequelize = new Sequelize(environment.DATABASE_URL, config);

fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    models[model.name] = model;
  });

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export type Models = typeof models;

export default models;
