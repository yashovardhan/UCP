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
