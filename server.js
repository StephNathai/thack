var request = require('request');
var bodyParser = require('body-parser');
var express = require('express');
var morgan = require('morgan');
var app = express();

var server = app.listen(3000);
var io = require('socket.io')(server);

app.use(morgan('combined'));
app.use(express.static('public'));

io.on('connection', function(socket){
  console.log('A user has connected')

  socket.on('params', function(groupNumber, city, departureDate, arrivalDate, numNights, maxBudget){
    console.log('groupNumber:', groupNumber, 'city:', city, 'departureDate:', arrivalDate, 'numNights:', 'maxBudget:', maxBudget);

    $.ajax({
    	url: "https://api.test.sabre.com/v1/lists/top/destinations",
    	method: 'GET',
    	data: {
    		origin: city,
    		theme: theme,
    		lookbackweeks: 2
    	},
    	success: function(result) {
    		console.log(result);
    	}

    });

  socket.on('params', function(groupNumber, city, departureDate, arrivalDate, numNights, maxBudget, theme){
    console.log('groupNumber:', groupNumber, 'city:', city, 'departureDate:', arrivalDate, 'numNights:', 'maxBudget:', maxBudget, 'theme', theme)

  });


})//io
