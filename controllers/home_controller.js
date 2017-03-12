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
	// console.log("IN SEARCH HOME CONTROLLER");
	res.render("home/home", {
		logged_in: req.session.logged_in,
	 	username: req.session.username,
	 	user_id: req.session.user_id,
		recipes: recipeList
	});
});

module.exports = router;