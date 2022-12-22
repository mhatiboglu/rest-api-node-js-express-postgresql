CREATE TABLE countries (
	id SERIAL NOT NULL,
  	country VARCHAR(100) NOT NULL,
    fifa_ranking INT 
);

CREATE TABLE players (
  id SERIAL NOT NULL,
  name VARCHAR(50),
  country VARCHAR(50),
  age INT NOT NULL
);


INSERT INTO players (name,country,age) VALUES
('Modric','Croatia',37),
('Kovacic','Croatia',28),
('Mbappe','France',23),
('Lloris','France',35),
('Ziyech','Morocco',29),
('Hakimi','Morocco',24),
('Messi','Argentina',35),
('DiMaria','Argentina',34);

INSERT INTO countries (country, fifa_ranking) VALUES
	('Morocco',34),
	('Argentina',8),
	('France',2),
	('Croatia',14);

SELECT * FROM countries;
SELECT * FROM players;