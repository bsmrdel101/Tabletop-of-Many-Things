const pg = require('pg');

let config = {};

if (process.env.NODE_ENV === 'production') {
  config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false },
    max: 10,
    idleTimeoutMillis: 30000,
  };
} else {
  config = {
    host: 'localhost',
    port: 5438,
    database: 'app',
    max: 10,
    password: 'db',
    user: 'app',
    idleTimeoutMillis: 30000,
  };
}

const pool = new pg.Pool(config);

pool.on('error', (err) => {
  console.log('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;
