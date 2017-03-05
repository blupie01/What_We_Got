// REQUIRED NPM PACKAGES
var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");

// CONTROLLERS
// not made

// Set variable to express
var app = express();

// Give our app ability to use methodOverride
app.use(methodOverride("_method"));

// Allow our app to use sessions and use of cookies
// No time out set
app.use(session({ secret: "app" }));
app.use(cookieParser());

// Setting up view path for handlebars
app.set("views", path.join(__dirname, "views"));
// Registers the given template engine callback as ext.
// app.engine(ext, callback)
app.engine("handlebars", exphbs({
	defaultLayout: // not chosen yet
}));
// Setting the default engine extension to use when omitted.
app.set("view engine", "handlebars");