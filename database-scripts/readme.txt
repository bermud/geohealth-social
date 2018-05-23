Place in this folder the scrips (configuration, etc) use for the database setup

//*https://docs.mongodb.com/manual/
//*MongoDB manual/documentation

//*Useful script examples
//*mongoimport <path to collection.json> -c collection
//*used to get json into mongodb

//*var maryland = db.maryland.findOne( { geometry: { $geoIntersects: { $geometry: { type: "Polygon", coordinates: [ (-XX.XXXXXX, XX.XXXXXX), ... ] } } } } )
db.collection.find( { location: { $geoWithin: { $geometry: maryland.geometry } } } ).count()
//*Get tweets in Maryland with count number


------Server Set-up------
What was already there:
Mongo is part of the standard Ubuntu install
Python v3 is part of the standard Ubuntu install

What was needed:
Install pip (the Python package installer):
	$ sudo apt install python3-pip
Install the geopy package for Python:
	$ sudo pip3 install geopy

------MongoDB Set-up/Query------

Ensure MongoDB is running:
	$ service mongodb status (if not running, use service mongodb start)
Modify tweets .json raw data files to eliminate extraneous information, set up for insertion
Remove everything prior to “[“ at the top of each file, and remove the trailing “}” at the end of the file, after the closing “[“

Create the “tweets” database and collections (from command line):
	$ mongoimport --db tweets --collection Baltimore --type json --jsonArray --file Baltimore50Tweets1.json
	…
	$ mongo tweets --eval "db.Baltimore.ensureIndex({ 'text':'text’})”
	…

Query Mongo for desired search terms in a collection:
	$ mongoexport --jsonArray -d tweets -c <collection> -q '{ $text: { $search: "<search terms, space-separated>" } }' | json_pp | sed -z 's/^/\{ \"statuses\": /' - | sed -z 's/$/\}/' - > tweets.json

------Python Processing/Output Preparation------

Invoke Python script on results, producing final .json output for mapping:
	$ python3 togeo_ProjectFinal.py tweets.json output.json

Copy output to Apache root directory (or wherever desired) for display on map:
	$ sudo cp output.json /var/www/html
