$(function() {

var socket = io(); //create an io connection

// $('.group-number').keypress(function(e) {
//   if(e.which == 13) {
//   groupNum = $('.group-number').val();
//   console.log(groupNum)
//
//   }
// })

$('.explore').on('click', function() {
  $('.themes').toggle();
  var groupNumber = $('.group-number').val();
  var city = $('.city').val();
  var departureDate = $('.deprture-date').val();
  var arrivalDate = $('.arrival-date').val();

  var numNights = $('.num-nights').val();
  var maxBudget = $('.max-budget').val();
  var theme = "Beach";

  socket.emit('params', groupNumber, city, departureDate, arrivalDate, numNights, maxBudget, theme)
  console.log('groupNumber:', groupNumber, 'city:', city, 'departureDate:', arrivalDate, 'numNights:', 'maxBudget:', maxBudget)

  event.preventDefault();
})

}) //end closure wrap
