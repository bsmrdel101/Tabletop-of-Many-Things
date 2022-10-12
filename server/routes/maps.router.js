const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();
const fileUpload = require('express-fileupload');

router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlText = (`
        SELECT "id", "user_id", "name", "image" FROM "maps"
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

router.post('/', (req, res) => {
    // console.log(req.files.map);
    // const { name, data } = req.files.map;
    const sqlText =`
        INSERT INTO "maps" ("user_id", "name", "image")
        VALUES ($1, $2, $3);
    `;
    const sqlValues = [
        req.user.id,
        req.body.name,
        req.body.image
    ];
    pool.query(sqlText, sqlValues)
        .then(() => res.sendStatus(201))
        .catch((dberror) => {
        console.log('Oops you did a goof: ', dberror);
        res.sendStatus(500)
    });
});


module.exports = router;