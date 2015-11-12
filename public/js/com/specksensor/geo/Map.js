//======================================================================================================================
// Class for making it easier to work with a Google map with custom markers.
//
// Dependencies:
// * Google Maps (https://maps.googleapis.com/maps/api/js)
// * Canvas Layer (https://github.com/CMU-CREATE-Lab/data-visualization-tools/blob/master/js/CanvasLayer.js)
// * jQuery (http://jquery.com/)
//
// Author: Chris Bartley (bartley@cmu.edu)
//======================================================================================================================

//======================================================================================================================
// VERIFY NAMESPACE
//======================================================================================================================
// Create the global symbol "com" if it doesn't exist.  Throw an error if it does exist but is not an object.
var com;
if (!com) {
   com = {};
}
else {
   if (typeof com != "object") {
      var comExistsMessage = "Error: failed to create com namespace: com already exists and is not an object";
      alert(comExistsMessage);
      throw new Error(comExistsMessage);
   }
}

// Repeat the creation and type-checking for the next level
if (!com.specksensor) {
   com.specksensor = {};
}
else {
   if (typeof com.specksensor != "object") {
      var comSpecksensorExistsMessage = "Error: failed to create com.specksensor namespace: com.specksensor already exists and is not an object";
      alert(comSpecksensorExistsMessage);
      throw new Error(comSpecksensorExistsMessage);
   }
}

// Repeat the creation and type-checking for the next level
if (!com.specksensor.geo) {
   com.specksensor.geo = {};
}
else {
   if (typeof com.specksensor.geo != "object") {
      var comSpecksensorGeoExistsMessage = "Error: failed to create com.specksensor.geo namespace: com.specksensor.geo already exists and is not an object";
      alert(comSpecksensorGeoExistsMessage);
      throw new Error(comSpecksensorGeoExistsMessage);
   }
}
//======================================================================================================================

(function() {
   var DEFAULT_MAP_OPTIONS = {
      center : new google.maps.LatLng(38.00325787792078, -95.4462277304077),
      zoom : 4,
      mapTypeId : google.maps.MapTypeId.ROADMAP,
      panControl : false,
      zoomControl : true,
      mapTypeControl : true,
      scaleControl : true,
      streetViewControl : false,
      overviewMapControl : false
   };

   var DEFAULT_MARKER_OPTIONS = {
      searchDistanceFromMarkerInPixels : 10
   };

   var RADIUS_OF_EARTH_KM = 6371; // radius of the Earth in kilometers

   com.specksensor.geo.Map = function(domElementId) {
      var map = null;
      var geocoder = new google.maps.Geocoder();
      var mapProjection;
      var mapCenter; // keep track of the map's center point so we can recenter the map upon resizing the browser
      var canvasLayer;
      var context;
      var isCanvasInitialized = false;
      var markerOptions = null;
      var markerRenderingCallbacks = {
         onBeforeRender : null,
         onAfterRender : null
      };

      var markers = {};
      var activeMarkers = {};
      var self = this;

      this.getMarkerById = function(id) {
         return markers[id];
      };

      this.initialize = function(mapOptions, mapMarkerOptions, callbacks) {
         // copy map option defaults
         mapOptions = mapOptions || {};
         for (var key in DEFAULT_MAP_OPTIONS) {
            mapOptions[key] = mapOptions[key] || DEFAULT_MAP_OPTIONS[key];
         }

         // copy marker option defaults
         mapMarkerOptions = mapMarkerOptions || {};
         for (var key in DEFAULT_MARKER_OPTIONS) {
            mapMarkerOptions[key] = mapMarkerOptions[key] || DEFAULT_MARKER_OPTIONS[key];
         }
         markerOptions = mapMarkerOptions;

         callbacks = callbacks || {
                  handleInitializationComplete : null,
                  handleMarkerSelected : null,
                  onBeforeRenderMarkers : null,
                  onAfterRenderMarkers : null
               };

         markerRenderingCallbacks.onBeforeRender = callbacks.onBeforeRenderMarkers;
         markerRenderingCallbacks.onAfterRender = callbacks.onAfterRenderMarkers;

         map = new google.maps.Map(document.getElementById(domElementId), mapOptions);

         // Add an idle event listener ONCE to handle map loading.
         google.maps.event.addListenerOnce(map, 'idle', function() {
            console.log("Map loading done!");
            mapProjection = map.getProjection();
            initializeCanvas();
            if (typeof callbacks.handleInitializationComplete === 'function') {
               try {
                  callbacks.handleInitializationComplete();
               }
               catch (e) {
                  console.log("Error calling the handleInitializationComplete() callback function given to Map.initialize(): " + e);
               }
            }
         });

         // listen for mouse move and click events
         google.maps.event.addListener(map, 'mousemove', createCanvasFeatureDetectingMouseEventHandler(
               function(marker) {
                  map.setOptions({ draggableCursor : 'pointer' });
               },
               function() {
                  map.setOptions({ draggableCursor : null });
               }
         ));
         google.maps.event.addListener(map, 'click', createCanvasFeatureDetectingMouseEventHandler(
               function(marker, nearbyMarkers) {
                  var id = marker['id'];

                  if (typeof callbacks.handleMarkerSelected === 'function') {
                     try {
                        callbacks.handleMarkerSelected(marker, nearbyMarkers);
                     }
                     catch (e) {
                        console.log("Error calling the handleMarkerSelected() callback function given to Map.initialize(): " + e);
                     }
                  }
               },
               function() {
                  // nothing to do
               }
         ));

         // keep track of the map's center so that we can recenter it upon resize of the browser (found at http://stackoverflow.com/q/8792676/703200)
         google.maps.event.addDomListener(map, 'idle', function() {
            mapCenter = map.getCenter();
         });

         // when detecting a browser resize, kick the map to resize itself and then recenter using the center point obtained during idle
         google.maps.event.addDomListener(window, 'resize', function() {
            google.maps.event.trigger(map, 'resize');
            map.setCenter(mapCenter);
         });
      };

      // Add a marker to the map (TODO: add warning about using black in marker color!)
      this.addMarker = function(id, location, renderingStrategy) {
         markers[id] = {
            id : id,
            location : location,
            worldPoint : mapProjection.fromLatLngToPoint(location),
            value : null,
            render : renderingStrategy
         };
         this.setMarkersActiveById([id], true);
      };

      this.setMarkersActiveById = function(markerIds, isActive){
         markerIds.forEach(function(id){
            if (isActive && id in markers) {
               activeMarkers[id] = markers[id];
            } else {
               delete activeMarkers[id];
            }
         });
      };

      this.renderMarkers = function() {

         var beforeRenderObj = null;
         if (typeof markerRenderingCallbacks.onBeforeRender === 'function') {
            try {
               beforeRenderObj = markerRenderingCallbacks.onBeforeRender(context);
            }
            catch (e) {
               console.log("Error calling the onBeforeRenderMarkers() callback function given to Map.initialize(): " + e);
            }
         }

         // clear previous canvas contents
         context.clearRect(0, 0, canvasLayer.canvas.width, canvasLayer.canvas.height);

         // render the points
         var mapBounds = map.getBounds();
         $.each(activeMarkers, function(markerId, marker) {
            // TODO: this bounds containment check could be smarter...
            if (mapBounds.contains(marker['location'])) {

               // compute the canvas position for this point
               var markerCoords = self.worldPointToCanvasPixelCoords(marker['worldPoint']);

               marker.render(marker, markerCoords, context, beforeRenderObj);
            }
         });

         if (typeof markerRenderingCallbacks.onAfterRender === 'function') {
            try {
               markerRenderingCallbacks.onAfterRender(context);
            }
            catch (e) {
               console.log("Error calling the onAfterRenderMarkers() callback function given to Map.initialize(): " + e);
            }
         }
      };

      // fit the map to show all markers
      this.fitMapBoundsToMarkers = function() {
         var markerIds = Object.keys(markers);
         if (markerIds.length > 0) {
            var bounds = new google.maps.LatLngBounds();
            markerIds.forEach(function(id) {
               var marker = markers[id];
               bounds.extend(marker.location);
            });
            map.fitBounds(bounds);
         }
      };

      /**
       * Fits the map to show all the <code>LatLng</code>s in the given array.
       *
       * @param {google.maps.LatLng[]} latLngs
       */
      this.fitMapBoundsToLocations = function(latLngs) {
         var bounds = new google.maps.LatLngBounds();
         latLngs.forEach(function(latLng) {
            bounds.extend(latLng);
         });
         map.fitBounds(bounds);
      };

      /**
       * Sets the map view to fit the given bounds.
       *
       * @param {google.maps.LatLngBounds} bounds
       */
      this.fitBounds = function(bounds) {
         map.fitBounds(bounds);
      };

      this.setWidth = function(desiredWidth) {
         $("#" + domElementId).width(desiredWidth);
         google.maps.event.trigger(map, 'resize');
         map.setCenter(mapCenter);
      };

      this.setHeight = function(desiredHeight) {
         $("#" + domElementId).height(desiredHeight);
         google.maps.event.trigger(map, 'resize');
         map.setCenter(mapCenter);
      };

      this.setCenter = function(latOrLatLng, lng) {
         var center = null;
         if (latOrLatLng instanceof google.maps.LatLng) {
            center = latOrLatLng
         }
         else {
            center = new google.maps.LatLng(latOrLatLng, lng);
         }

         map.setCenter(center);
      };

      this.setZoomLevel = function(zoomLevel) {
         map.setZoom(zoomLevel);
      };

      this.getWrappedMap = function() {
         return map;
      };

      // Google's geocoding API docs: https://developers.google.com/maps/documentation/javascript/geocoding
      this.geocodeAddress = function(address, callback) {
         // don't bother doing anything if the callback isn't a function
         if (typeof callback == 'function') {
            geocoder.geocode({ 'address' : address }, function(results, status) {
               if (status === google.maps.GeocoderStatus.OK) {
                  callback(null, results && results[0] && results[0].geometry ? results[0].geometry.location : null, results);
               }
               else {
                  callback(new Error("Geocoding failed: " + status));
               }
            });
         }
      };

      var PI_OVER_180 = Math.PI / 180;
      var INVERSE_OF_PI_OVER_180 = 180 / Math.PI;
      var PI_OVER_2 = Math.PI / 2;

      var degreesToRadians = function(degrees) {
         return degrees * PI_OVER_180;
      };
      var radiansToDegrees = function(radians) {
         return radians * INVERSE_OF_PI_OVER_180;
      };

      // Got this from http://janmatuschek.de/LatitudeLongitudeBoundingCoordinates
      // will return a google.maps.LatLngBounds
      this.getBoundingBoxAroundLocation = function(centerLatLong, distanceFromCenterInKm) {
         // make sure distanceFromCenterInKm is numeric, and positive
         var distanceFromCenterInKmAsFloat = parseFloat(distanceFromCenterInKm);
         if ($.isNumeric(distanceFromCenterInKm) && distanceFromCenterInKmAsFloat > 0) {
            // make sure the center is a LatLng
            if (centerLatLong instanceof google.maps.LatLng) {

               var r = distanceFromCenterInKmAsFloat / RADIUS_OF_EARTH_KM;  // angular radius of the query circle
               var lat = degreesToRadians(centerLatLong.lat());
               var lng = degreesToRadians(centerLatLong.lng());
               var latMin = lat - r;
               var latMax = lat + r;
               var deltaLng = Math.asin(Math.sin(r) / Math.cos(lat));
               var lngMin = lng - deltaLng;
               var lngMax = lng + deltaLng;

               // Now deal with poles: "If latmax...is greater than PI/2, then the North Pole is within the query
               // circle, which means that parts of all meridians are within the query circle as well. If latmin is smaller
               // than -PI/2, then the South Pole is within the query circle..."
               if (latMax > PI_OVER_2) {           // if the North Pole is within the query circle
                  lngMin = -Math.PI;
                  latMax = PI_OVER_2;
                  lngMax = Math.PI;
               }
               else if (latMin < -PI_OVER_2) {     // if the South Pole is within the query circle
                  latMin = -PI_OVER_2;
                  lngMin = -Math.PI;
                  lngMax = Math.PI;
               }

               // Google's LatLngBounds class knows how to deal with spanning the 180th meridian, so we don't need
               // to bother with the special cases in the article.
               return new google.maps.LatLngBounds(
                     new google.maps.LatLng(
                           radiansToDegrees(latMin),
                           radiansToDegrees(lngMin)
                     ),
                     new google.maps.LatLng(
                           radiansToDegrees(latMax),
                           radiansToDegrees(lngMax)
                     )
               );
            }
            else {
               throw Error("Invalid centerLatLong. Must be an instance of google.maps.LatLng.");
            }
         }
         else {
            throw Error("Invalid distanceFromCenterInKm. Must be numeric and positive.");
         }
      };

      var initializeCanvas = function() {
         // initialize the canvasLayer
         var canvasLayerOptions = {
            map : map,
            resizeHandler : function() {
               // nothing to do
            },
            animate : false,
            updateHandler : self.renderMarkers
         };
         canvasLayer = new CanvasLayer(canvasLayerOptions);
         context = canvasLayer.canvas.getContext('2d');
         isCanvasInitialized = true;
      };

      var createCanvasFeatureDetectingMouseEventHandler = function(featureDetectedCallback, featureNotDetectedCallback) {
         return function(evt) {
            if (evt && evt.latLng && mapProjection != null) {

               // convert the mouse event latLng to canvas coords
               var eventPoint = self.worldPointToCanvasPixelCoords(mapProjection.fromLatLngToPoint(evt.latLng));

               if (eventPoint) {
                  // get the canvas color at this pixel to see whether there's a point drawn here (very important to take
                  // the DEVICE_PIXEL_RATIO into account here!)
                  var imageData = context.getImageData(eventPoint.x, eventPoint.y, 1, 1);

                  if (imageData.data[0] != 0 ||
                      imageData.data[1] != 0 ||
                      imageData.data[2] != 0) {

                     // iterate over all the points to see which is closest to this pixel
                     var mapBounds = map.getBounds();
                     var bestPoint = null;
                     var bestDistance = markerOptions.searchDistanceFromMarkerInPixels;
                     var matchingPoints = [];
                     $.each(activeMarkers, function(markerId, marker) {
                        // TODO: this bounds containment check could be smarter...
                        if (mapBounds.contains(marker['location'])) {

                           // compute the canvas position for this marker
                           var candidate = self.worldPointToCanvasPixelCoords(marker['worldPoint']);

                           if (candidate) {
                              // compute the distance between this marker's point and the event point
                              var distance = Math.sqrt(Math.pow(candidate.x - eventPoint.x, 2) + Math.pow(candidate.y - eventPoint.y, 2));

                              if (distance <= markerOptions.searchDistanceFromMarkerInPixels) {
                                 // remember all the markers that are close
                                 matchingPoints.push(marker);

                                 // if the distance is less than the bestDistance found so far, then we've found a hit
                                 if (distance <= bestDistance) {
                                    bestPoint = marker;
                                    bestDistance = distance;
                                 }
                              }
                           }
                        }
                     });

                     if (bestPoint != null) {
                        featureDetectedCallback(bestPoint, matchingPoints);
                     }
                     else {
                        featureNotDetectedCallback();
                     }
                  }
                  else {
                     featureNotDetectedCallback();
                  }
               }
            }
         }
      };

      this.worldPointToCanvasPixelCoords = function(worldPoint) {
         var translation = canvasLayer.getMapTranslation();
         var scale = canvasLayer.getMapScale();
         if (typeof translation !== 'undefined' && translation != null &&
             typeof scale !== 'undefined' && scale != null) {
            return {
               x : (worldPoint.x + translation.x) * scale,
               y : (worldPoint.y + translation.y) * scale
            };
         }

         return null;
      };

      // the "constructor"
      (function() {
      })();
   };
})();
