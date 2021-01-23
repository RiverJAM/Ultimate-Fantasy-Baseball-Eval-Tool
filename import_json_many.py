# import necessary libraries.  glob will take all of the files in a folder 
# and create a list of all of their pathnames
import glob
import json
from pymongo import MongoClient

# open the client; path of all of the files w a .json extension
client = MongoClient('localhost',27017)
path = "C:/Users/josephmonahan/Desktop/Baseball_Data/Sportrac_Json/*.json"

#create the list of the pathnames
files = glob.glob(path)

# db name and collection name
db = client['MLB_First_Go']
player_data = db['Sportrac']

# loop through the list of the pathnames and append to the db
for file in files:
    with open(file) as f:
        file_data = json.load(f)
    player_data.insert_one(file_data)

client.close()
