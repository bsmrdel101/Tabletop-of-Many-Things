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
    "filepath" TEXT DEFAULT 'maps',
    "name" TEXT,    
    "image" TEXT,
    "cellSize" INTEGER DEFAULT 50,
    "gridColor" TEXT DEFAULT '#000000',
    "gridOpacity" INTEGER DEFAULT 100,
    "offsetX" DECIMAL DEFAULT 0,
    "offsetY" DECIMAL DEFAULT 0,
    "boardState" TEXT DEFAULT '[]'
);

CREATE TABLE "assets" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "users",
    "game_id" INTEGER REFERENCES "games_list",
    "filepath" TEXT DEFAULT 'assets',
    "image" TEXT
);

CREATE TABLE "map_tokens" (
    "id" SERIAL PRIMARY KEY,
    "game_id" INTEGER REFERENCES "games_list",
    "map_id" INTEGER REFERENCES "maps",
    "asset_id" INTEGER REFERENCES "assets",
    "x" INTEGER DEFAULT 0,
    "y" INTEGER DEFAULT 0,
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

CREATE TABLE "spells" (
    "id" SERIAL PRIMARY KEY,
    "game_id" INTEGER REFERENCES "games_list",
    "name" TEXT,
    "desc" TEXT,
    "level" INTEGER,
    "range" TEXT,
    "components" TEXT,
    "ritual" BOOLEAN,
    "duration" TEXT,
    "concentration" BOOLEAN,
    "castingTime" TEXT,
    "higherLevel" TEXT,
    "aoe" TEXT,
    "damage" TEXT,
    "dc" TEXT,
    "healAtSlotLevel" TEXT,
    "school" TEXT,
    "classes" TEXT,
    "subclasses" TEXT,
    "material" TEXT
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
    "game_id" INTEGER REFERENCES "games_list" ON DELETE CASCADE,
    "token" INTEGER REFERENCES "assets" ON DELETE CASCADE,
    "name" VARCHAR (80),
    "size" VARCHAR (80),
    "type" VARCHAR (80),
    "alignment" VARCHAR (80),
    "ac" INTEGER,
    "health" INTEGER,
    "hitDice" VARCHAR (80),
    "abilityScores" TEXT,
    "cr" INTEGER,
    "xp" INTEGER,
    "speeds" TEXT,
    "vulnerabilities" TEXT,
    "resistances" TEXT,
    "immunities" TEXT,
    "senses" TEXT,
    "languages" TEXT,
    "abilities" TEXT,
    "actions" TEXT,
    "legendaryActions" TEXT,
    "proficiencies" TEXT,
    "spellcasting" TEXT
);

CREATE TABLE "skills" (
    "id" SERIAL PRIMARY KEY,
    "character_id" INTEGER REFERENCES "characters" ON DELETE CASCADE,
    "name" VARCHAR (80),
    "type" VARCHAR (80),
    "bonus_mod" INTEGER DEFAULT 0,
    "proficient" BOOLEAN DEFAULT false
);

CREATE TABLE "senses" (
    "id" SERIAL PRIMARY KEY,
    "character_id" INTEGER REFERENCES "characters" ON DELETE CASCADE,
    "sense_name" VARCHAR (80),
    "sense_value" INTEGER
);

CREATE TABLE "languages" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT
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

INSERT INTO "assets" ("user_id", "game_id", "image")
VALUES 
    (1, 1, 'https://i.pinimg.com/236x/88/4a/05/884a056ba7a5a004becacbfd1bfd78fe.jpg'),
    (1, 1, 'https://i.imgur.com/zURSSgl.png'),
    (1, 1, 'https://i.imgur.com/5cibmUw.png'),
    (1, 1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlW_xekRD291YBhLdPKYifDnF2HV74Csz0KQ&usqp=CAU')
;

INSERT INTO "maps" ("game_id", "name", "image")
VALUES
    (1, 'Default Map', '/images/maps/default-map.webp'),
    (1, 'Forest', 'https://i.etsystatic.com/18388031/r/il/8b7a49/2796267092/il_fullxfull.2796267092_aezx.jpg')
;

-- INSERT INTO "spells" ("game_id", "name", "desc", "level", "range", "components", "ritual", "duration", "concentration", "castingTime", "higherLevel", "areaOfEffect", "damage", "dc", "healAtSlotLevel", "school", "classes", "subclasses", "material")
-- VALUES
--     (NULL),
-- ;

INSERT INTO "languages" ("name")
VALUES
    ('Auran')
;
