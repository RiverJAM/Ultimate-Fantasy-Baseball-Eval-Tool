# this code will utilize flask to pull data from a mongo db for the website
# it also creates the webpages themselves.  several toolkits need to be imported

import dns
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
# mongo = PyMongo(app, uri="mongodb://localhost:27017/Ultimate_Baseball_Project")

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

@app.route("/hittersdropdown")
def hitters_list():
    hitters_dd = mongo.db.dropdown_hitters.find( {},
    {'name': 1})
    names = []
    for name in list(hitters_dd):
        name_list = {}
        name_list["name"] = name.get("name", {})
        names.append(name_list)
    # print(name_list)
    return (jsonify(names))

@app.route("/pitchersdropdown")
def pitchers_list():
    pitchers_dd = mongo.db.dropdown_pitchers.find( {},
    {'name': 1})
    names = []
    for name in list(pitchers_dd):
        name_list = {}
        name_list["name"] = name.get("name", {})
        names.append(name_list)
    # print(name_list)
    return (jsonify(names))

# Flask route to get hitter data
@app.route("/hittersdata")
def hitters_data():
    pyball_hitters_2018 = mongo.db.pybaseball_hitters_2018.find( { },
    {'name': 1, 'o_swingpercen': 1, 'o_contactpercen': 1, 'z_swingpercen': 1, 'z_contactpercen': 1,
    'avg': 1, 'ops': 1, 'r': 1, 'rbi': 1, 'hr': 1, 'sb': 1, 'pa': 1, 'kpercen': 1,
    'bbpercen':1, 'iffbpercen': 1, 'barel_rate': 1, 'maxev': 1, 'hardhitpercen': 1})
    data = []
    for hitter_data in list(pyball_hitters_2018):
        stats = {}
        stats["name_2018"] = hitter_data.get("name", {})
        stats["o_swing_2018"] = round(float(hitter_data.get("o_swingpercen", {})), 3)
        stats["o_contact_2018"] = round(float(hitter_data.get("o_contactpercen", {})), 3)
        stats["z_swing_2018"] = round(float(hitter_data.get("z_swingpercen", {})), 3)
        stats["z_contact_2018"] = round(float(hitter_data.get("z_contactpercen", {})), 3)
        stats["avg_2018"] = round(float(hitter_data.get("avg", {})), 3)
        stats["ops_2018"] = round(float(hitter_data.get("ops", {})),3 )
        stats["r_2018"] = int(hitter_data.get("r", {}))
        stats["rbi_2018"] = int(hitter_data.get("rbi", {}))
        stats["hr_2018"] = int(hitter_data.get("hr", {}))
        stats["sb_2018"] = int(hitter_data.get("sb", {}))
        stats["pa_2018"] = int(hitter_data.get("pa", {}))
        stats["kpercen_2018"] = round(float(hitter_data.get("kpercen", {})), 3)
        stats["bbpercen_2018"] = round(float(hitter_data.get("bbpercen", {})), 3)
        stats["iffbpercen_2018"] = round(float(hitter_data.get("iffbpercen", {})), 3)
        stats["barrel_rate_2018"] = round(float(hitter_data.get("barrelpercen", {})), 3)
        stats["maxev_2018"] = round(float(hitter_data.get("maxev", {})), 3)
        stats["hardhitpercen_2018"] = round(float(hitter_data.get("hardhitpercen", {})), 3)
        data.append(stats)

    pyball_hitters_2019 = mongo.db.pybaseball_hitters_2019.find( { },
    {'name': 1, 'o_swingpercen': 1, 'o_contactpercen': 1, 'z_swingpercen': 1, 'z_contactpercen': 1,
    'avg': 1, 'ops': 1, 'r': 1, 'rbi': 1, 'hr': 1, 'sb': 1, 'pa': 1, 'kpercen': 1,
    'bbpercen':1, 'iffbpercen': 1})
    for hitter_data in list(pyball_hitters_2019):
        stats = {}
        stats["name_2019"] = hitter_data.get("name", {})
        stats["o_swing_2019"] = hitter_data.get("o_swingpercen", {})
        stats["o_contact_2019"] = hitter_data.get("o_contactpercen", {})
        stats["z_swing_2019"] = hitter_data.get("z_swingpercen", {})
        stats["z_contact_2019"] = hitter_data.get("z_contactpercen", {})
        stats["avg_2019"] = hitter_data.get("avg", {})
        stats["ops_2019"] = hitter_data.get("ops", {})
        stats["r_2019"] = hitter_data.get("r", {})
        stats["rbi_2019"] = hitter_data.get("rbi", {})
        stats["hr_2019"] = hitter_data.get("hr", {})
        stats["sb_2019"] = hitter_data.get("sb", {})
        stats["pa_2019"] = hitter_data.get("pa", {})
        stats["kpercen_2019"] = hitter_data.get("kpercen", {})
        stats["bbpercen_2019"] = hitter_data.get("bbpercen", {})
        stats["iffbpercen_2019"] = hitter_data.get("iffbpercen", {})
        stats["barrel_rate_2019"] = round(float(hitter_data.get("barrelpercen", {})), 3)
        stats["maxev_2019"] = round(float(hitter_data.get("maxev", {})), 3)
        stats["hardhitpercen_2019"] = round(float(hitter_data.get("hardhitpercen", {})), 3)
        data.append(stats)
        

    pyball_hitters_2020 = mongo.db.pybaseball_hitters_2020.find( { },
    {'name': 1, 'o_swingpercen': 1, 'o_contactpercen': 1, 'z_swingpercen': 1, 'z_contactpercen': 1,
    'avg': 1, 'ops': 1, 'r': 1, 'rbi': 1, 'hr': 1, 'sb': 1, 'pa': 1, 'kpercen': 1,
    'bbpercen':1, 'iffbpercen': 1})
    for hitter_data in list(pyball_hitters_2020):
        stats = {}
        stats["name_2020"] = hitter_data.get("name", {})
        stats["o_swing_2020"] = hitter_data.get("o_swingpercen", {})
        stats["o_contact_2020"] = hitter_data.get("o_contactpercen", {})
        stats["z_swing_2020"] = hitter_data.get("z_swingpercen", {})
        stats["z_contact_2020"] = hitter_data.get("z_contactpercen", {})
        stats["avg_2020"] = hitter_data.get("avg", {})
        stats["ops_2020"] = hitter_data.get("ops", {})
        stats["r_2020"] = hitter_data.get("r", {})
        stats["rbi_2020"] = hitter_data.get("rbi", {})
        stats["hr_2020"] = hitter_data.get("hr", {})
        stats["sb_2020"] = hitter_data.get("sb", {})
        stats["pa_2020"] = hitter_data.get("pa", {})
        stats["kpercen_2020"] = hitter_data.get("kpercen", {})
        stats["bbpercen_2020"] = hitter_data.get("bbpercen", {})
        stats["iffbpercen_2020"] = hitter_data.get("iffbpercen", {})
        stats["barrel_rate_2020"] = round(float(hitter_data.get("barrelpercen", {})), 3)
        stats["maxev_2020"] = round(float(hitter_data.get("maxev", {})), 3)
        stats["hardhitpercen_2020"] = round(float(hitter_data.get("hardhitpercen", {})), 3)
        data.append(stats)

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
    pyball_pitchers_2018 = mongo.db.pybaseball_pitchers_2018.find( { }, 
    { "name": 1, "w": 1, "l": 1, "so": 1, "era": 1, "whip": 1, "sv": 1, "hld": 1,
    "kpercen": 1, "bbpercen": 1, "xfip": 1, "siera": 1, "babip": 1,
    "wfbperc": 1, "wctperc": 1, "wcbperc": 1, "wslperc": 1, "wchperc": 1,
    "FBpercen 2": 1, "fbv": 1, "slpercen": 1, "slv": 1,
    "ctpercen": 1, "ctv": 1, "cbpercen": 1, "cbv": 1, "chpercen": 1, "chv": 1
} )
    data = []
    for name_dict in list(pyball_pitchers_2018):
        item = {}
        item["name_2018"] = name_dict.get("name", {})
        item["win_2018"] = name_dict.get("w", {})
        item["loss_2018"] = name_dict.get("l", {})
        item["k_2018"] = name_dict.get("so", {})
        item["era_2018"] = name_dict.get("era", {})
        item["whip_2018"] = name_dict.get("whip", {})
        item["save_2018"] = name_dict.get("sv", {})
        item["hold_2018"] = name_dict.get("hld", {})
        item["kper_2018"] = name_dict.get("kpercen", {})
        item["bbper_2018"] = name_dict.get("bbpercen", {})
        item["xFIP_2018"] = name_dict.get("xfip", {})
        item["siera_2018"] = name_dict.get("siera", {})
        item["babip_2018"] = name_dict.get("babip", {})
        item["wfb_c_2018"] = name_dict.get("wfbperc", {})
        item["wct_c_2018"] = name_dict.get("wctperc", {})
        item["wcb_c_2018"] = name_dict.get("wcbperc", {})
        item["wsl_c_2018"] = name_dict.get("wslperc", {})
        item["wch_c_2018"] = name_dict.get("wchperc", {})
        item["fb_percen_2018"] = name_dict.get("FBpercen 2", {})
        item["fb_velo_2018"] = name_dict.get("fbv", {})
        item["sl_percen_2018"] = name_dict.get("slpercen", {})
        item["sl_velo_2018"] = name_dict.get("slv", {})
        item["ct_percen_2018"] = name_dict.get("ctpercen", {})
        item["ct_velo_2018"] = name_dict.get("ctv", {})
        item["cb_percen_2018"] = name_dict.get("cbpercen", {})
        item["cb_velo_2018"] = name_dict.get("cbv", {})
        item["ch_percen_2018"] = name_dict.get("chpercen", {})
        item["ch_velo_2018"] = name_dict.get("chv", {})
        data.append(item)
        # print(item)


        pyball_pitchers_2019 = mongo.db.pybaseball_pitchers_2019.find( { }, 
    { "name": 1, "w": 1, "l": 1, "so": 1, "era": 1, "whip": 1, "sv": 1, "hld": 1,
    "kpercen": 1, "bbpercen": 1, "xfip": 1, "siera": 1, "babip": 1,
    "wfbperc": 1, "wctperc": 1, "wcbperc": 1, "wslperc": 1, "wchperc": 1,
    "FBpercen 2": 1, "fbv": 1, "slpercen": 1, "slv": 1,
    "ctpercen": 1, "ctv": 1, "cbpercen": 1, "cbv": 1, "chpercen": 1, "chv": 1
} )

    for name_dict in list(pyball_pitchers_2019):
        item = {}
        item["name_2019"] = name_dict.get("name", {})
        item["win_2019"] = name_dict.get("w", {})
        item["loss_2019"] = name_dict.get("l", {})
        item["k_2019"] = name_dict.get("so", {})
        item["era_2019"] = name_dict.get("era", {})
        item["whip_2019"] = name_dict.get("whip", {})
        item["save_2019"] = name_dict.get("sv", {})
        item["hold_2019"] = name_dict.get("hld", {})
        item["kper_2019"] = name_dict.get("kpercen", {})
        item["bbper_2019"] = name_dict.get("bbpercen", {})
        item["xFIP_2019"] = name_dict.get("xfip", {})
        item["siera_2019"] = name_dict.get("siera", {})
        item["babip_2019"] = name_dict.get("babip", {})
        item["wfb_c_2019"] = name_dict.get("wfbperc", {})
        item["wct_c_2019"] = name_dict.get("wctperc", {})
        item["wcb_c_2019"] = name_dict.get("wcbperc", {})
        item["wsl_c_2019"] = name_dict.get("wslperc", {})
        item["wch_c_2019"] = name_dict.get("wchperc", {})
        item["fb_percen_2019"] = name_dict.get("FBpercen 2", {})
        item["fb_velo_2019"] = name_dict.get("fbv", {})
        item["sl_percen_2019"] = name_dict.get("slpercen", {})
        item["sl_velo_2019"] = name_dict.get("slv", {})
        item["ct_percen_2019"] = name_dict.get("ctpercen", {})
        item["ct_velo_2019"] = name_dict.get("ctv", {})
        item["cb_percen_2019"] = name_dict.get("cbpercen", {})
        item["cb_velo_2019"] = name_dict.get("cbv", {})
        item["ch_percen_2019"] = name_dict.get("chpercen", {})
        item["ch_velo_2019"] = name_dict.get("chv", {})
        data.append(item)
        # print(item)

        
    pyball_pitchers_2020 = mongo.db.pybaseball_pitchers_2020.find( { }, 
        { "name": 1, "w": 1, "l": 1, "so": 1, "era": 1, "whip": 1, "sv": 1, "hld": 1,
        "kpercen": 1, "bbpercen": 1, "xfip": 1, "siera": 1, "babip": 1,
        "wfbperc": 1, "wctperc": 1, "wcbperc": 1, "wslperc": 1, "wchperc": 1,
        "FBpercen 2": 1, "fbv": 1, "slpercen": 1, "slv": 1,
        "ctpercen": 1, "ctv": 1, "cbpercen": 1, "cbv": 1, "chpercen": 1, "chv": 1
    } )


    for name_dict in list(pyball_pitchers_2020):
        item = {}
        item["name_2020"] = name_dict.get("name", {})
        item["win_2020"] = name_dict.get("w", {})
        item["loss_2020"] = name_dict.get("l", {})
        item["k_2020"] = name_dict.get("so", {})
        item["era_2020"] = name_dict.get("era", {})
        item["whip_2020"] = name_dict.get("whip", {})
        item["save_2020"] = name_dict.get("sv", {})
        item["hold_2020"] = name_dict.get("hld", {})
        item["kper_2020"] = name_dict.get("kpercen", {})
        item["bbper_2020"] = name_dict.get("bbpercen", {})
        item["xFIP_2020"] = name_dict.get("xfip", {})
        item["siera_2020"] = name_dict.get("siera", {})
        item["babip_2020"] = name_dict.get("babip", {})
        item["wfb_c_2020"] = name_dict.get("wfbperc", {})
        item["wct_c_2020"] = name_dict.get("wctperc", {})
        item["wcb_c_2020"] = name_dict.get("wcbperc", {})
        item["wsl_c_2020"] = name_dict.get("wslperc", {})
        item["wch_c_2020"] = name_dict.get("wchperc", {})
        item["fb_percen_2020"] = name_dict.get("FBpercen 2", {})
        item["fb_velo_2020"] = name_dict.get("fbv", {})
        item["sl_percen_2020"] = name_dict.get("slpercen", {})
        item["sl_velo_2020"] = name_dict.get("slv", {})
        item["ct_percen_2020"] = name_dict.get("ctpercen", {})
        item["ct_velo_2020"] = name_dict.get("ctv", {})
        item["cb_percen_2020"] = name_dict.get("cbpercen", {})
        item["cb_velo_2020"] = name_dict.get("cbv", {})
        item["ch_percen_2020"] = name_dict.get("chpercen", {})
        item["ch_velo_2020"] = name_dict.get("chv", {})
        data.append(item)

    # Fan_G_pitchers = mongo.db.Fangraphs_pitchers.find( { }, 
    # { "Name": 1, "W": 1, "L": 1, "SO": 1, "ERA": 1, "WHIP": 1, "SV": 1, "HLD": 1,
    # "K%": 1, "BB%": 1, "xFIP": 1, "Siera": 1, 
    # "wFB/C": 1, "wCT/C": 1, "wCB/C": 1, "wSL/C": 1, "wCH/C": 1} )
    # data = []
    # for name_dict in list(Fan_G_pitchers):
    #     item = {}
    #     item["name"] = name_dict.get("Name", {})
    #     item["win"] = name_dict.get("W", {})
    #     item["loss"] = name_dict.get("L", {})
    #     item["k"] = name_dict.get("SO", {})
    #     item["era"] = name_dict.get("ERA", {})
    #     item["whip"] = name_dict.get("WHIP", {})
    #     item["save"] = name_dict.get("SV", {})
    #     item["hold"] = name_dict.get("HLD", {})
    #     item["kper"] = name_dict.get("K%", {})
    #     item["bbper"] = name_dict.get("BB%", {})
    #     item["xFIP"] = name_dict.get("xFIP", {})
    #     item["siera"] = name_dict.get("Siera", {})
    #     item["wfb_c"] = name_dict.get("wFB/C", {})
    #     item["wct_c"] = name_dict.get("wCT/C", {})
    #     item["wcb_c"] = name_dict.get("wCB/C", {})
    #     item["wsl_c"] = name_dict.get("wSL/C", {})
    #     item["wch_c"] = name_dict.get("wCH/C", {})
    #     data.append(item)
    return (jsonify(data))

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5050))
    app.run(debug=True, host="0.0.0.0", port=port)

