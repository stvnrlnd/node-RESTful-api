'use strict';
// ------ Require Packages
var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

// ------ Configure the application
var app        = express();
var port       = process.env.PORT || 3000;
var config     = require('./resource/config');
var api        = require('./resource/APIroutes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', api);

mongoose.connect(config.dbURL);

// ------ Serve
app.listen(port, function() {
  console.log('Running on port ' + port);
});
