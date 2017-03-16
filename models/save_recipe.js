"use strict";

module.exports = function(sequelize, DataTypes) {
    var SavedRecipes = sequelize.define("SavedRecipes", {
        user_id: DataTypes.INTEGER,
        recipe_title: DataTypes.STRING,
        image_link: DataTypes.STRING,
        calories: DataTypes.INTEGER,
        diet_labels: DataTypes.STRING,
        health_labels: DataTypes.STRING,
        cautions: DataTypes.STRING,
        ingredients: DataTypes.STRING,
        instructions: DataTypes.STRING
    }, {
        underscored: true,
        freezeTableName: true,
        tableName: "user_saved_recipes"
    });

    return SavedRecipes;
};

// id            | int(11)      | NO   | PRI | NULL    | auto_increment |
// | user_id       | int(11)      | YES  | MUL | NULL    |                |
// | recipe_title  | varchar(255) | YES  |     | NULL    |                |
// | image_link    | varchar(255) | YES  |     | NULL    |                |
// | calories      | int(11)      | YES  |     | NULL    |                |
// | diet_labels   | varchar(255) | YES  |     | NULL    |                |
// | health_labels | varchar(255) | YES  |     | NULL    |                |
// | cautions      | varchar(255) | YES  |     | NULL    |                |
// | ingredients   | varchar(255) | YES  |     | NULL    |                |
// | instructions  | varchar(255) | YES  |     | NULL    |                