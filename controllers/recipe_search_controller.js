var express = require("express");
var router = express.Router();

// below router is most likely not useful
router.post("/search", function(req, res) {
	var search = req.body.recipe_search;
	// This does show up in terminal.
	// verified that it can reach this point
	console.log(search);

	var queryURL = "https://api.edamam.com/search?q=" + search
	 + "&app_id=a99c054e&app_key=a6913d9b394ea2d13dbfe40ee6ef0621&from=0&to=10";
	console.log(queryURL);

	var recipesArray = recipe_search(queryURL);

	console.log("recipesArray " + recipesArray);

	res.render("search/search", {
		logged_in: req.session.logged_in,
	 	username: req.session.username,
	 	user_id: req.session.user_id,
		recipes: recipesArray
	});
});

module.exports = router;