const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlText = (`
        SELECT * FROM "games_list"
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

router.get('/game/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = (`
        SELECT * FROM "games_list"
        WHERE "code"=$1;
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

router.get('/history', rejectUnauthenticated, (req, res) => {
    const sqlText = (`
        SELECT * FROM "game_history"
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
    });
});


router.post('/', rejectUnauthenticated, (req, res) => {
    const sqlText =`
        INSERT INTO "games_list" ("user_id", "name", "code")
        VALUES ($1, $2, $3);
    `;
    const sqlValues = [
        req.user.id,
        req.body.name,
        makeID()
    ];
    pool.query(sqlText, sqlValues)
        .then(() => res.sendStatus(201))
        .catch((dberror) => {
        console.log('Oops you did a goof: ', dberror);
        res.sendStatus(500)
    });
});

router.post('/history', rejectUnauthenticated, (req, res) => {
    const sqlText =`
        INSERT INTO "game_history" ("user_id", "name", "code")
        VALUES ($1, $2, $3);
    `;
    const sqlValues = [
        req.user.id,
        req.body.name,
        req.body.code
    ];
    pool.query(sqlText, sqlValues)
        .then(() => res.sendStatus(201))
        .catch((dberror) => {
        console.log('Oops you did a goof: ', dberror);
        res.sendStatus(500)
    });
});


// router.post('/prev', rejectUnauthenticated, (req, res) => {
//     const sqlText =`
//         INSERT INTO "prev_games" ("user_id", "code")
//         VALUES ($1, $2);
//     `;
//     const sqlValues = [
//         req.user.id,
//         req.body.game
//     ];
//     pool.query(sqlText, sqlValues)
//         .then(() => res.sendStatus(201))
//         .catch((dberror) => {
//         console.log('Oops you did a goof: ', dberror);
//         res.sendStatus(500)
//     });
// });

// router.delete('/prev', rejectUnauthenticated, (req, res) => {
//     const sqlText =`
//         DELETE FROM "prev_games" 
//         WHERE "user_id"=$1;
//     `;
//     const sqlValues = [
//       req.user.id
//     ];
//     pool.query(sqlText, sqlValues)
//         .then(() => res.sendStatus(201))
//         .catch((dberror) => {
//         console.log('Oops you did a goof: ', dberror);
//         res.sendStatus(500)
//     });   
// });
  

function makeID() {
    let text = '';
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 6; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

module.exports = router;