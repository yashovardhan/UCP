/* $(window).load(function()
{
    var geocoder;
    var map;
    var marker;
 
  h2d = function(d)
    {
        return parseInt(d, 36);
    }
               
    back = function()
    {
               
        var rev1 = document.getElementById('ipcode1').value;
        var rev2 = document.getElementById('ipcode2').value;
        document.getElementById('copo').innerHTML = [h2d(rev1)/100,h2d(rev2)/100].join(', ');
    }
               
    codeAddress = function ()
    {
        geocoder = new google.maps.Geocoder();
               
        var address = document.getElementById('city_country').value;
               
        geocoder.geocode( { 'address': address}, function(results, status)
        {
                map = new google.maps.Map(document.getElementById('maparea'),{ zoom: 16, streetViewControl: false, mapTypeControlOptions:{ style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,mapTypeIds:[google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.ROADMAP]}, center: results[0].geometry.location, mapTypeId: google.maps.MapTypeId.ROADMAP });
                                
                map.setCenter(results[0].geometry.location);
                                
                marker = new google.maps.Marker({ map: map,position: results[0].geometry.location,draggable: true,title: 'drag'});
                                
                updateMarkerPosition(results[0].geometry.location);
                                
                updatetscode(results[0].geometry.location);
                                
                geocodePosition(results[0].geometry.location);
                                
                google.maps.event.addListener(marker, 'dragstart', function()
                {
                    updateMarkerAddress('Finding');
                });
                                
                google.maps.event.addListener(marker, 'drag', function()
                {
                    updateMarkerStatus('Moving');
                    updateMarkerPosition(marker.getPosition());
                    updatetscode(marker.getPosition());
                });
                                
                google.maps.event.addListener(marker, 'dragend', function()
                {
                    updateMarkerStatus('Stable');
                    geocodePosition(marker.getPosition());
                    map.panTo(marker.getPosition());
                });
                        
                google.maps.event.addListener(map, 'click', function(e)
                {
                    updateMarkerPosition(e.latLng);
                    updatetscode(e.latLng);
                    geocodePosition(marker.getPosition());
                    marker.setPosition(e.latLng);
                    map.panTo(marker.getPosition());
                });
        });
    }
               
               
    function geocodePosition(pos)
    {
        geocoder.geocode({latLng: pos}, function(responses)
        {
            if (responses && responses.length > 0)
            {
                updateMarkerAddress(responses[0].formatted_address);
            }
                         
            else
            {
                updateMarkerAddress('Cannot determine address at this location.');
            }
        });
    }
               
    function d2h(d)
    {
        return (+d).toString(36).toUpperCase();
    }
            
    function updateMarkerStatus(str)
    {
        document.getElementById('markerStatus').innerHTML = str;
    }
               
    function updateMarkerPosition(latLng)
    {
        document.getElementById('info').innerHTML = [latLng.lat(),latLng.lng()].join(', ');
    }
               
    function updatetscode(latLng)
    {
        var latitude = latLng.lat();
        var longitude = latLng.lng();
        var lati = Math.round(latitude*100);
        var long = Math.round(longitude*100);
            
        document.getElementById('tscode').innerHTML = [d2h(lati),d2h(long)].join('- ');
    }
               
    function updateMarkerAddress(str)
    {
        document.getElementById('address').innerHTML = str;
    }
               
});*/

var map;
function initMap() {
    // Create the map with no initial style specified.
    // It therefore has default styling.
    
    var chicago = {lat: 41.85, lng: -87.65};
    var indianapolis = {lat: 39.79, lng: -86.14};
    
    var map = new google.maps.Map(document.getElementById('map'), {
                                  center: chicago,
                                  zoom: 7
                                  });
    
    var directionsDisplay = new google.maps.DirectionsRenderer({
                                                               map: map
                                                               });
    
    // Set destination, origin and travel mode.
    var request = {
    destination: indianapolis,
    origin: chicago,
    travelMode: 'DRIVING'
    };
    
    // Pass the directions request to the directions service.
    var directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function(response, status) {
                            if (status == 'OK') {
                            // Display the route on the map.
                            directionsDisplay.setDirections(response);
                            }
                            });
    
    // Add a style-selector control to the map.
    var styleControl = document.getElementById('style-selector-control');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(styleControl);
    
    // Set the map's style to the initial value of the selector.
    var styleSelector = document.getElementById('style-selector');
    map.setOptions({styles: styles[styleSelector.value]});
    
    // Apply new JSON when the user selects a different style.
    styleSelector.addEventListener('change', function() {
                                   map.setOptions({styles: styles[styleSelector.value]});
                                   });

}

var styles = {
default: null,
    
night: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
        },
        {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
        },
        {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}]
        },
        {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}]
        },
        {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}]
        },
        {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}]
        },
        {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}]
        },
        {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}]
        },
        {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}]
        },
        {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}]
        },
        {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}]
        },
        {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
        },
        {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}]
        },
        {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}]
        },
        {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}]
        }
        ],
    
retro: [
        {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
        {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [{color: '#c9b2a6'}]
        },
        {
        featureType: 'administrative.land_parcel',
        elementType: 'geometry.stroke',
        stylers: [{color: '#dcd2be'}]
        },
        {
        featureType: 'administrative.land_parcel',
        elementType: 'labels.text.fill',
        stylers: [{color: '#ae9e90'}]
        },
        {
        featureType: 'landscape.natural',
        elementType: 'geometry',
        stylers: [{color: '#dfd2ae'}]
        },
        {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{color: '#dfd2ae'}]
        },
        {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#93817c'}]
        },
        {
        featureType: 'poi.park',
        elementType: 'geometry.fill',
        stylers: [{color: '#a5b076'}]
        },
        {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#447530'}]
        },
        {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#f5f1e6'}]
        },
        {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [{color: '#fdfcf8'}]
        },
        {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#f8c967'}]
        },
        {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#e9bc62'}]
        },
        {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry',
        stylers: [{color: '#e98d58'}]
        },
        {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry.stroke',
        stylers: [{color: '#db8555'}]
        },
        {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [{color: '#806b63'}]
        },
        {
        featureType: 'transit.line',
        elementType: 'geometry',
        stylers: [{color: '#dfd2ae'}]
        },
        {
        featureType: 'transit.line',
        elementType: 'labels.text.fill',
        stylers: [{color: '#8f7d77'}]
        },
        {
        featureType: 'transit.line',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#ebe3cd'}]
        },
        {
        featureType: 'transit.station',
        elementType: 'geometry',
        stylers: [{color: '#dfd2ae'}]
        },
        {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [{color: '#b9d3c2'}]
        },
        {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#92998d'}]
        }
        ],
};
