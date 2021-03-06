var request = require('request');
var bodyParser = require('body-parser');
var express = require('express');
var morgan = require('morgan');
var app = express();
var SabreDevStudio = require('sabre-dev-studio');

var server = app.listen(process.env.VCAP_APP_PORT || 3000);
var io = require('socket.io')(server);

var flickrKey = '04a087bccc9f97e2dfa82d17b1a6410b';

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

    var flickrKey = '04a087bccc9f97e2dfa82d17b1a6410b';

    socket.on('cityData', function(cityArr) {
    	var checkInDate = departureDate.replace(/-/g, "");
    	var checkOutDate = arrivalDate.replace(/-/g, "");

    	for (var i=0; i < cityArr.length; i++) {
    		var formattedCity = cityArr[i].replace(/ /g, "%20");

	    	// PRICELINE API TO GRAB FLIGHT DATA
    		var url = 'https://www.priceline.com/pws/v0/stay/retail/listing/'+formattedCity+'?rguid=3459hjdfdf&check-in='+checkInDate+'&check-out='+checkOutDate+'&currency=USD&responseoptions=DETAILED_HOTEL,NEARBY_ATTR&rooms='+groupNumber+'&sort=HDR&offset=0&page-size=5';
    		request(url, 
    			function(error, response, body) {
			  		if (!error && response.statusCode == 200) {	
			  			body = JSON.parse(body);
			  			app.get('/priceline', function (req, res) {
			  				res.json(body);
			  			});
			  			console.log("FLIGHT BODY", body);
			  			
			  		} // if
    			}); // PRICELINE API 
 
 			// // FLICKR API CALL (can't render this data atm);
    // 		var flickrURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='+flickrKey+'&tags='+theme+'%2C+'+formattedCity+'&per_page=1&page=1&format=rest';
    // 		// console.log("FLICKR URL", flickrURL);
		  //   request(flickrURL, function(error, response, body) {
		  //     		console.log("FLICKR DATA", body);
		  //   }); // flickr api

		}; // for loop

 
  	}); // socket.on - cityData

   }); // socket.on - params


})//io
