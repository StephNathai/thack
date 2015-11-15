$(function() {

  var socket = io(); //create an io connection
  var theme;

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
        cityArr.push(cityName);
        $('.topDest').append($('<div class='+cityName+'>').text(cityArr[i]));
       
      } else {
        var metroName = cityList[i].Destination.MetropolitanAreaName;
        cityArr.push(metroName);
      $('.topDest').append($('<div class='+cityName+'>').text(cityArr[i]));
      
      }
    }
    showPhotos();

    function showPhotos() {
      $('.Denver').append('<br><img src="/images/adventure/denver_adventure.png" />');
       $('.Las').append('<br><img src="/images/adventure/lasvegas_adventure.png" />');
       $('.Cancun').append('<br><img src="/images/adventure/cancun_adventure.png" />');
       $('.Honolulu').append('<br><img src="/images/adventure/adventure_hawaii.png" />');
       $('.San').append('<br><img src="/images/adventure/sf-adventure.png" />');
       $('.undefined').append('<br><img src="/images/adventure/shanghai_adventure.png" />');
    }

    console.log(cityArr);

    socket.emit('cityData', cityArr);

    $('.themes').remove();
    $('.topDest').show();
  });

}) //end closure wrap
