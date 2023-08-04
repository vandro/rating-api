'use strict';
const { Model, Sequelize } = require('sequelize');
const sequelize = require('./sequelize_client');

class Item extends Model {}

Item.init({
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  category_id: {
    type: Sequelize.UUID,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  attributes: {
    type: Sequelize.JSON,
    allowNull: false
  }
},
{
  sequelize,
  modelName: 'Item',
  tableName: 'items'
});

module.exports = sequelize.models.Item;
