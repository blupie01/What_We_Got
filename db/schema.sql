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

CREATE TABLE user_saved_receipes
(
	user_id INTEGER NOT NULL,
	recipes_id INTEGER,
	created_recipes_id INTEGER,
	FOREIGN KEY (user_id) REFERENCES users(id),
	FOREIGN KEY (recipes_id) REFERENCES recipes(id),
	FOREIGN KEY (created_recipes_id) REFERENCES user_created_recipes(id)
);