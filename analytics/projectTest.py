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

tweets_filename='Panhandle60Tweets8.json'
relevant_tweets = t.search.tweets(q='(buy OR sell OR trade OR share OR spend OR bring OR steal) AND (Greenies OR dillies OR painkiller OR painkillers OR pain OR killers OR pills OR smack OR skag)&geocode:39.660027,-78.7818776,60km')
tweets_in_json= json.dumps(relevant_tweets, indent=4, sort_keys=True)

f=open(tweets_filename,'w')
f.write(tweets_in_json)
f.close()

print ("File "+tweets_filename+" was successfully create with the latest tweets")



