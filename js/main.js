$(window).load(function()
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
            if (status == google.maps.GeocoderStatus.OK)
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
                         
            }
            
            else
            {
                alert('Geocode was not successful for the following reason: ' +status);
            }
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
               
});
    
               
function initMap()
{
    var chicago = {lat: 41.85, lng: -87.65};
    var indianapolis = {lat: 39.79, lng: -86.14};
            
    var map = new google.maps.Map(document.getElementById('map'),
    {
        center: chicago,
        scrollwheel: false,
        zoom: 7
    });
               
    var directionsDisplay = new google.maps.DirectionsRenderer(
    {
        map: map
    });
               
    // Set destination, origin and travel mode.
    var request =
    {
        destination: indianapolis,
        origin: chicago,
        travelMode: 'DRIVING'
    };
               
    // Pass the directions request to the directions service.
    var directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function(response, status)
    {
        if (status == 'OK')
        {
            // Display the route on the map.
            directionsDisplay.setDirections(response);
        }
    });
}
