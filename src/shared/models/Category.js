'use strict';
const { Model, Sequelize } = require('sequelize');
const sequelize = require('./sequelize_client');

class Category extends Model {}

Category.init({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  attributes: {
    type: Sequelize.JSON
  }
},
{
  sequelize,
  modelName: 'Category',
  tableName: 'categories'
});

module.exports = sequelize.models.Category;