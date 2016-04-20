// ------ Require Packages
var express    = require('express');
var bodyParser = require('body-parser');

// ------ Configure the application
var app        = express();
var api        = express.Router();
var port       = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ------ Build the routes
api.get('/', function(req, res) {
  res.json({ message: 'Hello, beautiful!' });
});

app.use('/api', api);

// ------ Serve
app.listen(port, function(){
  console.log('Running on port ' + port);
});
