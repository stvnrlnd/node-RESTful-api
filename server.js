'use strict';
// ------ Require Packages
var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

// ------ Configure the application
var app        = express();
var api        = express.Router();
var port       = process.env.PORT || 3000;
var config     = require('./resource/config');
var User       = require('./resource/models/user');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(config.dbURL);

// ------ Build the routes
api.get('/', function(req, res) {
  res.json({ message: 'Hello, beautiful!' });
});

api.route('/users')
    .post(function(req, res) {
        var user = new User();
        user.name = req.body.name;
        user.save(function(err) {
            if (err){
                res.send(err);
            }
            res.json({ message: 'User created!' });
        });
    })
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
    });

api.route('/users/:user_id')
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err){
                res.send(err);
            }
            res.json(user);
        });
    })
    .put(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err){
                res.send(err);
            }
            user.name = req.body.name;
            user.save(function(err) {
                if (err){
                    res.send(err);
                }
                res.json({ message: 'User updated!' });
            });
        });
    })
    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted' });
        });
    });

app.use('/api', api);

// ------ Serve
app.listen(port, function() {
  console.log('Running on port ' + port);
});
