'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class soul_usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  soul_usuarios.init({
    login: {
      unique: true,
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
    clave2: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'soul_usuarios',
    timestamps: false,
    tableName: 'soul_usuarios',

  });
  soul_usuarios.prototype.toJSON = function (){
    let values = Object.assign({}, this.get());
    delete values.clave2
    values.role = "USER"
    return values;
  }
  return soul_usuarios;
};