import csv
import itertools
with open('./data/hitters_all_data_scores_adp.csv') as csvfile:
    all_hitters = list(csv.DictReader(csvfile))

d = []
for k, g in itertools.groupby(
        all_hitters, 
        key=lambda r: (r['name'], r['season'])):
    d.append({
        'name': k[0],
        'season': k[1],
        'stats': [e['score'] for e in g]
        })