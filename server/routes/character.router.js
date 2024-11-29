const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', rejectUnauthenticated, (req, res) => {
  const sqlText = (`
    SELECT * FROM "characters"
    WHERE "userId" = $1
    ORDER BY "id";
  `);
  const sqlValues = [
      req.user.id
  ];
  pool.query(sqlText, sqlValues)
    .then((dbres) => res.send(dbres.rows))
    .catch((dberror) => {
      console.log('Oops you did a goof: ', dberror);
      res.sendStatus(500);
    }
  );
});

router.get('/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = (`
        SELECT * FROM "characters"
        WHERE "id" = $1
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
      INSERT INTO "characters" ("userId")
      VALUES ($1);
    `;
    const sqlValues = [
      req.user.id
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
    
    `);
    const sqlValues = [
        
    ];
    pool.query(sqlText, sqlValues)
        .then(() => res.sendStatus(201))
        .catch((dberror) => {
        console.log('Oops you did a goof: ', dberror);
        res.sendStatus(500)
    })  
});


module.exports = router;
