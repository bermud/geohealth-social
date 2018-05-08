import twitter
import json
import ConfigParser

## this code uses this API https://pypi.python.org/pypi/twitter
## install, e.g doing pip install twitter

# This code expects an external file_with_tokens that contains tokens values. It should be formatted like this:

#[twitter]
#CONSUMER_KEY=zlkcBxHMY0RIGRbTcNzz2****
#CONSUMER_SECRET=YTcpnJdGKGuv9dfXCMGZTrL56t17Yj7tlboVuBmVkk1O****
#TOKEN=704834572052115456-XOXFvD2zEOlWrfcEqDkfBVaCrAeg****
#TOKEN_SECRET=G7BiAVngbXGfgBoHJbvEa96pLTewNofH51ZLZe****
   
   
file_with_tokens='tokenstwitter.properties'   

config=ConfigParser.RawConfigParser()
config.read(file_with_tokens)

CONSUMER_KEY=config.get('twitter','CONSUMER_KEY') 
CONSUMER_SECRET=config.get('twitter','CONSUMER_SECRET') 
TOKEN=config.get('twitter','TOKEN') 
TOKEN_SECRET=config.get('twitter','TOKEN_SECRET') 
   

auth=twitter.oauth.OAuth(TOKEN,TOKEN_SECRET,CONSUMER_KEY, CONSUMER_SECRET)
t = twitter.Twitter(auth=auth)

## search all tweets with keywords
word = "opioid, opiod crisis, narcan, overdose"
t2 = t.search.tweets(q=near%3A"maryland"%20within%3A15mi&src=typd)
print ("print 100 last tweets containing the text "+ word)
print (json.dumps(t2, indent=4, sort_keys=True))


f=open(tweets_filename,'w')
f.write(tweets_in_json)
f.close()

print ("File "+tweets_filename+" was successfully create with the latest opioid tweets")




