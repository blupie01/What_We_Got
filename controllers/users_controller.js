// REQUIRED NPM PACKAGES
var bcrypt = require("bcryptjs");
var express = require("express");
var mysql = require("mysql");

// Path to models folder
var models = require("../models");

// Get express router
var router = express.Router();

router.get("/new", function(req, res) {
	res.render("users/new");
});

router.get("/sign-in", function(req, res) {
	res.render("users/sign_in");
});

router.get("/sign-out", function(req, res) {
	req.session.destroy(function(err) {
		res.redirect("/home");
	});
});

// if user trys to sign in with the wrong password or email tell them that on the page
router.post("/login", function(req, res) {
	models.User.findOne({
		where: {username: req.body.username}
	}).then(function(user) {
		if (user == null) {
			res.redirect("/users/sign-in");
		};

		bcrypt.compare(req.body.password, user.password_hash, function(err, result) {
			if (result == true) {
				req.session.logged_in = true;
				req.session.user_id = user.id;
				req.session.username = user.username;
				console.log("HERE " + req.session.logged_in);
				console.log(req.session.user_id);
				console.log(req.session.username);

				res.redirect("/home");
			} else {
				res.redirect("/users/sign-in");
			};
		});
	});
});

// route to create a new user and add info to database
router.post("/create", function(req, res) {
	models.User.findAll({
		where: {
			username: req.body.username
		}
	}).then(function(users) {
		if (users.length > 0) {
			res.send("There is already a user with that username or email.");
		} else {
			bcrypt.genSalt(10, function(err, salt) {
				bcrypt.hash(req.body.password, salt, function(err, hash) {
					models.User.create({
						username: req.body.username,
						email: req.body.email,
						password_hash: hash
					}).then(function(user) {
						req.session.logged_in = true;
						req.session.user_id = user.id;
						req.session.username = user.username;

						res.redirect("/home")
					});
				});
			});
		};
	});
});

router.post("/save_recipe", function(req, res) {
	console.log(req);
	models.SavedRecipes.findAll({
		where: {
			user_id: req.session.user_id,
			recipe_title: req.body.recipe_label
		}
	}).then(function(userSavedRecipe) {
		console.log(userSavedRecipe);
		if (userSavedRecipe == 0) {
			var test = req.body.calories;
			console.log("HERE");
				console.log("HERE" + test.toString());
			//diet labels
				console.log(req.body["diet_labels[]"]);
			//health_labels
				console.log(req.body["health_labels[]"]);
			//cautions
				// console.log(req.body.cautions[0]);
			//ingredients
				// console.log(req.body.ingredients[0]);

				console.log(req.body.url);
			// models.SavedRecipes.create({
			// 	user_id: req.session.user_id,
			// 	recipe_title: req.body.recipe_label,
			// 	image_link: req.body.img,
			// 	calories: req.body.calories,
			// 	diet_labels: req.body.diet_labels,
			// 	health_labels: req.body.health_labels,
			// 	cautions: req.body.cautions,
			// 	ingredients: req.body.ingredients,
			// 	instructions: req.body.url
			// }).then(function() {
			// 	res.send("Recipe Saved!");
			// });
		};
	});
});

module.exports = router;