BEGIN;

TRUNCATE trips, searchers RESTART IDENTITY CASCADE;

INSERT INTO searchers
    (first_name, last_name, user_name, email, password)
VALUES
('Oscar', 'Jarjayes', 'LadyOscar', 'madamigella@gpost.fr', 'veryg00dpassw0rd'),
('Andre', 'Grandier', 'Bellocchio', 'domestico@gpoor.fr', 'veryg00dpassw0rd2'),
('Alex', 'Swartz', 'Axax', 'sincere@april.biz', 'veryg00dpassw0rd3'),
('Antonia', 'Howell', 'Antonette', 'shanna@melissa.tv', 'veryg00dpassw0rd4'),
('Clementine', 'Bauch', 'Samantha', 'nathan@yesenia.net', 'veryg00dpassw0rd5'),
('Patricia', 'Lebsack', 'Kariann', 'julianne.OConner@kory.org', 'veryg00dpassw0rd6'),
('Chelsey', 'Dietrich', 'Kamren', 'lucio_Hettinger@annie.ca', 'veryg00dpassw0rd7'),
('Kurtis', 'Weissnat', 'Skiles', 'karley_Dach@jasper.info', 'veryg00dpassw0rd8'),
('Nicholas', 'Runolfsdottir', 'Maxime', 'telly.Hoeger@billy.biz', 'veryg00dpassw0rd9'),
('Glenna', 'Reichert', 'Delphine', 'sherwood@rosamond.me', 'veryg00dpassw0rd10'),
('Clementina', 'DuBuque', 'Moriah', 'fail@fefiemail.it', 'veryg00dpassw0rd22'),
('Fede', 'Cola', 'Fede2', 'fedecola@fefi.it', 'veryg00dpassw0rd23'),
('Akito', 'Hayama', 'Eric', 'notwithsana@gpost.jp', 'veryg00dpassw0rd24'),
('Michael', 'Scott', 'dunder', 'mifflina@gpost.ny', 'veryg00dpassw0rd25');

INSERT INTO trips 
    (user_id, country, month)
VALUES 
(1, 'France', 'jun'), 
(2, 'Italy', 'jan'), 
(3, 'Austria', 'jan'), 
(4, 'Spain', 'feb'), 
(5, 'Greece', 'mar'), 
(6, 'France', 'apr'), 
(7, 'Venezuela', 'may'), 
(8, 'Germany', 'jun'), 
(9, 'Russia', 'jul'), 
(10, 'Canada', 'aug'), 
(11, 'Australia', 'sep'), 
(12, 'Italy', 'dec'), 
(13, 'Italy', 'dec'), 
(14, 'China', 'jan'),
(1, 'Belgium', 'jan');

commit;
