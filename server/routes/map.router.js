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
    SELECT
      "maps"."id",
      "maps"."game_id",
      "maps"."name",
      "maps"."image",
      "maps"."cellSize",
      "maps"."gridColor",
      "maps"."gridOpacity",
      "maps"."offsetX",
      "maps"."offsetY",
      CASE
          WHEN COUNT("map_tokens"."id") > 0 THEN
              json_agg(
                  json_build_object(
                      'id', "map_tokens"."id",
                      'token_id', "tokens"."id",
                      'user_id', "tokens"."user_id",
                      'image', "tokens"."image",
                      'size', "tokens"."size",
                      'creature', "tokens"."creature",
                      'x', "map_tokens"."x",
                      'y', "map_tokens"."y"
                  )
              )
          ELSE
              json_build_array()
      END AS "boardState"
    FROM
      "maps"
    LEFT JOIN
      "map_tokens" ON "maps"."id" = "map_tokens"."map_id"
    LEFT JOIN
      "tokens" ON "map_tokens"."token_id" = "tokens"."id"
    WHERE
      "maps"."id" = $1
    GROUP BY
      "maps"."id", "maps"."game_id", "maps"."name", "maps"."image", "maps"."cellSize",
      "maps"."gridColor", "maps"."gridOpacity", "maps"."offsetX", "maps"."offsetY";
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
      INSERT INTO "maps" ("gameId", "name", "image")
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

router.post('/token', rejectUnauthenticated, (req, res) => {
    const sqlText =`
        INSERT INTO "map_tokens" ("map_id", "token_id", "x", "y", "size")
        VALUES ($1, $2, $3, $4, $5);
    `;
    const sqlValues = [
        req.body.mapId,
        req.body.tokenId,
        req.body.x,
        req.body.y,
        req.body.size
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
      UPDATE "map_tokens"
      SET "x" = $1, "y" = $2, "size" = $3
      WHERE "id" = $4;
  `);
  const sqlValues = [
      req.body.x,
      req.body.y,
      req.body.size,
      req.body.id
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

router.delete('/token/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = (`
        DELETE FROM "map_tokens"
        WHERE "id" = $1;
    `);
    const sqlValues = [
        req.params.id
    ];
    pool.query(sqlText, sqlValues)
        .then(() => res.sendStatus(201))
        .catch((dberror) => {
        console.log('Oops you did a goof: ', dberror);
        res.sendStatus(500)
    })  
  });

module.exports = router;
