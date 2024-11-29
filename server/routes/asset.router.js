const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
  const sqlText = (`
      SELECT * FROM "assets"
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

router.get('/:id', rejectUnauthenticated, (req, res) => {
  const sqlText = (`
    SELECT * FROM "assets"
    WHERE "id"=$1
  `);
  const sqlValues = [
    req.params.id
  ];
  pool.query(sqlText, sqlValues)
      .then((dbres) => res.send(dbres.rows[0]))
      .catch((dberror) => {
      console.log('Oops you did a goof: ', dberror);
      res.sendStatus(500)
  })
});

router.post('/', rejectUnauthenticated, (req, res) => {
  const sqlText =`
      INSERT INTO "assets" ("userId", "image")
      VALUES ($1, $2);
  `;
  const sqlValues = [
      req.user.id,
      req.body.image
  ];
  pool.query(sqlText, sqlValues)
      .then(() => res.sendStatus(201))
      .catch((dberror) => {
      console.log('Oops you did a goof: ', dberror);
      res.sendStatus(500)
  });
});

// router.post('/map', rejectUnauthenticated, (req, res) => {
//   const sqlText =`
//       INSERT INTO "map_tokens" ("gameId", "mapId", "assetId", "x", "y", "size", "creature")
//       VALUES ($1, $2, $3, $4, $5, $6, $7);
//   `;
//   const sqlValues = [
//       req.body.gameId,
//       req.body.mapId,
//       req.body.assetId,
//       req.body.x,
//       req.body.y,
//       req.body.size,
//       req.body.creature
//   ];
//   pool.query(sqlText, sqlValues)
//       .then(() => res.sendStatus(201))
//       .catch((dberror) => {
//       console.log('Oops you did a goof: ', dberror);
//       res.sendStatus(500)
//   });
// });

module.exports = router;
