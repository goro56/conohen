'use strict';

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 13
  });
  var infoWindow = new google.maps.InfoWindow({ map: map });

  // Try HTML5 geolocation.
  var pos = void 0;
  var marker = void 0;
  var infoWindows = new Array(10);

  infoWindows.map(function (iw) {
    iw = new google.maps.InfoWindow({
      content: ''
    });
  });

  var atFirst = true;
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(function (position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      if (atFirst) {
        marker = new google.maps.Marker({
          position: pos,
          map: map,
          title: 'Here!'
        });

        setInterval(function () {
          marker.setPosition(pos);
          map.setCenter(pos);
          $.ajax({
            url: "http://127.0.0.1:5000/hot_pepper",
            data: 'lat=' + pos.lat + '&lng=' + pos.lng + '&range=1',
            dataType: 'json',
            success: function success(dataset) {
              dataset.results.shop.map(function (shop, key) {
                infoWindows[key].setAttribute({
                  content: '<div><h2>' + shop.name + '</h2></div>',
                  pos: { lat: shop.lat, lng: shop.lng }
                });
                infoWindows[key].open(map);
              });
            }
          });
        }, 1000);
        atFirst = false;
      }
    }, function () {
      return handleLocationError(true, infoWindow, map.getCenter());
    }, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
}