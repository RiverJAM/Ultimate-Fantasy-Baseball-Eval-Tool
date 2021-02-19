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

--create csv files from the tables for pitchers
COPY (
	SELECT A.score as FT_score, C.avg, D.value as Razz_value, B.* FROM ft_scores2012_2020_corrected as A
	INNER JOIN fg_pitcher_data_2012_2020 as B
	ON A.player=B.name AND A.season=B.season
	INNER JOIN fantasy_pros_adp as C
	ON A.player=C.player AND A.season=C.season
	LEFT JOIN razz_pitchers as D
	ON A.player=D.name AND A.season=D.year
--  	WHERE A.season=2020
	ORDER BY Razz_value DESC
	)
TO 'C:\Ro Family\Charles\Fantasy Bball\NU_Final_Project\pitchers_all_data.csv' 
DELIMITER ','
csv header;

--create csv files from the tables for hitters
COPY (
	SELECT A.score as FT_score, C.avg, D.value as Razz_value,  B.* FROM ft_scores2012_2020_corrected as A
	INNER JOIN fg_hitter_data_2012_2020 as B
	ON A.player=B.name AND A.season=B.season
	INNER JOIN fantasy_pros_adp as C
	ON A.player=C.player AND A.season=C.season
	LEFT JOIN razz_hitters as D
	ON A.player=D.name AND A.season=D.year
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