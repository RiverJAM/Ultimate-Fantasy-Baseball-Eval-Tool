SELECT B.name, A.score, C.avg, B.* FROM ft_pitcher_scores_2012_2020 as A
INNER JOIN fg_pitcher_data_2012_2020 as B
ON A.player=B.name AND A.season=B.season
INNER JOIN fantasy_pros_adp as C
ON A.player=C.player AND A.season=C.season
