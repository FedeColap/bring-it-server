BEGIN;

TRUNCATE trips, searchers RESTART IDENTITY CASCADE;

INSERT INTO searchers
    (first_name, last_name, user_name, email, password)
VALUES
('Oscar', 'Jarjayes', 'LadyOscar', 'madamigella@gpost.fr', '$2a$12$OR3HNiQ6pbzOax605vm2euXgXWVQJxTi64S3Sg6aXJKdsimtlpO6y'),
('Andre', 'Grandier', 'Bellocchio', 'domestico@gpoor.fr', '$2a$12$pDasWDuTKfN7q11Mf0J9m.L8nGjrJ5x/oGD9NhrFw/oH9gHgKP0se'),
('Alex', 'Swartz', 'Axax', 'sincere@april.biz', '$2a$12$ZWf.csXxtocniPG6bkGA.efgoD2/nfbcTJH3m.amU1dwqhsahNsWa'),
('Antonia', 'Howell', 'Antonette', 'shanna@melissa.tv', '$2a$12$7QADlgwfOkE1hrJR9KdjZur.wdC/UQnrtDuCk6oHVR9cHhnoMSK4C'),
('Clementine', 'Bauch', 'Samantha', 'nathan@yesenia.net', '$2a$12$m62NK20ds6ev7o6tMdethOLTb3ML6pC1mL8flkjDTw5zHqQd61y4O'),
('Patricia', 'Lebsack', 'Kariann', 'julianne.OConner@kory.org', '$2a$12$PMi9cVPIzMm13sfATSyED.mtyHhnOlxUstoU08KYMHkTmzVn4AcN.'),
('Chelsey', 'Dietrich', 'Kamren', 'lucio_Hettinger@annie.ca', '$2a$12$mho8sjd5DQoLF9rvcOGVw.ahHyakVaUSr3QtGgCEgKznHfmm4iCL6'),
('Kurtis', 'Weissnat', 'Skiles', 'karley_Dach@jasper.info', '$2a$12$Mc8cxm9tiWkWXrTzVEkRUeAiGUA6Xf6CUwFZP8NKkVbU/IOi1iGcC'),
('Nicholas', 'Runolfsdottir', 'Maxime', 'telly.Hoeger@billy.biz', '$2a$12$HZFu45iFKdNenyYkiscHSui9d1r0qRxe27kN8eKsB40HAUw6/6dHW'),
('Glenna', 'Reichert', 'Delphine', 'sherwood@rosamond.me', '$2a$12$4fLg6iyjkzjR./3rUVoDneYh76oNTQzsZBk4jw7T0FOuGkoIH/1fa'),
('Clementina', 'DuBuque', 'Moriah', 'fail@fefiemail.it', '$2a$12$y8hmJE.0MuH5IkXxhB6m4./xH.VXiJ9OkkcMl.OpCDdcRJ53ghUVi'),
('Fede', 'Cola', 'Fede2', 'fedecola@fefi.it', '$2a$12$B0oWEqTxBMmf7LxM6gxTkenGaCehdFLMCYw3f60fPkYoJtY5Q3/Yy'),
('Akito', 'Hayama', 'Eric', 'notwithsana@gpost.jp', '$2a$12$rGmgwHtSyw9NHhP9TyTlDuvt6W36qJ5p0NYGUrI7fghkFzNLNMcUW'),
('Michael', 'Scott', 'Dunder', 'mifflin@gnh.usa', '$2a$12$0RdrZnyC.PiuqvAB6UmuQu7fhlW1Bl60q2ER8ZNS2/8vZS2LjLJGm'),
('Kaede', 'Rukawa', 'SuperRookie', 'kaedeRukawa@shohoku.jp', '$2a$12$mS/.9FtWg70RUn4dOQM7RO09kFeiVVP808/JT1bWZZ.LjC1.4SgmO'),
('Hanamichi', 'Sakuragi', 'Tenshou', 'hanamichin@shohoku.jp', '$2a$12$NIxh9VMXB3NDQElzZinjCOeCH1xjGA3jV5m59bgu49nDS25syWgwi'),
('Takenori', 'Akagi', 'Gorilla', 'captain@shohoku.jp', '$2a$12$DqgVWNBA9pmkkO0572IUGeKbrgU3E3yTH.SmikR2x7JRIwqCu/lky'),
('Hisashi', 'Mitsui', 'Teppista', 'shooter@shohoku.jp', '$2a$12$Co0vMBxO3C/FeYGWNAj/QeDKXdxGUMgcwoc7gSN72J/5XWXESruPu'),
('Ryota', 'Miyagi', 'Tappetto', 'mifflina@gpost.ny', '$2a$12$AeG/S8B9eqqHzNFk4CNOCuoPXttKA3./C5nqf2sB2lKliFKrpnV5q');





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
