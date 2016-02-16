var currentMarker = null;

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
}

function clearMarkers() {
  if (currentMarker)
    currentMarker.setMap(null);

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