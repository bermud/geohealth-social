
This project uses the Leaflet javascipt library to produce a web-viewable map. The geo_health_demo.html file for the web page references the necessary Leaflet scripts, incorporating a unique Leaflet access key.
Please consult the Leaflet tutorial documenation for information on setting up a basic map with one's own key. https://leafletjs.com/examples/quick-start/
A Leaflet tutorial for incorporating GeoJSON data can be found here   https://leafletjs.com/examples/geojson/

The HTML also references JSON files which serve as the source of geographic data for the map. Each JSON file contains a javascipt variable wrapped around the JSON data. All files containing layer data are stored in the Web_Data folder.

The Javascript code for implementation of the map itself is found in the geo_health_demo.js file. Individual components are commented in the code.

Layers for political boundaries or other static geographies are JSON files containing polygons and imported into Leaflet using the L.geojson() method.

The Twitter search area radii layer is a static layer to visualize the regions from which data was acquired using
the Twitter API. It was created manually by storing the center points and radii (in km) in a CSV file which was converted to GeoJSON using  http://www.convertcsv.com/csv-to-geojson.htm    When imported as a layer, the center points are used as the geography and the "RAD" feature property is used to style the size of the circles.

The map marker clustering was created using Leaflet JavaScript Library. Markers usually overlap on maps and visualizing them in cluster from makes the map neater in appearance and visually appealing.
Documentation for creating a cluster marker is done using a L.markerClusterGroup and  can be found here: https://leafletjs.com/2012/08/20/guest-post-markerclusterer-0-1-released.html

