const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
  const sqlText = (`
      SELECT * FROM "creatures"
      WHERE "user_id"=$1
      ORDER BY "creatures"."id";
  `);
  const sqlValues = [
      req.user.id
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
      SELECT "creatures"."id", "creatures"."user_id", "image", "name", "size", "type", "alignment", "ac", "hit_points", "hit_dice", "str", "dex", "con", "int", "wis", "char", "cr", "xp", "index", "walk_speed", "swim_speed", "burrow_speed", "fly_speed", "climb_speed", "prof_name", "prof_value", "vul_name", "res_name", "immune_name", "immune_type", "sense_name", "sense_value", "ability_name", "ability_desc", "action_name", "action_desc", "list", "leg_action_name", "leg_action_desc" FROM "creatures"
      JOIN "proficiencies"
          ON "creatures"."id"="proficiencies"."creature_id"
      JOIN "vulnerabilities"
          ON "creatures"."id"="vulnerabilities"."creature_id"
      JOIN "resistances"
          ON "creatures"."id"="resistances"."creature_id"
      JOIN "immunities"
          ON "creatures"."id"="immunities"."creature_id"
      JOIN "senses"
          ON "creatures"."id"="senses"."creature_id"
      JOIN "creature_abilities"
          ON "creatures"."id"="creature_abilities"."creature_id"
      JOIN "creature_actions"
          ON "creatures"."id"="creature_actions"."creature_id"
      JOIN "languages"
          ON "creatures"."id"="languages"."creature_id"
      JOIN "legendary_actions"
          ON "creatures"."id"="legendary_actions"."creature_id"
      WHERE "index"=$1
      ORDER BY "creatures"."id";
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
      INSERT INTO "proficiencies" ("creature_id", "prof_name", "prof_value")
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
