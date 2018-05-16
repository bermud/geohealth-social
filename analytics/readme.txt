Nephtali - I ran my searches using a python script (not the same as Xiu's, I hadn't seen hers yet).  
I've uploaded the resulting JSON files here in case we want to use them for practice with the geocoding.

I used these coordinates/radii as regions: 
Baltimore:39.283333,-76.616667,50km
Western MD:39.4689151,-77.4500538,26km
Southern MD:38.708889,-76.335,50km
Southeast MD:38.1756072,-75.5437228,45km
Panhandle:39.660027,-78.7818776,60km

Xiu Xiu - 
I ran 8 searches per location.  You won't have to do as many for Nephtali's keyword.  So these are the ones you can run for each of the locations above: 
	(need OR want OR needing OR wanting) AND (opioids OR narcan OR overdose OR opioidcrisis OR recovery OR formeraddict)
	(too many OR two OR three OR double OR too much OR overdose OR crash OR strong enough OR max OR too many) AND (opioids OR narcan OR overdose OR opioidcrisis OR recovery OR formeraddict)
	(enough OR pop OR popping OR not enough OR another OR popped) AND (opioids OR narcan OR overdose OR opioidcrisis OR recovery OR formeraddict)
	(buy OR sell OR trade OR share OR spend OR bring OR steal) AND (opioids OR narcan OR overdose OR opioidcrisis OR recovery OR formeraddict)


At this point, all the JSON files have been entered. The initial files uploaded by Sara use the following query and are around street names for the drug:
Alt search strings: (need OR want OR needing OR wanting)
(too many OR two OR three OR double OR too much OR overdose OR crash OR strong enough OR max OR too many)
(enough OR pop OR popping OR not enough OR another OR popped)
(buy OR sell OR trade OR share OR spend OR bring OR steal)

Slang terms: (Oxys OR OxyCotton OR oxy OR roxies OR roxys OR oxycotin OR lortab OR tabbers OR Hydros OR Perc OR Percs OR Ercs OR Greenies OR dillies OR painkiller OR painkillers OR pain killer OR pain killers OR pain pills OR pain pill OR smack OR dope OR skag)

My uploaded JSON files contain the word MedicalTerms and cover the medical term for the drugs. Uses this query (which i had to break up in parts so it would work):

(need OR want OR max OR too many OR pop OR popping OR not enough OR another OR buy OR sell OR trade OR share OR spend OR bring OR steal OR popped) AND (opiod OR opioids OR narcan OR opiates OR suboxone OR methadone OR hydromorphone OR dilaudid OR overdose)

And the final set of JSON files which contain Xiu in the name are from Xiu xiu and cover the recovering type tweets. So use these terms:
overdoes OR opioidcrisis OR recovery OR formeraddict OR relapse OR safeinjectionsites OR dependency
