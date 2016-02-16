var currentMarker = null,
    additionalMarkers = [];

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: -34.397, lng: 150.644}
  });

  var geocoder = new google.maps.Geocoder();

  Front.on('conversation', function (event) {
    var text = event.message.text,
        parseAddress = text && /^Address: (.*)$/m.exec(text);

    if (parseAddress)
      geocodeAddress(parseAddress[1], geocoder, map);
  });

  document.getElementById('generate_bookings').addEventListener('click', function () {
    if (!currentMarker)
      return;

    var pos = currentMarker.position;

    for (var i = 0; i < 3; i++) {
      var newLat = pos.lat() + epsilon(),
          newLng = pos.lng() + epsilon();

      var marker = new google.maps.Marker({
        map: map,
        position: {lat: newLat, lng: newLng}
      });

      marker.addListener('click', function () {
        geocoder.geocode({'location': marker.position}, function(results, status) {
          if (status !== google.maps.GeocoderStatus.OK)
            return;

          var newAddress = results[1].formatted_address;

          Front.confirm({
            title: 'Booking Change',
            message: 'Relocate customer to: ' + newAddress,
            okTitle: 'Update Booking'
          }, function (confirmed) {
            Front.reply({
              text: 'Sorry about that!\n\nWould this location work instead?\n\n' + newAddress
            });
          });
        });
      });

      additionalMarkers.push(marker);
    }
  });
}

function epsilon() {
  return Math.random() * 0.01 - 0.005;
}

function clearMarkers() {
  if (currentMarker)
    currentMarker.setMap(null);

  additionalMarkers.forEach(function (marker) {
    marker.setMap(null);
  });

  additionalMarkers = [];
  currentMarker = null;
}

function geocodeAddress(address, geocoder, resultsMap) {
  clearMarkers();

  geocoder.geocode({'address': address}, function (results, status) {
    if (status !== google.maps.GeocoderStatus.OK)
      return;

    resultsMap.setCenter(results[0].geometry.location);
    resultsMap.setZoom(16);

    currentMarker = new google.maps.Marker({
      map: resultsMap,
      position: results[0].geometry.location
    });
  });
}