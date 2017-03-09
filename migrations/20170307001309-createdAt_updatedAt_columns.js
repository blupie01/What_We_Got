'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'users',
      'created_at',
      {
        type: Sequelize.DATE,
        allowNull: false
      }
    )
    queryInterface.addColumn(
      'users',
      'updated_at',
      {
        type: Sequelize.DATE,
        allowNull: false
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'users',
      'created_at'
      )
    queryInterface.removeColumn(
      'users',
      'updated_at'
      )
    }
};