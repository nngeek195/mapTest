let map;
        let marker;

        function initMap() {
            // Default location in case geolocation doesn't work
            const defaultLocation = { lat: 7.8731, lng: 80.7718 }; // Coordinates of Sri Lanka

            // Create a map object centered on the default location
            map = new google.maps.Map(document.getElementById("map"), {
                zoom: 8,
                center: defaultLocation
            });
        }

        function getLocation() {
            // Check if the browser supports geolocation
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function (position) {
                        // Get exact latitude and longitude
                        const pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };

                        // Center the map on user's location
                        map.setCenter(pos);

                        // If marker exists, remove it first
                        if (marker) {
                            marker.setMap(null);
                        }

                        // Add a new marker at the user's current location
                        marker = new google.maps.Marker({
                            position: pos,
                            map: map,
                            title: "You are here!"
                        });
                    },
                    function () {
                        handleLocationError(true, map.getCenter());
                    }
                );
            } else {
                // If the browser doesn't support geolocation
                handleLocationError(false, map.getCenter());
            }
        }

        function handleLocationError(browserHasGeolocation, pos) {
            alert(
                browserHasGeolocation
                    ? "Error: The Geolocation service failed. Please allow location access."
                    : "Error: Your browser doesn't support geolocation."
            );
        }

        // Initialize the map when the page loads
        window.onload = initMap;