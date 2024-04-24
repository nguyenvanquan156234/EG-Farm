'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    name: DataTypes.STRING,
    
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    farm_id: DataTypes.INTEGER,
    process_id:DataTypes.INTEGER,
    trader_id: DataTypes.INTEGER,
    processing_method: DataTypes.STRING,
    images:  DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};