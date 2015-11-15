$(function() {

var socket = io(); //create an io connection
var theme;
// $('.group-number').keypress(function(e) {
//   if(e.which == 13) {
//   groupNum = $('.group-number').val();
//   console.log(groupNum)
//
//   }
// })


$('.explore').on('click', function() {
  $('.themes').toggle();

})

$('.theme-individual').on('click', function() {
  $('.theme-individual').toggleClass('.theme-border')
  theme = $(this).find('h4').text()
  console.log(theme)
})

$('.submit').on('click', function() {
  var groupNumber = $('.group-number').val();
  var city = $('.city').val();
  var departureDate = $('.departure-date').val();
  var arrivalDate = $('.arrival-date').val();
  var maxBudget = $('.max-budget').val();


  socket.emit('params', groupNumber, city, departureDate, arrivalDate, maxBudget, theme)
  
  console.log('groupNumber:', groupNumber, 'city:', city, 'departureDate:', departureDate, 'arrivalDate', arrivalDate, 'maxBudget:', maxBudget, 'theme', theme)
  event.preventDefault();

});

socket.on('topDestinations', function(tripData) {
  console.log(tripData.Destinations);
  var cityList = tripData.Destinations;
  console.log('CITY LIST', cityList);

  var cityArr = [];

  for (var i=0; i<cityList.length; i++) {
    var cityName = cityList[i].Destination.CityName;
    if (cityName != undefined) {
      // var metroName = cityList[i].Destination.MetropolitanAreaName;
      cityArr.push(cityName);
    } else {
      var metroName = cityList[i].Destination.MetropolitanAreaName;
      cityArr.push(metroName);
    }
  }
  console.log(cityArr);

  socket.emit('cityData', cityArr);

  $('.themes').remove();
  $('.topDest').show();
});

}) //end closure wrap
