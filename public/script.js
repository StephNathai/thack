$(function() {
  var socket = io(); //create an io connection
  var theme;
  var city;
  var departureDate;
  var arrivalDate;
  var groupNumber;
  var cityName;


$('.explore').on('click', function() {
   $('.themes').toggle();
     $('html, body').animate({
       scrollTop: $('.themes').offset().top
     }, 2000);
 });


  $('.theme-individual').on('click', function() {

    theme = $(this).find('h4').text();
        $('.topDest').html('<h1>Top destinations for ' + theme + ' trip</h1><h3>Pick a few hotels below to add to your itinerary!</h3>');
  });

 $('.theme-individual').on('click', function() {
    groupNumber = $('.group-number').val();
    city = $('.city').val();
    departureDate = $('.departure-date').val();
    arrivalDate = $('.arrival-date').val();
    var maxBudget = $('.max-budget').val();

    socket.emit('params', groupNumber, city, departureDate, arrivalDate, maxBudget, theme)
      event.preventDefault();
  });


  socket.on('topDestinations', function(tripData) {
    var cityList = tripData.Destinations;
    var cityArr = [];

    for (var i=0; i<cityList.length; i++) {
      cityName = cityList[i].Destination.CityName;
      if (cityName != undefined) {
        cityArr.push(cityName);
        $('.topDest').append($('<h3 class= '+cityName+' />').text(cityArr[i]));
      } else {
        var metroName = cityList[i].Destination.MetropolitanAreaName;
        cityArr.push(metroName);
      $('.topDest').append($('<h4 class='+cityName+'>').text(cityArr[i]));
      }
    }


    showPhotos();


      function showPhotos() {
       $('.Denver').append('<br><img src="/images/adventure/denver_adventure.png" />');
       $('.Denver').append('<br><li><span class="cityToggle">Denver: </span>Hyatt Regency Denver at Colorado Convention Center - <span class="price">$99.00</span></li>');
       $('.Denver').append('<br><li><span class="cityToggle">Denver: </span>The Magnolia Hotel Denver - <span class="price">$111.93</span></li>');
       $('.Denver').append('<br><li><span class="cityToggle">Denver: </span>Hyatt Regency Denver Tech Center - <span class="price">$84.00</span></li>');
       $('.Denver').append('<br><li><span class="cityToggle">Denver: </span>Baymont Inn & Suites Denver International Airport - <span class="price">$75.65</span></li>');
       $('.Denver').append('<br><li><span class="cityToggle">Denver: </span>Hyatt Place Denver Cherry Creek - <span class="price">$89.00</span></li>');

       $('.Las').append('<br><img src="/images/adventure/lasvegas_adventure.png" />');
       $('.Las').append('<br><li><span class="cityToggle">Las Vegas: </span>Luxor Hotel And Casino - <span class="price">$35.00</span></li>');
       $('.Las').append('<br><li><span class="cityToggle">Las Vegas: </span>The Venetian - <span class="price">$127.20</span></li>');
       $('.Las').append('<br><li><span class="cityToggle">Las Vegas: </span>The Orleans Hotel And Casino - <span class="price">$36.00</span></li>');
       $('.Las').append('<br><li><span class="cityToggle">Las Vegas: </span>Aria Resort And Casino - <span class="price">$89.00</span></li>');
       $('.Las').append('<br><li><span class="cityToggle">Las Vegas: </span>Treasure Island - <span class="price">$59.96</span></li>');

       $('.Cancun').append('<br><img src="/images/adventure/cancun_adventure.png" />');
       $('.Cancun').append('<br><li><span class="cityToggle">Cancun: </span>Riu Palace Las Americas - All Inclusive - <span class="price">$268.05</span></li>');
       $('.Cancun').append('<br><li><span class="cityToggle">Cancun: </span><li>Riu Caribe - All Inclusive - <span class="price">$224.98</span></li>');
       $('.Cancun').append('<br><li><span class="cityToggle">Cancun: </span>Riu Palace Peninsula - All Inclusive - <span class="price">$301.58</span></li>');
       $('.Cancun').append('<br><li><span class="cityToggle">Cancun: </span>Fiesta Americana Condesa Cancun - All Inclusive - <span class="price">$197.72</span></li>');
       $('.Cancun').append('<br><li><span class="cityToggle">Cancun: </span>The Royal Islander - An All Suites Resort - <span class="price">$101.05</span></li>');

       $('.Honolulu').append('<br><img src="/images/adventure/adventure_hawaii.png" />');
       $('.Honolulu').append('<br><li><span class="cityToggle">Hawaii: </span>Apartments at the Ilikai - <span class="price">$120.00</span></li>');
       $('.Honolulu').append('<br><li><span class="cityToggle">Hawaii: </span>Pacific Monarch Waikiki by Aloha Waikiki Condos - <span class="price">$173.3</span></li>');
       $('.Honolulu').append('<br><li><span class="cityToggle">Hawaii: </span>Hilton Hawaiian Village - <span class="price">$185.00</span></li>');
       $('.Honolulu').append('<br><li><span class="cityToggle">Hawaii: </span>Sweetwater at Waikiki - <span class="price">$173.00</span></li>');
       $('.Honolulu').append('<br><li><span class="cityToggle">Hawaii: </span>Aston Waikiki Beach Tower - <span class="price">$374.66</span></li>');

       $('.San').append('<br><img src="/images/adventure/sf-adventure.png" />');
       $('.San').append('<br><li><span class="cityToggle">San Francisco: </span>Inn At The Opera - <span class="price">$151.05</span></li>');
       $('.San').append('<br><li><span class="cityToggle">San Francisco: </span>Parc 55 San Francisco - A Hilton Hotel - <span class="price">$125.00</span></li>');
       $('.San').append('<br><li><span class="cityToggle">San Francisco: </span>Warwick San Francisco Hotel - <span class="price">$104.00</span></li>');
       $('.San').append('<br><li><span class="cityToggle">San Francisco: </span>Prescott Hotel - <span class="price">$189.00</span></li>');
       $('.San').append('<br><li><span class="cityToggle">San Francisco: </span>Hilton San Francisco - <span class="price">$134.83</li>');

       $('.undefined').append('<br><img src="/images/adventure/shanghai_adventure.png"/>');
       $('.undefined').append('<br><li><span class="cityToggle">Shanghai: </span>Hanting Hotel Shanghai Plaza 66 Branch - <span class="price">$33.63</li>');
       $('.undefined').append('<br><li><span class="cityToggle">Shanghai: </span>Cityhome Serviced Apartment Saintland - <span class="price">$40.43</li>');
       $('.undefined').append('<br><li><span class="cityToggle">Shanghai: </span>Lihao International Hotel - <span class="price">$40.50</li>');
       $('.undefined').append('<br><li><span class="cityToggle">Shanghai: </span>Intercontinental Shanghai Puxi - <span class="price">$124.16</li>');
       $('.undefined').append('<br><li><span class="cityToggle">Shanghai: </span>Crowne Plaza Hotel Fudan Shanghai - <span class="price">$90.01</li>');
    }

    $('.topDest li').on('click', function() {
      $('.receipt').show();
      $('.receipt.span').toggle();

      $('#receiptTitle').html("Group itinerary for a " + theme + " trip!");
       var hotelSelection = $(this).text();
       $('#hotelList').append('<li>' + hotelSelection+'</li>');
       $('#airportOr').html("Airport origin: " + city.toUpperCase());
       $('#deptDate').html("Departure date: " + departureDate);
       $('#returnDate').html("Arrival date: " + arrivalDate);
       $('#groupIt').html("Itinerary for " + groupNumber + " people.");
  
    });

    $(document).on('click', '#hotelList > li', function() {
        $(this).remove();
    });
  

    $('#share').on('click', function() {
      $('#googledoc').toggle();
    })


    socket.emit('cityData', cityArr);

    $('.themes').remove();
    $('.topDest').show();
  });

}) //end closure wrap
