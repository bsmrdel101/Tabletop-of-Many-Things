const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlText = (`
        SELECT * FROM "tokens"
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

router.post('/', rejectUnauthenticated, (req, res) => {
    const sqlText =`
        INSERT INTO "tokens" ("user_id", "image", "size", "creature")
        VALUES ($1, $2, $3, $4);
    `;
    const sqlValues = [
        req.user.id,
        req.body.image,
        req.body.size,
        req.body.creature
    ];
    pool.query(sqlText, sqlValues)
        .then(() => res.sendStatus(201))
        .catch((dberror) => {
        console.log('Oops you did a goof: ', dberror);
        res.sendStatus(500)
    });
});

router.post('/map', rejectUnauthenticated, (req, res) => {
    console.log(req.body);
    const sqlText =`
        INSERT INTO "map_tokens" ("user_id", "map_id", "token_id", "x", "y")
        VALUES ($1, $2, $3, $4, $5);
    `;
    const sqlValues = [
        req.user.id,
        req.body.map,
        req.body.token,
        req.body.x,
        req.body.y
    ];
    pool.query(sqlText, sqlValues)
        .then(() => res.sendStatus(201))
        .catch((dberror) => {
        console.log('Oops you did a goof: ', dberror);
        res.sendStatus(500)
    });
});

module.exports = router;