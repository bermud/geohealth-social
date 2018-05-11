import twitter
import sys
import csv

import ConfigParser

latitude = 39.299236	# geographical centre of Baltimore search
longitude = -76.609383	# geographical centre of Blatimore search
max_range = 60 		# search range in kilometres
num_results = 500		# maximum results to obtain
outfile = "output_twitter.csv"

#-----------------------------------------------------------------------
# load our API credentials 
#-----------------------------------------------------------------------
config = {}


#-----------------------------------------------------------------------
# create twitter API object
#-----------------------------------------------------------------------
   
file_with_tokens='mytokenstwitter.properties'   

config=ConfigParser.RawConfigParser()
config.read(file_with_tokens)

CONSUMER_KEY=config.get('twitter','CONSUMER_KEY') 
CONSUMER_SECRET=config.get('twitter','CONSUMER_SECRET') 
TOKEN=config.get('twitter','TOKEN') 
TOKEN_SECRET=config.get('twitter','TOKEN_SECRET') 

auth=twitter.oauth.OAuth(TOKEN,TOKEN_SECRET,CONSUMER_KEY, CONSUMER_SECRET)
t = twitter.Twitter(auth=auth)
#-----------------------------------------------------------------------
# open a file to write (mode "w"), and create a CSV writer object
#-----------------------------------------------------------------------
csvfile = file(outfile, "w")
csvwriter = csv.writer(csvfile)

#-----------------------------------------------------------------------
# add headings to our CSV file
#-----------------------------------------------------------------------
row = [ "user", "text", "latitude", "longitude" ]
csvwriter.writerow(row)

#-----------------------------------------------------------------------
# the twitter API only allows us to query up to 100 tweets at a time.
# to search for more, we will break our search up into 10 "pages", each
# of which will include 100 matching tweets.
#-----------------------------------------------------------------------
result_count = 0
last_id = None
while result_count <  num_results:
	#-----------------------------------------------------------------------
	# perform a search based on latitude and longitude
	# twitter API docs: https://dev.twitter.com/rest/reference/get/search/tweets
	#-----------------------------------------------------------------------
	query = t.search.tweets(q = "", geocode = "%f,%f,%dkm" % (latitude, longitude, max_range), count = 500, max_id = last_id)

	for result in query["statuses"]:
		#-----------------------------------------------------------------------
		# only process a result if it has a geolocation
		#-----------------------------------------------------------------------
		if result["geo"]:
			user = result["user"]["screen_name"]
			text = result["text"]
			text = text.encode('ascii', 'replace')
			latitude = result["geo"]["coordinates"][0]
			longitude = result["geo"]["coordinates"][1]

			#-----------------------------------------------------------------------
			# now write this row to our CSV file
			#-----------------------------------------------------------------------
			row = [ user, text, latitude, longitude ]
			csvwriter.writerow(row)
			result_count += 1
		last_id = result["id"]

	#-----------------------------------------------------------------------
	# let the user know where we're up to
	#-----------------------------------------------------------------------
	print "got %d results" % result_count

#-----------------------------------------------------------------------
# we're all finished, clean up and go home.
#-----------------------------------------------------------------------
csvfile.close()

print "written to %s" % outfile
