#!/usr/bin/env node

// REQUIRED NPM
var debug = require("debug")("What_We_Got");

// REQUIRED FILES
var app = require("../server");
var models = require("../models");

app.set("port", process.env.PORT || 3000);

models.sequelize.sync().then(function () {
  var server = app.listen(app.get("port"), function() {
    debug("Express server listening on port " + server.address().port);
  });
});