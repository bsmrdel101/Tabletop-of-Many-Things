import { execSync } from 'child_process';
import pg from 'pg';
import fs from 'fs';


const isContainerRunning = (): boolean => {
  try {
    const output = execSync('docker ps --filter "name=tabletop-of-many-things-tests" --filter "status=running" -q');
    return output.toString().trim().length > 0;
  } catch {
    return false;
  }
};

export default async function globalSetup() {
  console.log('> Ensuring test DB container is running...');

  if (!isContainerRunning()) {
    execSync('docker-compose -p tabletop-of-many-things-tests -f docker-compose.test.yml up -d', { stdio: 'inherit' });
  } else {
    console.log('> Container already running');
  }

  console.log('> Waiting for test DB to be ready...');
  await new Promise(resolve => setTimeout(resolve, 5000));
  const client = new pg.Client({
    host: '127.0.0.1',
    port: 54329,
    user: 'postgres',
    password: 'postgres',
    database: 'tabletop_of_many_things_testing',
  });
  await client.connect();

  const knownTable = 'users';
  const { rows } = await client.query(`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_name = $1
    ) AS has_table;
  `, [knownTable]);

  if (!rows[0]?.has_table) {
    console.log('> Schema not found, loading...');
    const schemaSql = fs.readFileSync('../Tabletop-of-Many-Things-Server/db/schema.sql', 'utf-8');
    await client.query(schemaSql);
    console.log('> Schema loaded');
  } else {
    console.log('> Schema already exists, skipping schema.sql');
  }

  console.log('> Truncating all user-defined tables...');
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

  console.log('> Seeding test data...');
  const seedDir = '../Tabletop-of-Many-Things-Server/db/seed';
  const files = fs.readdirSync(seedDir).filter((file) => file.endsWith('.sql')).sort();
  for (const file of files) {
    const sql = fs.readFileSync(`${seedDir}/${file}`, 'utf-8');
    console.log(`- Running ${file}`);
    await client.query(sql);
  }
  await client.end();
  console.log('> Test DB ready');
}
