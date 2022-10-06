const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    // Send back user object from the session (previously queried from the database)
    res.send(req.user);
});

router.post('/register', (req, res) => {
    const password = encryptLib.encryptPassword(req.body.password);

    const sqlText =`
        INSERT INTO "user" ("username", "password")
        VALUES ($1, $2) RETURNING id;
    `;
    const sqlValues = [
        req.body.username,
        password
    ];
    pool.query(sqlText, sqlValues)
        .then(() => res.sendStatus(201))
        .catch((dberror) => {
        console.log('Oops you did a goof: ', dberror);
        res.sendStatus(500)
    });
});

router.post('/login', userStrategy.authenticate('local'), (req, res) => {
    res.sendStatus(200);
});
  
// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.put('/', rejectUnauthenticated, (req, res) => {
    const sqlText =`
        UPDATE "user"
        SET "new_user" = $1
        WHERE "id" = $2;
    `;
    const sqlValues = [
        req.body.newStatus,
        req.user.id,  
    ];
    pool.query(sqlText, sqlValues)
        .then((dbres) => res.sendStatus(201))
        .catch((dberror) => {
          console.log('Oops you did a goof', dberror);
          res.sendStatus(500)
    })
});

module.exports = router;