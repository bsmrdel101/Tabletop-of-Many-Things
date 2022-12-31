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

router.post('/', (req, res) => {
  // console.log(req.files.map);
  // const { name, data } = req.files.map;
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

router.put('/', rejectUnauthenticated, (req, res) => {
  const sqlText = (`
      UPDATE "maps"
      SET "name" = $1, "image" = $2, "gridSize" = $3
      WHERE "id" = $4;
  `);
  const sqlValues = [
      req.body.name,
      req.body.image,
      req.body.gridSize,
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
