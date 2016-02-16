Front.on('conversation', function (event) {
  log(event.contact.handle);
});

function log(msg) {
  var $log = document.getElementById('log');
  $log.innerHTML = $log.innerHTML + '<br>' + msg;
}