'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pesticide_availability extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pesticide_availability.init({
    seller_id: DataTypes.INTEGER,
    pesticide_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'pesticide_availability',
  });
  return pesticide_availability;
};