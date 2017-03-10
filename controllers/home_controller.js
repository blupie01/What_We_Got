var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
 res.render('home/home', {
 	logged_in: req.session.logged_in,
 	username: req.session.username,
 	user_id: req.session.user_id
 });
});

router.post("/search", function(req, res) {
	var search = req.body.recipe_search;

	console.log(search);

	var queryURL = "https://api.edamam.com/search?q=" + search
	 + "&app_id=a99c054e&app_key=a6913d9b394ea2d13dbfe40ee6ef0621&from=0&to=10";

	 var recipesArray = [];

	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(object) {
		var single_Recipe = {};
		var recipes = object.hits;

		for (var i = 0; i < recipes.length; i++) {
			// recipe name
			single_Recipe["recipe_name"] = recipes[i].recipe.label;

			recipesArray.push(single_Recipe);
		};
	});

	console.log("recipesArray " + recipesArray);

	res.render("home/home", {
		logged_in: req.session.logged_in,
	 	username: req.session.username,
	 	user_id: req.session.user_id,
		recipes: recipesArray
	});
});

module.exports = router;