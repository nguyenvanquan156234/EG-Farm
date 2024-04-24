'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Traders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Traders.init({
    trader_name: DataTypes.STRING,
    location: DataTypes.STRING,
    trader_concact: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Traders',
  });
  return Traders;
};