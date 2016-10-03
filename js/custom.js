
function initMap() {
	
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -36.8510317, lng: 174.76171 },
        zoom: 14,
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl: false,
    });
 
    var input = /** @type {!HTMLInputElement} */ (
        document.getElementById('pac-input'));
    var types = document.getElementById('type-selector');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();

    var marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        origin: new google.maps.Point(0, 0),
        anchorPoint: new google.maps.Point(140, 94)
    });

    autocomplete.addListener('place_changed', function() {

        infowindow.close();

        marker.setVisible(false);

        var place = autocomplete.getPlace();

        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17); // Why 17? Because it looks good.
        }
        marker.setIcon( /** @type {google.maps.Icon} */ ({
          url: '../img/pin-text-markup.png',
	        size: new google.maps.Size(307, 120),
	        origin: new google.maps.Point(0, 0),
	        anchor: new google.maps.Point(140, 94),
	        scaledSize: new google.maps.Size(307, 120)
        }));
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        infowindow.setContent('<div id="select tip"><strong>' + place.name + '</strong>' + address);

        google.maps.event.addListener(marker, 'click', function(event) {
            // infowindow.open(map, marker);
            // If we need to open infowindow just comment it in
            var name = place.name,
            	placeId = place.place_id;
            map.setCenter(alert('Place Id:' + placeId));
            // Refer the Place JSON API https://developers.google.com/places/web-service/add-place#delete-place
            
        });

    });

    // Sets a listener on a radio button to change the filter type on Places
    // Autocomplete.
    function setupClickListener(id, types) {
        var radioButton = document.getElementById(id);
        radioButton.addEventListener('click', function() {
            autocomplete.setTypes(types);
        });
    }
    setupClickListener('changetype-all', []);
    setupClickListener('changetype-address', ['address']);
    setupClickListener('changetype-establishment', ['establishment']);
    setupClickListener('changetype-geocode', ['geocode']);
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
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCfyXx6OZN1rxv-l9maDU0_3BPak9Xocb4&libraries=places&callback=initMap';
    document.body.appendChild(script);
}
// API Key: AIzaSyCfyXx6OZN1rxv-l9maDU0_3BPak9Xocb4
// This API owned by Aiden so it could be replaced by client one or else

window.onload = loadScript;
