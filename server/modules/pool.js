const { Pool } = require("pg");
let pool;

const dotenv = require("dotenv");
dotenv.config();

const connectDb = async () => {
    try {
        pool = new Pool({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.DATABASE_NAME || process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT,
        });
  
        await pool.connect();
        // const res = await pool.query('SELECT * FROM users');
        // console.log(res.rows);
        // await pool.end();
    } catch (error) {
        console.log(error);
    }
}

connectDb();

module.exports = pool;