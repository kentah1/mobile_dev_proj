window.onload = function() {
var sfLatlng, map, passedURL, passedBldg;
//passedURL = document.URL;
//passedBldg = passedURL.substr(passedURL.indexOf("=") + 1);
passedBldg = window.localStorage.getItem("buildingNum");
sfLatlng = pickMap(passedBldg);
initialize();
google.maps.event.addDomListener(window, 'load', initialize);
function initialize() {
    'use strict';
    var mapOptions = {
        zoom: 18,
        center: sfLatlng,
		streetViewControl: false,
		panControl:true,
zoomControl:false,
mapTypeControl:false,
scaleControl:false,
overviewMapControl:false,
rotateControl:true,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    var marker = new google.maps.Marker({
        position: sfLatlng,
        animation: google.maps.Animation.DROP,
        map: map
    });
 // If able to get location put location marker for current location
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var currentpos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var marker1 = new MarkerWithLabel({
        draggable: true,
       raiseOnDrag: true,
        position: currentpos,
        map: map,
		labelContent: 'You are here',
		labelAnchor: new google.maps.Point(16, 0),
        labelClass: "h6", // the CSS class for the label
        labelStyle: {opacity: 1}
      });
	});
	}

}

// get the lat/long of the building number entered - return google map coordinate object
function pickMap(buildingNumber) {
    'use strict';
    var sfLatlng;
    switch (Number(buildingNumber)) {
    case 1:
        sfLatlng = new google.maps.LatLng(38.661583, -121.127394);
        break;
    case 2:
        sfLatlng = new google.maps.LatLng(38.661775, -121.1284);
        break;
    case 3:
        sfLatlng = new google.maps.LatLng(38.662189, -121.127319);
        break;
    case 4:
        sfLatlng = new google.maps.LatLng(38.661958, -121.128822);
        break;
    case 5:
        sfLatlng = new google.maps.LatLng(38.662411, -121.128261);
        break;
    case 6:
        sfLatlng = new google.maps.LatLng(38.66215, -121.126733);
        break;
    default:
        sfLatlng = new google.maps.LatLng(38.661583, -121.127394);
        alert("Invalid building number");
    }
    return sfLatlng;
}
}