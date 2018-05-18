from sys import argv
from os.path import exists
from operator import add, sub
from geopy import geocoders
from geopy.geocoders import Nominatim
import sys
import math

script, in_file, out_file = argv
# Import the necessary package to process data in JSON format
try:
    import json
    import random
except ImportError:
    import simplejson as json

parsed_json = json.load(open(in_file))
output = open(out_file, 'w', encoding='utf-8')
opener = "{'type': 'FeatureCollection',    'features': ["
print(opener, file=output)
beginF = '{"type": "Feature","properties" : {'
endF = '}}'
endAll = ']}'
beginGeo = '}"geometry" : {'

tweets = parsed_json["statuses"]
for d in tweets:
    print(beginF, file=output)
    print('"id": {}'.format(d["id"]),file=output)
    print('"date": "{}",'.format(d["created_at"]),file=output)
    print('"text":"{}"'.format(d["text"]),file=output)
    print(beginGeo, file=output)
    if d["coordinates"]:
        print('"type": "Point", "coordinates": {}'.format(d["coordinates"]), file=output)
    elif d["place"]:
        ax = d["place"]["bounding_box"]["coordinates"][0][0][0]
        bx = d["place"]["bounding_box"]["coordinates"][0][1][0]
        ay = d["place"]["bounding_box"]["coordinates"][0][0][1]
        dy = d["place"]["bounding_box"]["coordinates"][0][3][1]
        spread = round(random.uniform(.001,.099), 3)
        ops = (add, sub)
        op = random.choice(ops)
        newx = (bx - ax)/2 + ax 
        xans = op(newx,spread) 
        op2 = random.choice(ops)
        newy = (dy - ay)/2 + ay
        yans = op2(newy,spread)
        print('"type": "Point", "coordinates": [{},{}]'.format(xans,yans), file=output)
    elif "MD" in d["user"]["location"]:
        cityname = d["user"]["location"]
        geolocator = Nominatim()
        gn = geocoders.GeoNames(username='ges771')
        tweetcity = geolocator.geocode(cityname)
        spread2 = round(random.uniform(.001,.099), 3)
        ops = (add, sub)
        op = random.choice(ops)
        twlat = op(tweetcity.latitude,spread2)
        op2 = random.choice(ops)
        twlong = op2(tweetcity.longitude,spread2)
        print('"type": "Point", "coordinates": [{},{}]'.format(twlong,twlat), file=output)
#Twitter uses a combination of device/gps coordinates, user provided profile location, and network/ip address location to determine tweets that fit within the geocode search parameter.  So we will have some tweets with no useful location data.  What then? I've made a random point in our original radius.
    else:
        radius = 26000
        radiusInDegrees=radius/111300            
        r = radiusInDegrees
        x0 = 39.4689151
        y0 = -77.4500538
        u = float(random.uniform(0.0,1.0))
        v = float(random.uniform(0.0,1.0))
        w = r * math.sqrt(u)
        t = 2 * math.pi * v
        x = w * math.cos(t) 
        y = w * math.sin(t)
        xLat  = x + x0
        yLong = y + y0
        print('"type": "Point", "coordinates": [{},{}]'.format(yLong,xLat), file=output)
    print(endF, file=output)
    print(endAll, file=output)

