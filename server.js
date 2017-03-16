// REQUIRED NPM PACKAGES
var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
var methodOverride = require("method-override");

// CONTROLLERS
// NOT DONE
var application_controller = require("./controllers/application_controller");
var home_controller = require("./controllers/home_controller");
var users_controller = require("./controllers/users_controller");
// Testing search controller

// Set variable to express
var app = express();

// Give our app ability to use methodOverride
app.use(methodOverride("_method"));

// Allow our app to use sessions and use of cookies
// No time out set
app.use(session({ secret: "app", cookie: { maxAge: 999999 * 9999} }));
app.use(cookieParser());

var exphbs = require("express-handlebars");
// Setting up view path for handlebars
app.set("views", path.join(__dirname, "views"));
// Registers the given template engine callback as ext.
// app.engine(ext, callback)
app.engine("handlebars", exphbs({
	defaultLayout: "main"
}));
// Setting the default engine extension to use when omitted.
app.set("view engine", "handlebars");

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", application_controller);
app.use("/home", home_controller);
app.use("/users", users_controller);
//test


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  });
});

module.exports = app;