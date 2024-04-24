'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Process_pesticide extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Process_pesticide.init({
    process_id: DataTypes.INTEGER,
    pesticide_id: DataTypes.INTEGER,
    date_used: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Process_pesticide',
  });
  return Process_pesticide;
};