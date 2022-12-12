const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlText = (`
        SELECT * FROM "characters"
        WHERE "user_id"=$1
        ORDER BY "id";
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

router.get('/skills/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = (`
        SELECT * FROM "skills"
        WHERE "character_id"=$1
        ORDER BY "name" ASC;
    `);
    const sqlValues = [
        req.params.id
    ];
    pool.query(sqlText, sqlValues)
        .then((dbres) => res.send(dbres.rows))
        .catch((dberror) => {
        console.log('Oops you did a goof: ', dberror);
        res.sendStatus(500)
    })  
});

router.get('/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = (`
        SELECT * FROM "characters"
        WHERE "id"=$1
        ORDER BY "id";
    `);
    const sqlValues = [
        req.params.id
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
        INSERT INTO "characters" ("user_id", "name", "class", "race", "background", "alignment", "level", "ac", "max_health", "current_health", "temp_health", "prof_bonus", "initiative", "inspiration", "hit_dice", "str", "dex", "con", "int", "wis", "char", "image", "walk_speed", "swim_speed", "burrow_speed", "fly_speed", "climb_speed")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27);
    `;
    const sqlValues = [
        req.user.id,
        req.body.name,
        req.body.class,
        req.body.race,
        req.body.background,
        req.body.alignment,
        req.body.level,
        req.body.ac,
        req.body.max_health,
        req.body.current_health,
        req.body.temp_health,
        req.body.prof_bonus,
        req.body.initiative,
        req.body.inspiration,
        req.body.hit_dice,
        req.body.str,
        req.body.dex,
        req.body.con,
        req.body.int,
        req.body.wis,
        req.body.char,
        req.body.image,
        req.body.walk_speed,
        req.body.swim_speed,
        req.body.burrow_speed,
        req.body.fly_speed,
        req.body.climb_speed
    ];
    pool.query(sqlText, sqlValues)
        .then(() => res.sendStatus(201))
        .catch((dberror) => {
        console.log('Oops you did a goof: ', dberror);
        res.sendStatus(500)
    });
});

router.post('/skills', rejectUnauthenticated, (req, res) => {
    const sqlText =`
        INSERT INTO "skills" ("character_id", "name", "type", "bonus_mod", "proficient")
        VALUES ($1, $2, $3, $4, $5);
    `;
    const sqlValues = [
        req.body.id,
        req.body.name,
        req.body.type,
        req.body.bonus_mod,
        req.body.proficient
    ];
    pool.query(sqlText, sqlValues)
        .then(() => res.sendStatus(201))
        .catch((dberror) => {
        console.log('Oops you did a goof: ', dberror);
        res.sendStatus(500)
    });
});

router.put('/health', rejectUnauthenticated, (req, res) => {
    const sqlText = (`
        UPDATE "characters"
        SET "current_health" = $1
        WHERE "id" = $2;
    `);
    const sqlValues = [
        req.body.health,
        req.body.id
    ];
    pool.query(sqlText, sqlValues)
        .then(() => res.sendStatus(201))
        .catch((dberror) => {
        console.log('Oops you did a goof: ', dberror);
        res.sendStatus(500)
    })  
});

router.put('/temp', rejectUnauthenticated, (req, res) => {
    const sqlText = (`
        UPDATE "characters"
        SET "temp_health" = $1
        WHERE "id" = $2;
    `);
    const sqlValues = [
        req.body.health,
        req.body.id
    ];
    pool.query(sqlText, sqlValues)
        .then(() => res.sendStatus(201))
        .catch((dberror) => {
        console.log('Oops you did a goof: ', dberror);
        res.sendStatus(500)
    })  
});

router.put('/inspiration', rejectUnauthenticated, (req, res) => {
    const sqlText = (`
        UPDATE "characters"
        SET "inspiration" = $1
        WHERE "id" = $2;
    `);
    const sqlValues = [
        req.body.newInspiration,
        req.body.id
    ];
    pool.query(sqlText, sqlValues)
        .then(() => res.sendStatus(201))
        .catch((dberror) => {
        console.log('Oops you did a goof: ', dberror);
        res.sendStatus(500)
    })  
});

router.put('/skills', rejectUnauthenticated, (req, res) => {
    const sqlText = (`
        UPDATE "skills"
        SET "name" = $1, "type" = $2, "bonus_mod" = $3, "proficient" = $4
        WHERE "id" = $5;
    `);
    const sqlValues = [
        req.body.name,
        req.body.type,
        req.body.bonus_mod,
        req.body.proficient,
        req.body.id
    ];
    pool.query(sqlText, sqlValues)
        .then(() => res.sendStatus(201))
        .catch((dberror) => {
        console.log('Oops you did a goof: ', dberror);
        res.sendStatus(500)
    })  
});


module.exports = router;
