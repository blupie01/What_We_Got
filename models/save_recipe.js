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