### Schema

-- # user table
-- 	#id
-- 	#email
-- 	#password
-- 	#username

-- #user_created_recipes
--  #id
-- 	#recipe_name
-- 	#ingredients
-- 	#cooktime
-- 	#instructions
-- 	#user_id

#saved_recipes
 #id

-- #recipes
-- 	#calories
-- 	#ingredients
--  #diet_lables
--  #health_labels
--  #allergens
--  #image_link
--  #recipe_title
--  #id

CREATE DATABASE whatwegot_db;
USE whatwegot_db;

CREATE TABLE users
(
	id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
	username VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE user_created_recipes
(
	id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
	user_id INTEGER NOT NULL,
	recipe_name VARCHAR(255) NOT NULL,
	ingredients TEXT NOT NULL,
	cooktime INTEGER NOT NULL,
	instructions TEXT,
	FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE recipes
(
	id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
	recipe_title VARCHAR(255) NOT NULL,
	image_link TEXT NOT NULL,
	calories INTEGER NOT NULL,
	diet_labels VARCHAR(500) NOT NULL,
	health_labels VARCHAR(500) NOT NULL,
	allergens TEXT NOT NULL,
	ingredients TEXT NOT NULL,
	instructions TEXT NOT NULL
);

CREATE TABLE user_saved_receipes
(
	user_id INTEGER NOT NULL,
	recipes_id INTEGER,
	created_recipes_id INTEGER,
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (recipes_id) REFERENCES recipes(id),
	FOREIGN KEY (created_recipes_id) REFERENCES user_created_recipes(id)
);