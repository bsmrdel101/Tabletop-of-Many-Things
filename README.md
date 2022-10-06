# Tabletop of Many Things
A virtual tabletop for 5e D&amp;D.

## Installation
- Clone the repo, and do `npm run i`.
- Setup database with [docker](https://www.docker.com/).
    - Do `npm run docker:setup`
- Create a `.env` file, and put this inside of it:
```
PGUSER="bennett"
PGHOST="localhost"
PGPASSWORD="db"
PGDATABASE="bennett"
PGPORT=5438
```
- Do `npm run start`
- Go to `http://localhost:3000/register` to create an account.
