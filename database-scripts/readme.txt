Place in this folder the scrips (configuration, etc) use for the database setup

//*https://docs.mongodb.com/manual/
//*MongoDB manual/documentation

//*Useful script examples
//*mongoimport <path to collection.json> -c collection
//*used to get json into mongodb

//*var maryland = db.maryland.findOne( { geometry: { $geoIntersects: { $geometry: { type: "Polygon", coordinates: [ (-XX.XXXXXX, XX.XXXXXX), ... ] } } } } )
db.collection.find( { location: { $geoWithin: { $geometry: maryland.geometry } } } ).count()
//*Get tweets in Maryland with count number
