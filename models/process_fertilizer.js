'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Process_fertilizer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Process_fertilizer.init({
    process_id: DataTypes.INTEGER,
    fertilized: DataTypes.INTEGER,
    date_used: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Process_fertilizer',
  });
  return Process_fertilizer;
};