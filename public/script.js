$(function() {

var socket = io(); //create an io connection
var groupNum;

$('.group-number').keypress(function(e) {
  if(e.which == 13) {
  groupNum = $('.group-number').val();
  console.log(groupNum)

  }
})

$('.explore').on('click', function() {
  $('.first-page').remove();
  socket.emit('groupNum', groupNum)
  event.preventDefault();
})

}) //end closure wrap
