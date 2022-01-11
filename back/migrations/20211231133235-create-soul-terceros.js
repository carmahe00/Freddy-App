'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('soul_terceros', {
      id_tercero: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      codigo: Sequelize.STRING,
      clave: Sequelize.STRING
      
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('soul_terceros');
  }
};