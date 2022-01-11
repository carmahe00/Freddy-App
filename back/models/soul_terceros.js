'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class soul_terceros extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  soul_terceros.init({
    id_tercero: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    codigo: DataTypes.STRING,
    clave: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'soul_terceros',
    tableName: 'soul_terceros',
    timestamps: false
  });
  soul_terceros.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    delete values.clave
    values.role = "THIRD"
    return values;
  }
  return soul_terceros;
};