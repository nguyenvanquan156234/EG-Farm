'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_retailer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product_retailer.init({
    product_id: DataTypes.INTEGER,
    retailer_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product_retailer',
  });
  return Product_retailer;
};