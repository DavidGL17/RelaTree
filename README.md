# RelaTree

A web app to create and update you family tree.

## Installation

Start a postgres server using the docker-compose file in the database folder.

```sh
cd database
docker-compose up
```

Apply the prisma schema to the database.

```sh
cd prisma
npx prisma db push
```

Seed the database with some data (for testing purposes)

```sh
cd ..
npm run seed
```

Install the dependencies and devDependencies and start the server.

```sh
npm i
npm run dev
```
