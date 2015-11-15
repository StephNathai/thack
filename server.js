var request = require('request');
var bodyParser = require('body-parser');
var express = require('express');
var morgan = require('morgan');
var app = express();
var SabreDevStudio = require('sabre-dev-studio');

var server = app.listen(3000);
var io = require('socket.io')(server);


app.use(morgan('combined'));
app.use(express.static('public'));

io.on('connection', function(socket){
  console.log('A user has connected')

  socket.on('params', function(groupNumber, city, departureDate, arrivalDate, maxBudget, theme){

	var sabre_dev_studio = new SabreDevStudio({
	  client_id:     'V1:xnsawzvi0m2s0mwb:DEVCENTER:EXT',
      client_secret: 'Ejxe2L2D',
	  uri:           'https://api.test.sabre.com'
	});

	var options = {};

	var callback = function(error, data) {
	  if (error) {
	    console.log(error);
	  } else {
	    tripData = JSON.parse(data);

	    socket.emit('topDestinations', tripData);
	    app.get('/data', function(req, res) {
  			res.json(tripData);
  		});
	  }
	};
	sabre_dev_studio.get('/v1/lists/top/destinations?origin='+city+'&theme='+theme+'&topdestinations=6&lookbackweeks=2', options, callback);

    // console.log('groupNumber:', groupNumber, 'city:', city, 'departureDate:', departureDate, 'arrivalDate', arrivalDate, 'maxBudget:', maxBudget, 'theme', theme)


    socket.on('cityData', function(cityArr) {
    	var checkInDate = departureDate.replace(/-/g, "");
    	var checkOutDate = arrivalDate.replace(/-/g, "");



    	for (var i=0; i < cityArr.length; i++) {
    		var formattedCity = cityArr[i].replace(/ /g, "%20");
    		console.log('FORMATTED CITY', formattedCity);
    		var url = 'https://www.priceline.com/pws/v0/stay/retail/listing/'+formattedCity+'?rguid=3459hjdfdf&check-in='+checkInDate+'&check-out='+checkOutDate+'&currency=USD&responseoptions=DETAILED_HOTEL,NEARBY_ATTR&rooms='+groupNumber+'&sort=HDR&offset=0&page-size=5';
    		console.log("URL", url);
    		request(url, 
    			function(error, response, body) {
			  		if (!error && response.statusCode == 200) {
			  			body = JSON.parse(body);
			  			console.log("THIS WORKS", body);
			  			app.get('/priceline', function (req, res) {
			  			res.json(body);
			  			
			  		});
			  		} // if
    			}); // API call
		}; // for loop

  		
  	});

   }); // socket.on - cityData


})//io
