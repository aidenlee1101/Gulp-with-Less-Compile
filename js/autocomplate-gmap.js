// This example adds a search box to a map, using the Google Place Autocomplete
      // feature. People can enter geographical searches. The search box will return a
      // pick list containing a mix of places and predicted search terms.

      // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -36.8510317, lng: 174.76171},
    zoom: 14,
    mapTypeControl: false,
    zoomControl: false,
    streetViewControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });


  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];

  var infowindow = new google.maps.InfoWindow();

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {

    var infowindow = new google.maps.InfoWindow();
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {

      marker.setMap(null);

    });

    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();

    places.forEach(function(place) {

      var icon = {
        url: '../img/pin-icon.png',
        size: new google.maps.Size(200, 200),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(32, 64),
        animation: google.maps.Animation.DROP,
        scaledSize: new google.maps.Size(80, 80)
      };
      // var icon = {
      //   url: '../img/pin-text-markup.png',
      //   size: new google.maps.Size(307, 120),
      //   origin: new google.maps.Point(0, 0),
      //   anchor: new google.maps.Point(140, 94),
      //   scaledSize: new google.maps.Size(307, 120)
      // };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,

        position: place.geometry.location
      }));
    for (var i = 0; i < data.length; i++) {
      var current = data[i];
      infowindow.setContent('<div id="select tip"><strong>' + place.name + '</strong>');

      google.maps.event.addListener(markers, 'click', function(e) {
        infowindow.open(map,markers);
      });
    }

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }

    });

    map.fitBounds(bounds);

  });

}


function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCfyXx6OZN1rxv-l9maDU0_3BPak9Xocb4&libraries=places&callback=initAutocomplete';
  document.body.appendChild(script);
 }

 window.onload = loadScript;