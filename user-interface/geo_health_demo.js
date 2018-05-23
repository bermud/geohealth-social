
/*Map attribution */
var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic2hoNSIsImEiOiJjamVnZDJsOGQyZHNmMndxZTlqNnhlYW50In0.FC9oeiu5qtD9o19qjlfkMg';


/* Use Leaflet base layers */	
var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
    streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr}); 
var baseLayers = {
    "Grayscale": grayscale,
    "Streets": streets
};

/*Initiate map, define initial center point and zoom level */		
var map = L.map('map', {
		center: [38.922778, -76.628333],
		zoom: 8,
		layers: [grayscale]
	});

/*Create clustering system.  maxClusterRadius controls the precision used during cluster formation */	
var clusterSettings = { 
	maxClusterRadius : 30,
  };
var markerClustersSample = L.markerClusterGroup(clusterSettings);

/*Style Twitter search area radii */
var radiiStyle =  {
		fill : false,
		weight : 5,
		color : 'red',
		radius : 20000
};	

/* Create a layer of geographic circles describing the radius of Twitter search areas in meters.
   Source JSON file describes center points and radii in kilometers */
radiiLayer = L.geoJson(radii, {
    pointToLayer: function (feature, latlng) {
        return L.circle(latlng, radiiStyle).setStyle(radiiStyle).setRadius(1000 * feature.properties.RAD);
    }, onEachFeature: onEachFeature
});

/*Style markers for individual tweets. This assumes circles are being used as icons for tweets */
var sample_MarkerOptions = {
    radius: 10,
    fillColor: "#55bc36",
    color: "#33cc33",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.6
};

/*Imports geographic Twitter data from JSON file and creates a layer of circular icons */
tweetsLayer= L.geoJson(tweets, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, sample_MarkerOptions);
    }, onEachFeature: onEachFeature
});

/*Imports a JSON file of county boundaries as hollow polygons */
countiesLayer = L.geoJson(counties, {
	color: "#0000ff",
	weight: 2,
	fill: false
});

/* All overlays (non-basemap layers) that will appear in the layer control interface must appear
   together in a variable */
var overlays = {
	"Counties" : countiesLayer,
	"Twitter Search Radii" : radiiLayer,
	/* Layers that use the clustering system must be added to the markerClusterGroup before it 
	   the markerClusterGroup can be added to the Layer Control */
	"Sample Tweets" : markerClustersSample.addLayer(tweetsLayer)
};

/*Adds Layer Control interface to the map */
var lc = L.control.layers(baseLayers, overlays, {collapsed : false, position : 'topright'});
map.addControl(lc);

/*Adds popup information text for individual tweets that have text data provided */
 function onEachFeature(feature, layer) {
 if (feature.properties && feature.properties.text) {
 layer.bindPopup('<b>ID: </b>' + feature.properties.id.$numberLong + '<br>'
		+ '<b>Date/Time: </b>' + feature.properties.date + '<br><br>'
		+ '<b>Tweet: </b>' + feature.properties.text
		);
 }
 }