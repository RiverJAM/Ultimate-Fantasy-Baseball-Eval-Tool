import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

import datetime as dt

from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
# import scrape_mars

from flask import Flask, jsonify

#################################################
# Database Setup
#################################################

# engine = create_engine("Resources\all_stats_hitters_2019.csv")

# # reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# Base.prepare(engine, reflect=True)

# #Save reference to the table

# hitter_names = Base.classes.full_name

# Flask Setup

app = Flask(__name__)

#Use PyMongo
mongo = PyMongo(app, uri="mongodb://localhost:27017/Ultimate_Baseball_Project")

# Flask Routes

@app.route("/")
def welcome():

    #From Flask-Pymongo documentation

    hitter_names = mongo.db.Project2.find({}, {"player.full_name": 1})
    print([ (name_dict.get('player',{})).get('full_name',"N/A")  for name_dict in list(hitter_names) ])

    """List all available api routes."""

    return render_template("index.html", welcome=[ (name_dict.get('player',{})).get('full_name',"N/A")  for name_dict in list(hitter_names) ])

#     """List all available api routes."""
#     return (
#         f"Welcome to the Ultimate Fantasy Baseball Eval Tool!"
#         f"Available Routes:<br/>"
#         f"/api/v1.0/hitters<br/>"
#         f"/api/v1.0/pitchers<br/>"
#     )

# #Hitters path

# @app.route("/api/v1.0/hitters<br/>")
# def httr():
#     #Create session link from Python to DB
#     session = Session(engine)
#     hitters_group = session.query()

#     return jsonify(hitters_group)
# #Pitchers Path

# @app.route("/api/v1.0/pitchers<br/>")
# def ptchr():


if __name__ == "__main__":
    app.run(debug=True)