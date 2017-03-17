'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
     'user_saved_recipes',
     'ingredients',
     {
       type: Sequelize.STRING(1024),
       allowNull: true,
     }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
     'user_saved_recipes',
     'ingredients',
     {
       type: Sequelize.STRING(1024),
       allowNull: true,
     }
    )
  }
};