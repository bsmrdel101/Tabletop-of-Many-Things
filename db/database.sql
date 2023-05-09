CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "new_user" BOOLEAN DEFAULT true
);

CREATE TABLE "games_list" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "users",
    "name" VARCHAR (80) NOT NULL,
    "code" VARCHAR (20) NOT NULL,
    "dm" INTEGER,
    "map_id" INTEGER DEFAULT 1
);

CREATE TABLE "maps" (
    "id" SERIAL PRIMARY KEY,
    "game_id" INTEGER REFERENCES "games_list",
    "name" TEXT,    
    "image" TEXT,
    "cellSize" INTEGER DEFAULT 50,
    "gridColor" TEXT DEFAULT '#000000',
    "gridOpacity" INTEGER DEFAULT 100,
    "offsetX" INTEGER DEFAULT 0,
    "offsetY" INTEGER DEFAULT 0,
    "boardState" TEXT DEFAULT '[]'
);

CREATE TABLE "tokens" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "users",
    "game_id" INTEGER REFERENCES "games_list",
    "image" TEXT,
    "size" INTEGER,
    "creature" TEXT
);

CREATE TABLE "game_history" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "users",
    "name" VARCHAR (80) NOT NULL,
    "code" VARCHAR (20) NOT NULL,
    "dm" INTEGER,
    "map_id" INTEGER DEFAULT 1
);

CREATE TABLE "characters" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "users",
    "name" VARCHAR (80) NOT NULL,
    "class" VARCHAR (80) NOT NULL,
    "race" VARCHAR (80) NOT NULL,
    "background" VARCHAR (80) NOT NULL,
    "alignment" VARCHAR (80),
    "level" INTEGER NOT NULL,
    "ac" INTEGER NOT NULL,
    "max_health" INTEGER NOT NULL,
    "current_health" INTEGER NOT NULL,
    "temp_health" INTEGER DEFAULT 0,
    "prof_bonus" INTEGER NOT NULL,
    "initiative" INTEGER,
    "inspiration" BOOLEAN DEFAULT false,
    "hit_dice" INTEGER,
    "str" INTEGER NOT NULL DEFAULT 0,
    "dex" INTEGER NOT NULL DEFAULT 0,
    "con" INTEGER NOT NULL DEFAULT 0,
    "int" INTEGER NOT NULL DEFAULT 0,
    "wis" INTEGER NOT NULL DEFAULT 0,
    "char" INTEGER NOT NULL DEFAULT 0,
    "image" TEXT,
    "walk_speed" INTEGER,
    "swim_speed" INTEGER,
    "burrow_speed" INTEGER,
    "fly_speed" INTEGER,
    "climb_speed" INTEGER
);

CREATE TABLE "creatures" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "users" ON DELETE CASCADE,
    "name" VARCHAR (80),
    "size" VARCHAR (80),
    "type" VARCHAR (80),
    "alignment" VARCHAR (80),
    "ac" INTEGER,
    "hit_points" INTEGER,
    "hit_dice" VARCHAR (80),
    "str" INTEGER,
    "dex" INTEGER,
    "con" INTEGER,
    "int" INTEGER,
    "wis" INTEGER,
    "char" INTEGER,
    "cr" INTEGER,
    "xp" INTEGER
);

CREATE TABLE "speeds" (
    "id" SERIAL PRIMARY KEY,
    "character_id" INTEGER REFERENCES "characters" ON DELETE CASCADE,
    "creature_id" INTEGER REFERENCES "creatures" ON DELETE CASCADE,
    "speed_name" TEXT,
    "speed_value" INTEGER
);

CREATE TABLE "skills" (
    "id" SERIAL PRIMARY KEY,
    "character_id" INTEGER REFERENCES "characters" ON DELETE CASCADE,
    "name" VARCHAR (80),
    "type" VARCHAR (80),
    "bonus_mod" INTEGER DEFAULT 0,
    "proficient" BOOLEAN DEFAULT false
);

CREATE TABLE "creature_proficiencies" (
    "id" SERIAL PRIMARY KEY,
    "creature_id" INTEGER REFERENCES "creatures" ON DELETE CASCADE,
    "prof_type" VARCHAR (40),
    "prof_name" VARCHAR (80),
    "prof_value" INTEGER
);

CREATE TABLE "vulnerabilities" (
    "id" SERIAL PRIMARY KEY,
    "character_id" INTEGER REFERENCES "characters" ON DELETE CASCADE,
    "creature_id" INTEGER REFERENCES "creatures" ON DELETE CASCADE,
    "vul_name" VARCHAR (80)
);

CREATE TABLE "resistances" (
    "id" SERIAL PRIMARY KEY,
    "character_id" INTEGER REFERENCES "characters" ON DELETE CASCADE,
    "creature_id" INTEGER REFERENCES "creatures" ON DELETE CASCADE,
    "res_name" VARCHAR (80)
);

CREATE TABLE "immunities" (
    "id" SERIAL PRIMARY KEY,
    "character_id" INTEGER REFERENCES "characters" ON DELETE CASCADE,
    "creature_id" INTEGER REFERENCES "creatures" ON DELETE CASCADE,
    "immune_name" VARCHAR (80),
    "immune_type" VARCHAR (80)
);

CREATE TABLE "senses" (
    "id" SERIAL PRIMARY KEY,
    "character_id" INTEGER REFERENCES "characters" ON DELETE CASCADE,
    "creature_id" INTEGER REFERENCES "creatures" ON DELETE CASCADE,
    "sense_name" VARCHAR (80),
    "sense_value" INTEGER
);

CREATE TABLE "languages" (
    "id" SERIAL PRIMARY KEY,
    "character_id" INTEGER REFERENCES "characters" ON DELETE CASCADE,
    "creature_id" INTEGER REFERENCES "creatures" ON DELETE CASCADE,
    "language_name" TEXT
);

CREATE TABLE "creature_abilities" (
    "id" SERIAL PRIMARY KEY,
    "creature_id" INTEGER REFERENCES "creatures" ON DELETE CASCADE,
    "ability_name" VARCHAR (120),
    "ability_desc" TEXT
);

CREATE TABLE "creature_actions" (
    "id" SERIAL PRIMARY KEY,
    "creature_id" INTEGER REFERENCES "creatures" ON DELETE CASCADE,
    "action_name" VARCHAR (120),
    "action_desc" TEXT
);

CREATE TABLE "legendary_actions" (
    "id" SERIAL PRIMARY KEY,
    "creature_id" INTEGER REFERENCES "creatures" ON DELETE CASCADE,
    "leg_action_name" VARCHAR (120),
    "leg_action_desc" TEXT
);

CREATE TABLE "creature_action_rolls" (
    "id" SERIAL PRIMARY KEY,
    "action_id" INTEGER REFERENCES "creature_actions" ON DELETE CASCADE,
    "ability_id" INTEGER REFERENCES "creature_abilities" ON DELETE CASCADE,
    "leg_action_id" INTEGER REFERENCES "legendary_actions" ON DELETE CASCADE,
    "name" VARCHAR (120),
    "amount" VARCHAR (80),
    "dice_type" VARCHAR (80),
    "dmg_type" VARCHAR (80),
    "to_hit" VARCHAR (80)
);

-------------------------
-- INSERT DEFAULT DATA --
-------------------------

INSERT INTO "users" ("username", "password")
VALUES
    ('dev', '$2a$10$3rvmJEyHfGUQhLpuhKBmneeK76Zvw2d7wO0KYob8YKAF.DirAKcga'),
    ('test', '$2a$10$3rvmJEyHfGUQhLpuhKBmneeK76Zvw2d7wO0KYob8YKAF.DirAKcga')
;

INSERT INTO "games_list" ("user_id", "name", "code", "dm")
VALUES
    (1, 'Dev Campaign', 'pA6ZO0', 1)
;

INSERT INTO "characters" ("user_id", "name", "class", "race", "background", "alignment", "level", "ac", "max_health", "current_health", "temp_health", "prof_bonus", "initiative", "inspiration", "hit_dice", "str", "dex", "con", "int", "wis", "char", "image", "walk_speed", "swim_speed", "burrow_speed", "fly_speed", "climb_speed")
VALUES
    (1, 'Steve', 'Breadbarian', 'Goliath', 'Noble', 'CE', 1, 12, 20, 20, 0, 2, 2, FALSE, 12, 4, 10, 11, 20, 18, 12, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBCAMLHmC6fIfZJYcqEsOAcRue_MI924YtdHo1sCosPh5-BxpeHMW0Se_ewoQBwtNODCQ&usqp=CAU', 30, 0, 0, 0, 0)
;

INSERT INTO "skills" ("character_id", "name", "type", "bonus_mod", "proficient")
VALUES 
  (1,'Athletics', 'str', 0, FALSE),
  (1,'Acrobatics', 'dex', 0, FALSE),
  (1,'Slight of Hand', 'dex', 0, FALSE),
  (1,'Stealth', 'dex', 0, FALSE),
  (1,'Arcana', 'int', 0, FALSE),
  (1,'History', 'int', 0, FALSE),
  (1,'Invesigation', 'int', 0, FALSE),
  (1,'Nature', 'wis', 0, FALSE),
  (1,'Religion', 'wis', 0, FALSE),
  (1,'Animal Handling', 'wis', 0, FALSE),
  (1,'Insight', 'wis', 0, FALSE),
  (1,'Medicine', 'wis', 0, FALSE),
  (1,'Perception', 'wis', 0, FALSE),
  (1,'Survival', 'wis', 0, FALSE),
  (1,'Deception', 'char', 0, FALSE),
  (1,'Intimidation', 'char', 0, FALSE),
  (1,'Performance', 'char', 0, FALSE),
  (1,'Persuasion', 'char', 0, FALSE)
;

INSERT INTO "tokens" ("user_id", "game_id", "image", "size", "creature")
VALUES 
    (1, 1, 'https://i.pinimg.com/236x/88/4a/05/884a056ba7a5a004becacbfd1bfd78fe.jpg', 1, 'bandit'),
    (1, 1, 'https://i.imgur.com/zURSSgl.png', 1, 'fire-elemental'),
    (1, 1, 'https://i.imgur.com/5cibmUw.png', 2, null),
    (1, 1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlW_xekRD291YBhLdPKYifDnF2HV74Csz0KQ&usqp=CAU', 4, 'tarrasque')
;

INSERT INTO "maps" ("game_id", "name", "image")
VALUES
    (1, 'Default Map', 'https://i2.wp.com/azgaar.files.wordpress.com/2019/07/antique-big.jpg'),
    (1, 'Forest', 'https://i.etsystatic.com/18388031/r/il/8b7a49/2796267092/il_fullxfull.2796267092_aezx.jpg')
;

INSERT INTO "creatures" ("user_id", "name", "size", "type", "alignment", "ac", "hit_points", "hit_dice", "str", "dex", "con", "int", "wis", "char", "cr", "xp")
VALUES
    (1, 'Dough Elemental', 'Medium', 'elemental', 'neutral', 12, 40, '12d8', 16, 12, 14, 9, 11, 13, 4, 30)
;

INSERT INTO "creature_abilities" ("creature_id", "ability_name", "ability_desc") VALUES (1, 'Regeneration', 'The dough elemental regenerates 10 hp at the start of its turn.');
INSERT INTO "creature_actions" ("creature_id", "action_name", "action_desc") VALUES (1, 'Multiattack', 'Can make 2 slam attacks.'), (1, 'Slam', 'Make a slam attack.');
INSERT INTO "speeds" ("character_id", "creature_id", "speed_name", "speed_value") VALUES (null, 1, 'Walk', 30), (null, 1, 'Burrow', 10);
INSERT INTO "immunities" ("character_id", "creature_id", "immune_name", "immune_type") VALUES (null, 1, 'poison', 'damage'), (null, 1, 'stunned', 'condition');
INSERT INTO "languages" ("character_id", "creature_id", "language_name") VALUES (null, 1, 'Auran');
INSERT INTO "legendary_actions" ("creature_id", "leg_action_name", "leg_action_desc") VALUES (1, 'Detect', 'Make a perception check.');
INSERT INTO "creature_proficiencies" ("creature_id", "prof_type", "prof_name", "prof_value") VALUES (1, 'skill', 'Athletics', 4), (1, 'save', 'Con', 6);
INSERT INTO "resistances" ("character_id", "creature_id", "res_name") VALUES (null, 1, 'bludgeoning');
INSERT INTO "senses" ("character_id", "creature_id", "sense_name", "sense_value") VALUES (null, 1, 'Darkvision', 60), (null, 1, 'Passive perception', 12);
INSERT INTO "vulnerabilities" ("character_id", "creature_id", "vul_name") VALUES (null, 1, 'fire');
