#!/usr/bin/env python
# coding: utf-8
# This code imports statcast data from our mongodb.  It creates 2 functions which pull season data
# then creates a second function to get to the barreled ball data itslef
# In[1]:



from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
# import scrape_mars
import json
from bson.objectid import ObjectId
from bson import json_util
from bson import ObjectId


# In[2]:


app = Flask(__name__,static_url_path="/static",static_folder="static")
mongo = PyMongo(app, uri="mongodb://localhost:27017/Ultimate_Baseball_Project")


# In[3]:


hitter_data = mongo.db.Project2.find()


# In[4]:


hitter_data_list = list(hitter_data)


# In[97]:


def getSeasonByYear(player,year,seasonType ='REG'):
    seasons = player.get('seasons', [])
    for season in seasons:
        if(season.get('year',0) == year and season.get('type','N/A') == seasonType):
            return season;
    return {}


# In[98]:


def getBarreledBall(season):
    totals = season.get('totals', {})
    statcast_metrics = totals.get('statcast_metrics', {})
    hitting = statcast_metrics.get('hitting', {})
    overall = hitting.get('overall', {})
    for item in overall:
        if 'barreled_ball' in item.keys():
            return item.get('barreled_ball', {}).get('count', 0)
    return 0


# In[99]:


season_year = 2019


# In[100]:


data = []


# In[101]:


for player_dict in hitter_data_list:
    player =  player_dict.get("player",{})
    item = {}
    item["name"] = player.get("full_name","N/A")
    print(item)
    season = getSeasonByYear(player, season_year)
  
    item["barreledBall"] = getBarreledBall(season)
    data.append(item)


# In[102]:


data


# In[103]:


season = getSeasonByYear(hitter_data_list[1], season_year)


# In[24]:


getBarreledBall(season)


# In[ ]:





# In[14]:


getSeasonByYear(hitter_data_list[1],2019,seasonType ='REG')


# In[ ]:




