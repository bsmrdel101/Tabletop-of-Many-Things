const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
  const sqlText = (`
      SELECT * FROM "games_list"
      WHERE "userId"=$1
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
      WHERE "userId"=$1
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
      INSERT INTO "games_list" ("userId", "name", "code", "dm")
      VALUES ($1, $2, $3, $4);
  `;
  const sqlValues = [
      req.user.id,
      req.body.name,
      makeID(),
      req.user.id
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
      INSERT INTO "game_history" ("userId", "name", "code")
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

router.put('/:id', rejectUnauthenticated, (req, res) => {
  const sqlText = (`
      UPDATE "games_list"
      SET "mapId" = $1
      WHERE "id" = $2;
  `);
  const sqlValues = [
      req.body.id,
      req.params.id
  ];
  pool.query(sqlText, sqlValues)
      .then(() => res.sendStatus(201))
      .catch((dberror) => {
      console.log('Oops you did a goof: ', dberror);
      res.sendStatus(500)
  })  
});


// router.post('/prev', rejectUnauthenticated, (req, res) => {
//     const sqlText =`
//         INSERT INTO "prev_games" ("userId", "code")
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
//         WHERE "userId"=$1;
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
