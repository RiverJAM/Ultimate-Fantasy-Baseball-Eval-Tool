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
mongo = PyMongo(app, uri = "mongodb+srv://somethingsimple:something@cluster0.bq9eu.mongodb.net/Ultimate_Baseball_Project?retryWrites=true&w=majority"

# Flask Routes


# hitters url: main page
@app.route("/")
def welcome():
    return render_template('index.html')

# pitchers url
@app.route("/pitchers")
def pitching():
    return render_template('pitchersdata.html')
   
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

if __name__ == "__main__":
    app.run(debug=True)