'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'user_saved_recipes',
      'created_at',
      {
        type: Sequelize.DATE,
        allowNull: false
      }
    )
    queryInterface.addColumn(
      'user_saved_recipes',
      'updated_at',
      {
        type: Sequelize.DATE,
        allowNull: false
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'user_saved_recipes',
      'created_at'
      )
    queryInterface.removeColumn(
      'user_saved_recipes',
      'updated_at'
      )
    }
};