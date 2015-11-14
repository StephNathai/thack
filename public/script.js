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
  var departureDate = $('.deprture-date').val();
  var arrivalDate = $('.arrival-date').val();

  var numNights = $('.num-nights').val();
  var maxBudget = $('.max-budget').val();

  socket.emit('params', groupNumber, city, departureDate, arrivalDate, numNights, maxBudget, theme)
  console.log('groupNumber:', groupNumber, 'city:', city, 'departureDate:', arrivalDate, 'numNights:', 'maxBudget:', maxBudget, 'theme', theme)

  event.preventDefault();

})

}) //end closure wrap
