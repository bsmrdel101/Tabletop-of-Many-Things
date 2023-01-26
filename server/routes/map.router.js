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

router.post('/', (req, res) => {
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

router.post('/token', (req, res) => {
  const sqlText =`
      INSERT INTO "map_tokens" ("map_id", "token_id", "x", "y", "size")
      VALUES ($1, $2, $3, $4, $5);
  `;
  const sqlValues = [
      req.body.mapId,
      req.body.token.id,
      req.body.x,
      req.body.y,
      req.body.size,
  ];
  pool.query(sqlText, sqlValues)
      .then(() => res.sendStatus(201))
      .catch((dberror) => {
      console.log('Oops you did a goof: ', dberror);
      res.sendStatus(500)
  });
});

router.put('/', rejectUnauthenticated, (req, res) => {
  const sqlText = (`
      UPDATE "maps"
      SET "name" = $1, "image" = $2, "gridSizeX" = $3, "gridSizeY" = $4, "gridColor" = $5, "gridOpacity" = $6
      WHERE "id" = $7;
  `);
  const sqlValues = [
      req.body.name,
      req.body.image,
      req.body.gridSizeX,
      req.body.gridSizeY,
      req.body.gridColor,
      req.body.gridOpacity,
      req.body.id
  ];
  pool.query(sqlText, sqlValues)
      .then(() => res.sendStatus(201))
      .catch((dberror) => {
      console.log('Oops you did a goof: ', dberror);
      res.sendStatus(500)
  })  
});

router.delete('/token/:token', (req, res) => {
  const x = parseInt(req.params.token.split(', ')[0]);
  const y = parseInt(req.params.token.split(', ')[1]);
  const id = parseInt(req.params.token.split(', ')[2]);
  const sqlText =`
    DELETE FROM "map_tokens"
    WHERE "x" = $1 AND "y" = $2 AND token_id = $3;
  `;
  const sqlValues = [
    x,
    y,
    id
  ];
  pool.query(sqlText, sqlValues)
      .then(() => res.sendStatus(201))
      .catch((dberror) => {
      console.log('Oops you did a goof: ', dberror);
      res.sendStatus(500)
  });
});

router.delete('/token/all/:id', (req, res) => {
  const sqlText =`
    DELETE FROM "map_tokens"
    WHERE "map_id" = $1;
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
