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


<!-- Mock data of Shady Grove campus for adding polygons -->
var shadyCoords = [          
                    [39.095431, -77.201409],
                    [39.093194, -77.197503],
                    [39.092994, -77.196757],
                    [39.091408, -77.197956],
                    [39.090456, -77.201567],
                    [39.093537, -77.202562],
					[39.095272, -77.201869]
        ];

var shadygrove = L.polygon(shadyCoords, {
		color : 'green',
		fillcolor : 'green',
		fillopacity : 1
		});		
<!-- End Shady Grove data -->
		
var map = L.map('map', {
		center: [38.922778, -76.628333],
		zoom: 8,
		layers: [grayscale]
	});
	

var countystyle = {
	fillColor: "#0000ff",
	color: "#33cc33",
	weight: 3,
	opacity: 1,
	fillopacity: 1
	};
	
var opiates_MarkerOptions = {
    radius: 10,
    fillColor: "#ff0000",
	color: "#33cc33",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.6
};

/* COMMENT OUT THIS PART WHILE I FIGURE OUT THE REST
var narcan_MarkerOptions = {
    radius: 10,
    fillColor: "#0000ff",
    color: "#33cc33",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.6
};

var overdose_MarkerOptions = {
    radius: 10,
    fillColor: "#55bc36",
    color: "#33cc33",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.6
};


narcanTweetsLayer = L.geoJson(sarah_tweets, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng,narcan_MarkerOptions);
    }, onEachFeature: onEachFeature
});

overdoseTweetsLayer = L.geoJson(hunt_tweets, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng,overdose_MarkerOptions);
    }, onEachFeature: onEachFeature
});

var tweets = L.layerGroup([opiatesTweetsLayer, narcanTweetsLayer, overdoseTweetsLayer]);
*/
var markerClusters = L.markerClusterGroup();


opiatesTweetsLayer = L.geoJson(myTweets, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, opiates_MarkerOptions);
    }, onEachFeature: onEachFeature
});

	
var overlays = {
	"Shady Grove" : shadygrove,
	"Opiates Tweets" : markerClusters.addLayer(opiatesTweetsLayer)
};



var lc = L.control.layers(baseLayers, overlays, {collapsed : false, position : 'topright'});
map.addControl(lc);

 function onEachFeature(feature, layer) {
 if (feature.properties && feature.properties.text) {
 layer.bindPopup('<b>User: </b>' + feature.properties.username + '<br><br>'
		+ '<b>Tweet: </b>' + feature.properties.text + '<br><br>'
		);
 }
 }