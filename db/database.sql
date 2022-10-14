CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "new_user" BOOLEAN DEFAULT true
);

CREATE TABLE "maps" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "users",
    "name" TEXT,    
    "image" TEXT
);

CREATE TABLE "tokens" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "users",
    "image" TEXT,
    "size" INTEGER,
    "creature" TEXT
);

CREATE TABLE "map_tokens" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "users",
    "map_id" INTEGER REFERENCES "maps",
    "token_id" INTEGER REFERENCES "tokens",
    "x" INTEGER,
    "y" INTEGER
);

CREATE TABLE "games_list" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "users",
    "name" VARCHAR (80) NOT NULL,
    "code" VARCHAR (20) NOT NULL
);

CREATE TABLE "game_history" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER REFERENCES "users",
    "name" VARCHAR (80) NOT NULL,
    "code" VARCHAR (20) NOT NULL
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
    "image" TEXT,
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
    "xp" INTEGER,
    "index" TEXT,
    "walk_speed" INTEGER,
    "swim_speed" INTEGER,
    "burrow_speed" INTEGER,
    "fly_speed" INTEGER,
    "climb_speed" INTEGER
);

CREATE TABLE "skills" (
    "id" SERIAL PRIMARY KEY,
    "character_id" INTEGER REFERENCES "characters" ON DELETE CASCADE,
    "name" VARCHAR (80),
    "type" VARCHAR (80),
    "bonus_mod" INTEGER DEFAULT 0,
    "proficient" BOOLEAN DEFAULT false
);

CREATE TABLE "proficiencies" (
    "id" SERIAL PRIMARY KEY,
    "creature_id" INTEGER REFERENCES "creatures" ON DELETE CASCADE,
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
    "list" TEXT
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
    ('dev', '$2a$10$3rvmJEyHfGUQhLpuhKBmneeK76Zvw2d7wO0KYob8YKAF.DirAKcga')
;

INSERT INTO "games_list" ("user_id", "name", "code")
VALUES
    (1, 'Dev Campaign', 'pA6ZO0')
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

INSERT INTO "tokens" ("user_id", "image", "size", "creature")
VALUES 
    (1, 'https://i.pinimg.com/236x/88/4a/05/884a056ba7a5a004becacbfd1bfd78fe.jpg', 1, 'bandit'),
    (1, 'https://i.imgur.com/zURSSgl.png', 1, 'fire-elemental'),
    (1, 'https://i.imgur.com/5cibmUw.png', 2, null),
    (1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlW_xekRD291YBhLdPKYifDnF2HV74Csz0KQ&usqp=CAU', 4, 'tarrasque')
;

INSERT INTO "maps" ("user_id", "name", "image")
VALUES
    (1, 'Default Map', 'https://images.squarespace-cdn.com/content/v1/5511fc7ce4b0a3782aa9418b/1429139759127-KFHWAFFFVXJWZNWTITKK/learning-the-grid-method.jpg'),
    (1, 'Forest', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwUhS4RzGYSNBN6rAgSzwcdpzoUkYYIg_Cvg&usqp=CAU')
;
