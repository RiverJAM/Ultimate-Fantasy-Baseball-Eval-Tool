# this code will utilize flask to pull data from a mongo db for the website
# it also creates the webpages themselves.  several toolkits need to be imported

import sqlalchemy
from sqlalchemy.ext.automap import automap_base

from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo

import json
from bson.objectid import ObjectId
from bson import json_util
from bson import ObjectId

from flask_cors import CORS, cross_origin


#################################################
# Database Setup
#################################################

# Flask Setup

app = Flask(__name__,static_url_path="/static",static_folder="static")
CORS(app)

#Use PyMongo
mongo = PyMongo(app, uri="mongodb://localhost:27017/Ultimate_Baseball_Project")

# Flask Routes
# pitchers url
@app.route("/pitchers")
def pitching():
    return render_template('pitchersdata.html')

# hitters url: main page
@app.route("/")
def welcome():
    return render_template('index.html')
   
# Flask route to get hitter data
@app.route("/hittersdata")
def hello():
    Fan_G_hitters = mongo.db.Fangraphs_hitters.find()
    Names = [ (name_dict.get('Name' ,{}),
    name_dict.get('O-Swing%', {}),
    name_dict.get('O-Contact%', {}),
    name_dict.get('Z-Swing%', {}),
    name_dict.get('Z-Contact%', {}),
    name_dict.get('AVG', {}),
    name_dict.get('OPS', {}),
    name_dict.get('R', {}),
    name_dict.get('RBI', {}),
    name_dict.get('HR', {}),
    name_dict.get('SB', {}),) for name_dict in list(Fan_G_hitters)]
    return (jsonify(Names))

# pitchers data
@app.route("/pitchersdata")
def hello_pitchers():
    Fan_G_pitchers = mongo.db.Fangraphs_pitchers.find()
    pitchers = [ (name_dict.get('Name' ,{}),
    name_dict.get('wFB/C', {}),
    name_dict.get('vFC', {}),
    name_dict.get('wCT/C', {}),
    name_dict.get('wCB/C', {}),
    name_dict.get('wSL/C', {}),
    name_dict.get('wCH/C', {}),
    name_dict.get('W', {}),
    name_dict.get('L', {}),
    name_dict.get('SO', {}),
    name_dict.get('ERA', {}),
    name_dict.get('WHIP', {}),
    name_dict.get('SV', {}),
    name_dict.get('HLD', {}),) for name_dict in list(Fan_G_pitchers)]
    return (jsonify(pitchers))

@app.route("/pitchersDataDictionary")
def pitchersDictionary():
    Fan_G_pitchers = mongo.db.Fangraphs_pitchers.find( { }, 
    { "Name": 1, "W": 1, "L": 1, "SO": 1, "ERA": 1, "WHIP": 1, "SV": 1, "HLD": 1,
    "K%": 1, "BB%": 1, "xFIP": 1, "Siera": 1, 
    "wFB/C": 1, "wCT/C": 1, "wCB/C": 1, "wSL/C": 1, "wCH/C": 1} )
    data = []
    for name_dict in list(Fan_G_pitchers):
        item = {}
        item["name"] = name_dict.get("Name", {})
        item["win"] = name_dict.get("W", {})
        item["loss"] = name_dict.get("L", {})
        item["k"] = name_dict.get("SO", {})
        item["era"] = name_dict.get("ERA", {})
        item["whip"] = name_dict.get("WHIP", {})
        item["save"] = name_dict.get("SV", {})
        item["hold"] = name_dict.get("HLD", {})
        item["k%"] = name_dict.get("K%", {})
        item["bb%"] = name_dict.get("BB%", {})
        item["xFIP"] = name_dict.get("xFIP", {})
        item["siera"] = name_dict.get("Siera", {})
        item["wfb_c"] = name_dict.get("wFB/C", {})
        item["wct_c"] = name_dict.get("wCT/C", {})
        item["wcb_c"] = name_dict.get("wCB/C", {})
        item["wsl_c"] = name_dict.get("wSL/C", {})
        item["wch_c"] = name_dict.get("wCH/C", {})
        data.append(item)
    return (jsonify(data))

if __name__ == "__main__":
    app.run(debug=True)