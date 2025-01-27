'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_transporter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product_transporter.init({
    product_id: DataTypes.INTEGER,
    transporter_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product_transporter',
  });
  return Product_transporter;
};