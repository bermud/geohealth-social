var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic2hoNSIsImEiOiJjamVnZDJsOGQyZHNmMndxZTlqNnhlYW50In0.FC9oeiu5qtD9o19qjlfkMg';
	
var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
    streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr}); 
var baseLayers = {
    "Grayscale": grayscale,
    "Streets": streets
};

		
var map = L.map('map', {
		center: [38.922778, -76.628333],
		zoom: 8,
		layers: [grayscale]
	});

var clusterSettings = { 
	maxClusterRadius : 30,
	showCoverageOnHover: true
  };

var markerClustersMock = L.markerClusterGroup(clusterSettings);
var markerClustersSample = L.markerClusterGroup(clusterSettings);



var radiiStyle =  {
		fill : false,
		weight : 5,
		color : 'red',
		radius : 20000
};	



radiiLayer = L.geoJson(radii, {
    pointToLayer: function (feature, latlng) {
        return L.circle(latlng, radiiStyle).setStyle(radiiStyle).setRadius(1000 * feature.properties.RAD);
    }, onEachFeature: onEachFeature
});


var mock_MarkerOptions = {
    radius: 10,
    fillColor: "#ff0000",
	color: "#33cc33",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.6
};

mockTweetsLayer = L.geoJson(myTweets, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, mock_MarkerOptions);
    }, onEachFeature: onEachFeature
});

var sample_MarkerOptions = {
    radius: 10,
    fillColor: "#55bc36",
    color: "#33cc33",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.6
};

sampleTweetsLayerRef = L.geoJson(sampleTweets, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, sample_MarkerOptions);
    }, onEachFeature: onEachFeature
});


countiesLayer = L.geoJson(counties, {
	color: "#0000ff",
	weight: 2,
	fill: false
});
	
var overlays = {
	"Counties" : countiesLayer,
	"Twitter Search Radii" : radiiLayer,
	"Mock Tweets" : markerClustersMock.addLayer(mockTweetsLayer),
	"Sample Tweets" : markerClustersSample.addLayer(sampleTweetsLayerRef)
};



var lc = L.control.layers(baseLayers, overlays, {collapsed : false, position : 'topright'});
map.addControl(lc);

 function onEachFeature(feature, layer) {
 if (feature.properties && feature.properties.text) {
 layer.bindPopup('<b>ID: </b>' + feature.properties.id.$numberLong + '<br>'
		+ '<b>Date/Time: </b>' + feature.properties.date + '<br><br>'
		+ '<b>Tweet: </b>' + feature.properties.text
		);
 }
 }