Front.on('conversation', function (event) {
  log(event.message.text);
});

function log(msg) {
  console.log(msg);

  var $log = document.getElementById('log');
  $log.innerHTML = $log.innerHTML + '<br>' + msg;
}