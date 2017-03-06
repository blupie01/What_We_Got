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
	id int NOT NULL AUTO_INCREMENT,
	username varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	password_hash varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE user_created_recipes
(
	id int NOT NULL AUTO_INCREMENT,
	user_id int NOT NULL,
	recipe_name varchar(255) NOT NULL,
	ingredients varchar(255) NOT NULL,
	cooktime date NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE recipes
(
	id int NOT NULL,
	recipe_title VARCHAR(255) NOT NULL,
	image_link VARCHAR(255) NOT NULL,
	calories int NOT NULL,
	diet_labels VARCHAR(255) NOT NULL,
	health_labels VARCHAR(255) NOT NULL,
	allergens VARCHAR(255) NOT NULL,
	ingredients VARCHAR(255) NOT NULL
);