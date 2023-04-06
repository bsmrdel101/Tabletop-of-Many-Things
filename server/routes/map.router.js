const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/all/:id', rejectUnauthenticated, (req, res) => {
  const sqlText = (`
      SELECT * FROM "maps"
      WHERE "game_id"=$1
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

router.get('/:id', rejectUnauthenticated, (req, res) => {
  const sqlText = (`
      SELECT * FROM "maps"
      WHERE "id"=$1;
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

router.get('/token/:id', rejectUnauthenticated, (req, res) => {
  const sqlText = (`
      SELECT * FROM "map_tokens"
      WHERE "map_id"=$1
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
      INSERT INTO "maps" ("game_id", "name", "image")
      VALUES ($1, $2, $3);
  `;
  const sqlValues = [
      req.body.id,
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

router.put('/token', rejectUnauthenticated, (req, res) => {
  const sqlText = (`
      UPDATE "maps"
      SET "boardState" = $1
      WHERE "id" = $2;
  `);
  const sqlValues = [
      req.body.boardState,
      req.body.mapId
  ];
  pool.query(sqlText, sqlValues)
      .then(() => res.sendStatus(201))
      .catch((dberror) => {
      console.log('Oops you did a goof: ', dberror);
      res.sendStatus(500)
  })  
});

router.put('/', rejectUnauthenticated, (req, res) => {
  const sqlText = (`
      UPDATE "maps"
      SET "name" = $1, "image" = $2, "cellSize" = $3, "gridColor" = $4, "gridOpacity" = $5, "offsetX" = $6, "offsetY" = $7
      WHERE "id" = $8;
  `);
  const sqlValues = [
      req.body.name,
      req.body.image,
      req.body.cellSize,
      req.body.gridColor,
      req.body.gridOpacity,
      req.body.offsetX,
      req.body.offsetY,
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
