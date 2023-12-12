const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/all/:gameId', rejectUnauthenticated, (req, res) => {
  const sqlText = (`
    SELECT
      "creatures"."id",
      "creatures"."game_id",
      CASE
        WHEN "assets"."id" IS NOT NULL THEN
          json_build_object('id', "assets"."id", 'image', "assets"."image")
        ELSE
          null
      END AS "asset",
      "creatures"."name",
      "creatures"."size",
      "creatures"."type",
      "creatures"."alignment",
      "creatures"."ac",
      "creatures"."health",
      "creatures"."hitDice",
      "creatures"."abilityScores"::json,
      "creatures"."cr",
      "creatures"."xp",
      "creatures"."speeds"::json,
      "creatures"."vulnerabilities",
      "creatures"."resistances",
      "creatures"."immunities"::json,
      "creatures"."senses"::json,
      "creatures"."languages"::json,
      "creatures"."abilities"::json,
      "creatures"."actions"::json,
      "creatures"."legendaryActions"::json,
      "creatures"."proficiencies"::json
    FROM
      "creatures"
    LEFT JOIN
      "assets" ON "creatures"."token" = "assets"."id"
    WHERE
      ("creatures"."user_id" = $1 OR "creatures"."user_id" IS NULL)
      AND ("creatures"."game_id" = $2 OR "creatures"."game_id" IS NULL)
    ORDER BY
      "creatures"."id";
  `);
  const sqlValues = [
    req.user.id,
    req.params.gameId
  ];
  pool.query(sqlText, sqlValues)
    .then((dbres) => res.send(dbres.rows))
    .catch((dberror) => {
    console.log('Oops you did a goof: ', dberror);
    res.sendStatus(500)
  })  
});

router.get('/:index', rejectUnauthenticated, (req, res) => {
  const sqlText = (`
    SELECT
      "creatures"."id",
      "name",
      "size",
      "type",
      "alignment",
      "ac",
      "health",
      "hitDice",
      "abilityScores"::json,
      "cr",
      "xp",
      "speeds"::json,
      "vulnerabilities",
      "resistances",
      "immunities"::json,
      "senses"::json,
      "languages",
      "abilities"::json,
      "actions"::json,
      "legendaryActions"::json,
      "proficiencies"::json
    FROM "creatures"
    WHERE "creatures"."id" = $1
    GROUP BY "creatures"."id";
  `);
  const sqlValues = [
      req.params.index
  ];
  pool.query(sqlText, sqlValues)
      .then((dbres) => res.send(dbres.rows))
      .catch((dberror) => {
      console.log('Oops you did a goof: ', dberror);
      res.sendStatus(500)
  })  
});

router.post('/', rejectUnauthenticated, (req, res) => {
  const sqlText =`
      INSERT INTO "creatures" ("user_id", "index", "image", "name", "size", "type", "alignment", "ac", "hit_points", "hit_dice", "str", "dex", "con", "int", "wis", "char", "cr", "xp", "walk_speed", "swim_speed", "burrow_speed", "fly_speed", "climb_speed")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23);
  `;
  const sqlValues = [
      req.user.id,
      req.body.index,
      req.body.image,
      req.body.name,
      req.body.size,
      req.body.type,
      req.body.alignment,
      req.body.ac,
      req.body.hp,
      req.body.hitDice,
      req.body.str,
      req.body.dex,
      req.body.con,
      req.body.int,
      req.body.wis,
      req.body.char,
      req.body.cr,
      req.body.xp,
      req.body.walk,
      req.body.swim,
      req.body.burrow,
      req.body.fly,
      req.body.climb
  ];
  pool.query(sqlText, sqlValues)
      .then(() => res.sendStatus(201))
      .catch((dberror) => {
      console.log('Oops you did a goof: ', dberror);
      res.sendStatus(500)
  });
});

router.post('/prof', rejectUnauthenticated, (req, res) => {
  const sqlText =`
      INSERT INTO "creature_proficiencies" ("creature_id", "prof_type", "prof_name", "prof_value")
      VALUES ($1, $2, $3);
  `;
  const sqlValues = [
      req.body.id,
      req.body.data.type,
      req.body.data.name,
      req.body.data.value
  ];
  pool.query(sqlText, sqlValues)
      .then(() => res.sendStatus(201))
      .catch((dberror) => {
      console.log('Oops you did a goof: ', dberror);
      res.sendStatus(500)
  });
});

router.post('/vul', rejectUnauthenticated, (req, res) => {
  const sqlText =`
      INSERT INTO "vulnerabilities" ("creature_id", "vul_name")
      VALUES ($1, $2);
  `;
  const sqlValues = [
      req.body.id,
      req.body.data.name,
  ];
  pool.query(sqlText, sqlValues)
      .then(() => res.sendStatus(201))
      .catch((dberror) => {
      console.log('Oops you did a goof: ', dberror);
      res.sendStatus(500)
  });
});

router.post('/res', rejectUnauthenticated, (req, res) => {
  const sqlText =`
      INSERT INTO "resistances" ("creature_id", "res_name")
      VALUES ($1, $2);
  `;
  const sqlValues = [
      req.body.id,
      req.body.data.name,
  ];
  pool.query(sqlText, sqlValues)
      .then(() => res.sendStatus(201))
      .catch((dberror) => {
      console.log('Oops you did a goof: ', dberror);
      res.sendStatus(500)
  });
});

router.post('/immunities', rejectUnauthenticated, (req, res) => {
  let immuneType;
  if (req.body.data.dmgImmune) immuneType = 'damage';
  if (req.body.data.conImmune) immuneType = 'condition';

  const sqlText =`
      INSERT INTO "immunities" ("creature_id", "immune_name", "immune_type")
      VALUES ($1, $2, $3);
  `;
  const sqlValues = [
      req.body.id,
      req.body.data.name,
      immuneType
  ];
  pool.query(sqlText, sqlValues)
      .then(() => res.sendStatus(201))
      .catch((dberror) => {
      console.log('Oops you did a goof: ', dberror);
      res.sendStatus(500)
  });
});

router.post('/senses', rejectUnauthenticated, (req, res) => {
  const sqlText =`
      INSERT INTO "senses" ("creature_id", "sense_name", "sense_value")
      VALUES ($1, $2, $3);
  `;
  const sqlValues = [
      req.body.id,
      req.body.data.name,
      req.body.data.value
  ];
  pool.query(sqlText, sqlValues)
      .then(() => res.sendStatus(201))
      .catch((dberror) => {
      console.log('Oops you did a goof: ', dberror);
      res.sendStatus(500)
  });
});

router.post('/languages', rejectUnauthenticated, (req, res) => {
  const sqlText =`
      INSERT INTO "languages" ("creature_id", "list")
      VALUES ($1, $2);
  `;
  const sqlValues = [
      req.body.id,
      req.body.data.name
  ];
  pool.query(sqlText, sqlValues)
      .then(() => res.sendStatus(201))
      .catch((dberror) => {
      console.log('Oops you did a goof: ', dberror);
      res.sendStatus(500)
  });
});


router.post('/abilities', rejectUnauthenticated, (req, res) => {
  const sqlText =`
      INSERT INTO "creature_abilities" ("creature_id", "ability_name", "ability_desc")
      VALUES ($1, $2, $3);
  `;
  const sqlValues = [
      req.body.id,
      req.body.data.name,
      req.body.data.desc
  ];
  pool.query(sqlText, sqlValues)
      .then(() => res.sendStatus(201))
      .catch((dberror) => {
      console.log('Oops you did a goof: ', dberror);
      res.sendStatus(500)
  });
});

router.post('/actions', rejectUnauthenticated, (req, res) => {
  const sqlText =`
      INSERT INTO "creature_actions" ("creature_id", "action_name", "action_desc")
      VALUES ($1, $2, $3);
  `;
  const sqlValues = [
      req.body.id,
      req.body.data.name,
      req.body.data.desc
  ];
  pool.query(sqlText, sqlValues)
      .then(() => res.sendStatus(201))
      .catch((dberror) => {
      console.log('Oops you did a goof: ', dberror);
      res.sendStatus(500)
  });
});

router.post('/leg-actions', rejectUnauthenticated, (req, res) => {
  const sqlText =`
      INSERT INTO "legendary_actions" ("creature_id", "leg_action_name", "leg_action_desc")
      VALUES ($1, $2, $3);
  `;
  const sqlValues = [
      req.body.id,
      req.body.data.name,
      req.body.data.desc
  ];
  pool.query(sqlText, sqlValues)
      .then(() => res.sendStatus(201))
      .catch((dberror) => {
      console.log('Oops you did a goof: ', dberror);
      res.sendStatus(500)
  });
});

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const sqlText = `
      DELETE FROM "creatures"
      WHERE "id"=$1;
  `;
    
  const sqlValues = [
      req.params.id
  ];
  pool.query(sqlText, sqlValues)
      .then(() => res.sendStatus(201))
      .catch((dberror) => {
      console.log('Oops you did a goof: ', dberror);
      res.sendStatus(500)
  });
});

module.exports = router;
