# this code will utilize flask to pull data from a mongo db for the website
# it also creates the webpages themselves.  several toolkits need to be imported

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
import os
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
app.config["MONGO_URI"] = "mongodb+srv://somethingsimple:something@cluster0.bq9eu.mongodb.net/Ultimate_Baseball_Project?retryWrites=true&w=majority"

CORS(app)

#Use PyMongo
mongo = PyMongo(app, uri = "mongodb+srv://somethingsimple:something@cluster0.bq9eu.mongodb.net/Ultimate_Baseball_Project?retryWrites=true&w=majority")

# Flask Routes


# hitters url: main page
@app.route("/")
def welcome():
    return render_template('index.html')

#useless comment as a placeholder
# pitchers url
@app.route("/pitchers")
def pitching():
    return render_template('pitchers.html')
   
# Flask route to get hitter data
@app.route("/hittersdata")
def hello():
    Fan_G_hitters = mongo.db.Fangraphs_hitters.find( { }, 
    {"Name": 1, 'O-Swing%': 1, 'O-Contact%': 1, 'Z-Swing%': 1, 'Z-Contact%':1,
    'AVG': 1, 'OPS': 1, 'R': 1, 'RBI': 1, 'HR': 1, 'SB': 1})
    data = []
    for hitter_data in list(Fan_G_hitters):
        stats = {}
        stats["name"] = hitter_data.get("Name", {})
        stats["o_swing"] = hitter_data.get("O-Swing%", {})
        stats["o_contact"] = hitter_data.get("O-Contact%", {})
        stats["z_swing"] = hitter_data.get("Z-Swing%", {})
        stats["z_contact"] = hitter_data.get("Z-Contact%", {})
        stats["avg"] = hitter_data.get("AVG", {})
        stats["ops"] = hitter_data.get("OPS", {})
        stats["r"] = hitter_data.get("R", {})
        stats["rbi"] = hitter_data.get("RBI", {})
        stats["hr"] = hitter_data.get("HR", {})
        stats["sb"] = hitter_data.get("SB", {})
        data.append(stats)

        # name_dict.get('O-Swing%', {}),
        # name_dict.get('O-Contact%', {}),
        # name_dict.get('Z-Swing%', {}),
        # name_dict.get('Z-Contact%', {}),
        # name_dict.get('AVG', {}),
        # name_dict.get('OPS', {}),
        # name_dict.get('R', {}),
        # name_dict.get('RBI', {}),
        # name_dict.get('HR', {}),
        # name_dict.get('SB', {}),) for name_dict in list(Fan_G_hitters)]
    return (jsonify(data))

# pitchers data
# @app.route("/pitchersdataList")
# def hello_pitchers():
#     Fan_G_pitchers = mongo.db.Fangraphs_pitchers.find()
#     pitchers = [ (name_dict.get('Name' ,{}),
#     name_dict.get('wFB/C', {}),
#     name_dict.get('vFC', {}),
#     name_dict.get('wCT/C', {}),
#     name_dict.get('wCB/C', {}),
#     name_dict.get('wSL/C', {}),
#     name_dict.get('wCH/C', {}),
#     name_dict.get('W', {}),
#     name_dict.get('L', {}),
#     name_dict.get('SO', {}),
#     name_dict.get('ERA', {}),
#     name_dict.get('WHIP', {}),
#     name_dict.get('SV', {}),
#     name_dict.get('HLD', {}),) for name_dict in list(Fan_G_pitchers)]
#     return (jsonify(pitchers))

@app.route("/pitchersData")
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
        item["kper"] = name_dict.get("K%", {})
        item["bbper"] = name_dict.get("BB%", {})
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
    port = int(os.environ.get("PORT", 5050))
    app.run(debug=True, host="0.0.0.0", port=port)