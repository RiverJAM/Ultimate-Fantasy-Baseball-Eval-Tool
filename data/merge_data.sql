ALTER TABLE fg_hitter_data_2012_2020 ALTER COLUMN season TYPE integer USING season::integer;
ALTER TABLE fg_pitcher_data_2012_2020 ALTER COLUMN season TYPE integer USING season::integer;
ALTER TABLE ft_scores2012_2020_corrected ALTER COLUMN season TYPE integer USING season::integer;
ALTER TABLE fantasy_pros_adp ALTER COLUMN season TYPE integer USING season::integer;
ALTER TABLE ft_scores2012_2020_corrected ALTER COLUMN score TYPE real USING score::real;
ALTER TABLE fantasy_pros_adp ALTER COLUMN avg TYPE real USING avg::real;

COPY table_name   CSV HEADER
SELECT A.score, C.avg, B.* FROM ft_scores2012_2020_corrected as A
INNER JOIN fg_pitcher_data_2012_2020 as B
ON A.player=B.name AND A.season=B.season
INNER JOIN fantasy_pros_adp as C
ON A.player=C.player AND A.season=C.season
ORDER BY A.score DESC
to '[/pitchers_all_data.csv]' 
DELIMITER ','
csv header;

SELECT A.score, C.avg, B.* FROM ft_scores2012_2020_corrected as A
INNER JOIN fg_hitter_data_2012_2020 as B
ON A.player=B.name AND A.season=B.season
INNER JOIN fantasy_pros_adp as C
ON A.player=C.player AND A.season=C.season
ORDER BY A.score DESC;

SELECT C.avg, B.* FROM fg_pitcher_data_2012_2020 as B
INNER JOIN fantasy_pros_adp as C
ON B.name=C.player AND B.season=C.season
ORDER BY A.score DESC;

WHERE B.name IS NULL
ORDER BY A.player;

SELECT * FROM fantasy_pros_adp

SELECT season FROM fantasy_pros_adp
GROUP BY season


SELECT * FROM ft_scores2012_2020_corrected
ORDER BY score DESC;

SELECT season FROM fg_pitcher_data_2012_2020
GROUP BY season;

SELECT * FROM fg_hitter_data_2012_2020 
ORDER by name;

SELECT * FROM ft_scores2012_2020 as A
RIGHT JOIN fg_hitter_data_2012_2020 as B
ON A.player=B.name AND A.season=B.season
WHERE A.player IS NULL
ORDER BY B.name