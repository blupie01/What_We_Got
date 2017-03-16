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
        recipe_title: {
          type: Sequelize.STRING,
          allowNull: true
        },
        image_link: {
          type: Sequelize.STRING,
          allowNull: true
        },
        calories: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        diet_labels: {
          type: Sequelize.STRING,
          allowNull: true
        },
        health_labels: {
          type: Sequelize.STRING,
          allowNull: true
        },
        cautions: {
          type: Sequelize.STRING,
          allowNull: true
        },
        ingredients: {
          type: Sequelize.STRING,
          allowNull: true
        },
        instructions: {
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
        recipe_title: {
          type: Sequelize.STRING,
          allowNull: true
        },
        image_link: {
          type: Sequelize.STRING,
          allowNull: true
        },
        calories: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        diet_labels: {
          type: Sequelize.STRING,
          allowNull: true
        },
        health_labels: {
          type: Sequelize.STRING,
          allowNull: true
        },
        cautions: {
          type: Sequelize.STRING,
          allowNull: true
        },
        ingredients: {
          type: Sequelize.STRING,
          allowNull: true
        },
        instructions: {
          type: Sequelize.STRING,
          allowNull: true
        }
      }
    )
  }
};