import json
from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client['Ultimate_Baseball_Project']
player_data = db['Project2']

with open("C:/Users/cro11/NU_Bootcamp_Cert/Homework/Project2_JSon_files/TopTen00d70364-1c07-464f-bd34-f571f7d7ae10.json") as f:
    file_data = json.load(f)

player_data.insert_one(file_data)

client.close()