# Overview

The Twitter layer contains tweets related to opioid use and recovery. Using the Python Twitter Tools API (https://pypi.org/project/twitter/), tweets around opioid use were collected and stored in JSON files. (Note: This API appears to return only the first 15 results of a search. To scale up this project, it may be necessary to adopt a method like: https://github.com/janezkranjc/twitter-tap)

The Twitter API requires that the user have a twitter account and verified token. The tokens were stored in a Text file that was referred to in the python script. The https://github.com/bermud/geohealth-social/blob/master/analytics/projectTest.py in the analytics folder contains the reference. 

## First Set of Tweets
We developed several sets of keywords for search queries. The https://github.com/bermud/geohealth-social/blob/master/analytics/projectTest.py in the analytics folder is the script used to extract these tweets.

### Opioid use and behavior
* need OR want OR needing OR wanting
* too many OR two OR three OR double OR too much OR overdose OR crash OR strong enough OR max 
* pop OR popping OR not enough OR another OR popped 
* buy OR sell OR trade OR share OR spend OR bring OR steal

### Street names of opioids
* Oxys OR OxyCotton OR oxy OR roxies OR roxys OR oxycotin OR lortab OR tabbers OR Hydros OR Perc OR Percs OR Ercs OR Greenies OR dillies OR painkiller OR painkillers OR pain killer OR pain killers OR pain pills OR pain pill OR smack OR dope OR skag

Because the Python Twitter Tools API appears to have a character limit for queries, the street names list was broken into two sections when running queries.  Each set of 'behavior' keywords was run with the list of street names like so:
* (need OR want OR needing OR wanting) AND (Oxys OR OxyCotton OR oxy OR roxies OR roxys OR oxycotin OR lortab OR tabbers OR Hydros OR Perc OR Percs OR Ercs)
* (need OR want OR needing OR wanting) AND (Greenies OR dillies OR painkiller OR painkillers OR pain killer OR pain killers OR pills OR smack OR skag)

These keywords were combined with a geographic limiter to limit our search to Maryland.  Twitter's geocode limiter takes a lat/long center point and a radius.
* Baltimore: 39.283333,-76.616667,50km
* Western MD: 39.4689151,-77.4500538,26km
* Southern MD: 38.708889,-76.335,50km
* Southeast MD: 38.1756072,-75.5437228,45km
* Panhandle: 39.660027,-78.7818776,60km

## Second Set of Tweets
Additional keywords were generated, and searched using the same geographic limits.
### For tweets using the pharmaceutical names
* need OR want OR max OR too many OR pop OR popping OR not enough OR another OR buy OR sell OR trade OR share OR spend OR bring OR steal OR popped
* opiod OR opioids OR narcan OR opiates OR suboxone OR methadone OR hydromorphone OR dilaudid OR overdose
### For tweets around rehabilitation and recovery
* overdoes OR opioidcrisis OR recovery OR formeraddict OR relapse OR safeinjectionsites OR dependency

# Geocoding
We transformed the output using a Python script called https://github.com/bermud/geohealth-social/blob/master/analytics/togeo_ProjectFinal.py .  The script kept only the tweet properties we were interested in and geocoded each Tweet, using the GeoPy library where necessary (https://geopy.readthedocs.io/en/stable/). In order to display the Tweets as points on a map, we need each to have a set of lat/long coordinates.  We created a series of if...else statements to account for the various ways Twitter describes location.

If a tweet had precise coordinates already, those were kept. If a tweet has a city-level location, the script finds the lat/long center point of the city's bounding box and then randomly adds or subtracts a fraction.  This randomization serves to prevent multiple tweets being stacked on top of each other in the map. If a tweet has no city identified, the script uses the user's self identified profile location along with geopy's geocoding function to generate coordinates. Finally, if there is no available location data, a random lat/long point in Maryland will be generated.
