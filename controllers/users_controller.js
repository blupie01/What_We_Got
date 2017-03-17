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
		if (userSavedRecipe == 0) {
			//diet labels
			// var diet_labels_list = (req.body["diet_labels[]"]);
			var diet_labels_list = "";
				if (req.body["diet_labels[]"] == null) {
					var diet_labels_list = "";
				// } else if (req.body["diet_labels[]"].length > 2) {
				// 	var diet_labels_fixed = (req.body["diet_labels[]"]).join();
				// 	diet_labels_list = diet_labels_fixed;
				} else {
					for (var i = 0; i < req.body["diet_labels[]"].length; i++) {
						diet_labels_list += req.body["diet_labels[]"][i] + ", ";
					}
					diet_labels_list = diet_labels_list.slice(0, -2);
				}
				
				// console.log(diest_lab);
			//health_labels
				var health_labels_fix = (req.body["health_labels[]"]).join();
				var health_labels_list = health_labels_fix;
				// console.log(test3);
			//cautions
				var cautions_list = "";
				if (req.body["cautions[]"] == null) {
					var cautions_list = "";
				// } else if (req.body["cautions[]"].length > 2) {
				// 	var cautions_fixed = (req.body["cautions[]"]).join();
				// 	cautions_list = cautions_fixed
				} else {
					for (var i = 0; i < req.body["cautions[]"].length; i++) {
						cautions_list += req.body["cautions[]"][i] + ", ";
					}
					cautions_list = cautions_list.slice(0, -2);
				}
				// var cautions_fix = cautions_list;
				// console.log(test4);
			//ingredients
				var ingredients_fix = (req.body["ingredients[]"]).join();
				var ingredients_list = ingredients_fix;
				// for (var i = 0; i < test5.length; i++) {
				// 	console.log(test5[i]);
				// }
				// console.log(req.body.ingredients[0]);

			models.SavedRecipes.create({
				user_id: req.session.user_id,
				recipe_title: req.body.recipe_label,
				image_link: req.body.img,
				calories: req.body.calories,
				diet_labels: diet_labels_list,
				health_labels: health_labels_list,
				cautions: cautions_list,
				ingredients: ingredients_list,
				instructions: req.body.url
			}).then(function() {
				res.send("Recipe Saved!");
			});
		};
	});
});

module.exports = router;