--change tables from text to numeric data
ALTER TABLE fg_hitter_data_2012_2020 ALTER COLUMN season TYPE integer USING season::integer;
ALTER TABLE fg_pitcher_data_2012_2020 ALTER COLUMN season TYPE integer USING season::integer;
ALTER TABLE ft_scores2012_2020_corrected ALTER COLUMN season TYPE integer USING season::integer;
ALTER TABLE fantasy_pros_adp ALTER COLUMN season TYPE integer USING season::integer;
ALTER TABLE ft_scores2012_2020_corrected ALTER COLUMN score TYPE real USING score::real;
ALTER TABLE razz_hitters ALTER COLUMN value TYPE real USING value::real;
ALTER TABLE razz_hitters ALTER COLUMN year TYPE integer USING year::integer;
ALTER TABLE razz_pitchers ALTER COLUMN year TYPE integer USING year::integer;
ALTER TABLE razz_pitchers ALTER COLUMN value TYPE real USING value::real;
ALTER TABLE smart_fantasy_all ALTER COLUMN Value TYPE real USING value::real;
ALTER TABLE smart_fantasy_all ALTER COLUMN season TYPE integer USING season::integer;

select * from smart_fantasy_all

--create csv files from the tables for pitchers
COPY (
	SELECT A.score as FT_score, C.avg, D.value as razz_value, B.* FROM ft_scores2012_2020_corrected as A
	INNER JOIN fg_pitcher_data_2012_2020 as B
	ON A.player=B.name AND A.season=B.season
	INNER JOIN fantasy_pros_adp as C
	ON A.player=C.player AND A.season=C.season
	LEFT JOIN razz_pitchers as D
	ON A.player=D.name AND A.season=D.year
--  	WHERE A.season=2020
	ORDER BY smartfantasy_value DESC
	)
TO 'C:\Ro Family\Charles\Fantasy Bball\NU_Final_Project\pitchers_all_data.csv' 
DELIMITER ','
csv header;

--FT scores and fg pitcher data produce 3566 rows
--smart_fantasy and fg_pitchers create 3483 rows
--smart_fantasy and fg_hitters create 4040 rows

COPY(
SELECT * FROM smart_fantasy_all as A
	INNER JOIN fg_pitcher_data_2012_2020 as B
	ON A.name=B.name AND A.season=B.season
	ORDER BY A.value DESC
	)
TO 'C:\Ro Family\Charles\Fantasy Bball\NU_Final_Project\pitchers_FG_smartfantasy.csv' 
DELIMITER ','
csv header;

-- fg_pitcher_data has 3698 rows.  fg hitter data is 4200
-- smart_fantasy has 10160 pitchers, 4714 hitters
SELECT * FROM smart_fantasy_all
WHERE pos != 'P'


--create csv files from the tables for hitters
COPY (
	SELECT A.score as FT_score, C.avg, D.value as razz_value,  B.* FROM ft_scores2012_2020_corrected as A
	INNER JOIN fg_hitter_data_2012_2020 as B
	ON A.player=B.name AND A.season=B.season
	INNER JOIN fantasy_pros_adp as C
	ON A.player=C.player AND A.season=C.season
	LEFT JOIN smart_fantasy_all as D
	ON A.player=D.name AND A.season=D.season
-- 	WHERE A.season=2020
	ORDER BY A.score DESC
	)
TO 'C:\Ro Family\Charles\Fantasy Bball\NU_Final_Project\hitters_all_data.csv' 
DELIMITER ','
csv header;

--create the csv for dropdown, pitchers
COPY (
	SELECT DISTINCT name FROM fg_pitcher_data_2012_2020 as B
 	WHERE season=2018 OR season=2019 OR season=2020
	ORDER BY name 
	)
TO 'C:\Ro Family\Charles\Fantasy Bball\NU_Final_Project\pitchers_dropdown.csv' 
DELIMITER ','
csv header;

--create the csv for dropdown, hitters
COPY (
	SELECT DISTINCT name FROM fg_hitter_data_2012_2020 as B
 	WHERE season=2018 OR season=2019 OR season=2020
	ORDER BY name 
	)
TO 'C:\Ro Family\Charles\Fantasy Bball\NU_Final_Project\hitter_dropdown.csv' 
DELIMITER ','
csv header;

--create the tables from the diff tables to blend the scores with the pybaseball data
SELECT A.score, C.avg, B.* FROM ft_scores2012_2020_corrected as A
INNER JOIN fg_hitter_data_2012_2020 as B
ON A.player=B.name AND A.season=B.season
INNER JOIN fantasy_pros_adp as C
ON A.player=C.player AND A.season=C.season
ORDER BY A.score DESC;

SELECT A.score, C.avg, D.value, B.* FROM ft_scores2012_2020_corrected as A
INNER JOIN fg_pitcher_data_2012_2020 as B
ON A.player=B.name AND A.season=B.season
INNER JOIN fantasy_pros_adp as C
ON A.player=C.player AND A.season=C.season
INNER JOIN razz_pitchers as D
ON A.player=D.name AND A.season=D.year
WHERE A.season=2019
ORDER BY A.score DESC;

SELECT A.score, C.avg, B.* FROM ft_scores2012_2020_corrected as A
INNER JOIN fg_hitter_data_2012_2020 as B
ON A.player=B.name AND A.season=B.season
INNER JOIN fantasy_pros_adp as C
ON A.player=C.player AND A.season=C.season
WHERE A.season=2019
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
