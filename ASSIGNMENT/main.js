var myLatLng = { lat: 25.276987, lng: 55.296249};

var mapOptions = {
    center: myLatLng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP

};

var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

const input = document.getElementById("city");
const searchBox = new google.maps.places.SearchBox(input);

map.controls.push(input);

map.addListener("bounds_changed", () => {
  searchBox.setBounds(map.getBounds());
});

let markers = [];


searchBox.addListener("places_changed", () => {
  const places = searchBox.getPlaces();

  if (places.length == 0) {
    return;
  }

  
  markers.forEach((marker) => {
    marker.setMap(null);
  });
  markers = [];

 
  const bounds = new google.maps.LatLngBounds();

  places.forEach((place) => {
    if (!place.geometry || !place.geometry.location) {
      console.log("Returned place contains no geometry");
      return;
    }

    const icon = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25),
    };

  
    markers.push(
      new google.maps.Marker({
        map,
        icon,
        title: place.name,
        position: place.geometry.location,
      })
    );
    if (place.geometry.viewport) {
      
      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
    }
  });
  map.fitBounds(bounds);
});

directionsService.route(request, function (result, status) {
  if (status == google.maps.DirectionsStatus.OK) {

const output = document.querySelector('#output');

output.innerHTML = "<div class='alert-info'>You search for: " + document.getElementById("city").value + "</div>";


directionsDisplay.setDirections(result);
} else {

directionsDisplay.setDirections({ routes: [] });

output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> The City Does Not Exist .</div>";
}
});


var options = {
  types: ['(cities)']
}

var input1 = document.getElementById("city");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);
