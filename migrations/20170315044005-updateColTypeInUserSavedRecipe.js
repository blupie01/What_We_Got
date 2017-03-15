'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.dropTable('user_saved_recipes')
    queryInterface.createTable(
      'user_saved_recipes', 
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id'
          }
        },
        recipes_id: {
          type: Sequelize.STRING,
          allowNull: true
        },
        created_recipes_id: {
          type: Sequelize.STRING,
          allowNull: true
        }
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('user_saved_recipes')
    queryInterface.createTable(
      'user_saved_recipes', 
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'users',
            key: 'id'
          }
        },
        recipes_id: {
          type: Sequelize.STRING,
          allowNull: true
        },
        created_recipes_id: {
          type: Sequelize.STRING,
          allowNull: true
        }
      }
    )  
  }
};