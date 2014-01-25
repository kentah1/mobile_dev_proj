window.onload = function() {
var sfLatlng, map, passedURL, passedBldg;
//get the building number to use
var urlString = location.search;
passedBldg = window.localStorage.getItem("buildingNum");

//if it is null then have the user enter it
if (passedBldg === "" || passedBldg === null) {
	getBuilding();
	passedBldg = window.localStorage.getItem("buildingNum");
} else {
//if it came from a class schedule link - get it in the right format
if (urlString.length > 0) {
	passedBldg = urlString;
	passedBldg = passedBldg.replace( /^\D+/g, ''); //strip the junk
	window.localStorage.setItem("buildingNum",passedBldg);
}
}
sfLatlng = pickMap(passedBldg);
initialize();
google.maps.event.addDomListener(window, 'load', initialize);
function initialize() {
    'use strict';
	
    var mapOptions = {
        zoom: 18,
        center: sfLatlng,
		streetViewControl: false,
		panControl:false,
        zoomControl:false,
        mapTypeControl:false,
        scaleControl:false,
        overviewMapControl:false,
        rotateControl:false,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    var marker = new MarkerWithLabel({
        position: sfLatlng,
        animation: google.maps.Animation.DROP,
        map: map,
		labelContent: "FL" + passedBldg,
		labelAnchor: new google.maps.Point(16, 0),
        labelClass: "h6", // the CSS class for the label
        labelStyle: {opacity: 1}
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
	case 7:
        sfLatlng = new google.maps.LatLng(38.661654, -121.126544);
        break;
    case 8:
        sfLatlng = new google.maps.LatLng(38.661774, -121.125958);
        break;
    case 9:
        sfLatlng = new google.maps.LatLng(38.660655, -121.127438);
        break;
    case 10:
        sfLatlng = new google.maps.LatLng(38.662465, -121.129537);
        break;
    case 11:
        sfLatlng = new google.maps.LatLng(38.662551, -121.127348);
        break;
    case 12:
        sfLatlng = new google.maps.LatLng(38.660918, -121.12331);
        break;
    default:
        sfLatlng = new google.maps.LatLng(38.661583, -121.127394);
        alert("Invalid building number");
    }
    return sfLatlng;
}
		function getBuilding() {
			var buildingNum  = prompt("Enter Building to Find","");
			if (buildingNum != null) {
			//if it has letters, (like FL) strip them off
				buildingNum = buildingNum.replace( /^\D+/g, '');
			}
			if (buildingNum > 0 && buildingNum < 13) {
				 window.localStorage.setItem("buildingNum",buildingNum);
				return;
			}
			//failed to get valid building number
			alert("Invalid Building Number\nTry Again");
			getBuilding();
		}

}