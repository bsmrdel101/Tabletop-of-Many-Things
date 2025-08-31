import pg from 'pg';
import fs from 'fs';
import path from 'path';


export const client = new pg.Client({
  host: '127.0.0.1',
  port: 54329,
  user: 'postgres',
  password: 'postgres',
  database: 'tabletop_of_many_things_testing',
});
client.connect();

export async function resetDb() {
  await client.query(`
    DO $$
    DECLARE
      stmt text;
    BEGIN
      EXECUTE 'SET session_replication_role = replica';

      FOR stmt IN
        SELECT 'TRUNCATE TABLE "' || tablename || '" RESTART IDENTITY CASCADE;'
        FROM pg_tables
        WHERE schemaname = 'public'
      LOOP
        EXECUTE stmt;
      END LOOP;

      EXECUTE 'SET session_replication_role = DEFAULT';
    END $$;
  `);

  const seedDir = '../Tabletop-of-Many-Things-Server/db/seed';
  const files = fs.readdirSync(seedDir)
    .filter((file) => file.endsWith('.sql'))
    .sort();

  for (const file of files) {
    const sql = fs.readFileSync(path.join(seedDir, file), 'utf-8');
    await client.query(sql);
  }
}
