// REQUIRED NPM PACKAGES
var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
var methodOverride = require("method-override");

// CONTROLLERS
// not made

// Set variable to express
var app = express();

// Give our app ability to use methodOverride
app.use(methodOverride("_method"));

// Allow our app to use sessions and use of cookies
// No time out set
app.use(session({ secret: "app" }))