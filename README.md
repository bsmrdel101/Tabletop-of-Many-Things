# Tabletop of Many Things
A virtual tabletop for 5e D&amp;D.

## Installation
- Clone the repo, and do `npm i`.
- Setup postgres database with [docker](https://www.docker.com/).
    - Do `npm run docker:setup`
- Create a `.env` file, and put the content from `.env-sample` inside of it.
- Do `npm run dev`, `npm run sass`, and `npm run tsc` in different terminal windows.
- Go to `http://localhost:3000/register` to create an account.
