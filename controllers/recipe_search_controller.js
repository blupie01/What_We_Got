var express = require("express");
var router = express.Router();

router.post("/search", function(req, res) {
	var search = req.body.recipe_search;
	// This does show up in terminal.
	// verified that it can reach this point
	console.log(search);

	var queryURL = "https://api.edamam.com/search?q=" + search
	 + "&app_id=a99c054e&app_key=a6913d9b394ea2d13dbfe40ee6ef0621&from=0&to=10";
	console.log(queryURL);

	var recipesArray = recipe_search(queryURL);

	// $.ajax({
	// 	url: queryURL,
	// 	method: "GET"
	// }).then(function(object) {
	// 	var single_Recipe = {};
	// 	var recipes = object.hits;

	// 	for (var i = 0; i < recipes.length; i++) {
	// 		// recipe name
	// 		single_Recipe["recipe_name"] = recipes[i].recipe.label;

	// 		recipesArray.push(single_Recipe);
	// 	};
	// });

	console.log("recipesArray " + recipesArray);

	res.render("search/search", {
		logged_in: req.session.logged_in,
	 	username: req.session.username,
	 	user_id: req.session.user_id,
		recipes: recipesArray
	});
});

var recipe_search = function(query) {
	var array = [];
	$.ajax({
		url: query,
		method: "GET"
	}).then(function(object) {
		var single_Recipe = {};
		var recipes = object.hits;

		for (var i = 0; i < recipes.length; i++) {
			single_Recipe["recipe_name"] = recipes[i].recipe.label;

			recipesArray.push(single_Recipe);
			
			Object.keys(single_Recipe).forEach(function(k) {delete single_Recipe[k]});
		};
		console.log(single_Recipe);
		console.log(array);
		return array;
	});
};

module.exports = router;