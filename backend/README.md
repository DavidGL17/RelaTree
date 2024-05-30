# Backend for the RelaTree project <!-- omit from toc -->

- [1. Installation for development](#1-installation-for-development)
- [2. API](#2-api)
- [3. Work to do](#3-work-to-do)

This backend is written in typescript, and uses express to handle the API and postgresql to store the data, with prisma as the ORM.

# 1. Installation for development

First, install the dependencies:

```bash
npm install
```

Then create a .env file with the following variables:

```env
DATABASE_URL="postgresql://test:test@localhost:5432/reladb"
```

You can configure the default user's username and password with these variables, and they need to correspond to the ones your database has. You can use the [docker-compose.yml](database/docker-compose.yml) file to create a database with the correct user and password.

You can then launch the database from the database folder:

```bash
cd database
mkdir db # only the first time
docker-compose up -d
```

Then create the db schema with prisma :

```bash
npx prisma db push
```

You can seed the database with some data (for testing purposes):

```bash
npm run seed
```

Finally, you can launch the backend:

```bash
npm run dev
```

The script [start_dev](start_dev.sh) will launch the server with the database at the same time.

# 2. API

| Method |      Path      | Requires Auth |            Description            | Parameters (in body) |
| :----: | :------------: | :-----------: | :-------------------------------: | :------------------: |
|  POST  |  /auth/login   |      No       |           Login a user            |   email, password    |
|  POST  | /user/register |      No       |          Register a user          |   email, password    |
|  GET   |   /user/all    |      Yes      |    Gets the list of all users     |         None         |
|  GET   |  /user/:email  |      Yes      |    Gets a specific user's info    |         None         |
| DELETE |  /user/:email  |      Yes      | Removes a user from the database  |         None         |
|  GET   |  /familyTree/  |      Yes      | Gets the family trees of the user |         None         |

A user is composed of the following variables

| Variable |  Type   |                              Description                               |
| :------: | :-----: | :--------------------------------------------------------------------: |
|  email   | String  |                 The email of the user. Must be unique                  |
| password | String  | The password. Should never be returned by the API. Is stored as a hash |
|  admin   | Boolean |                  Whether the user is an admin or not                   |

# 3. Work to do

- Add a time limit for all tokens
- Secure the token generation key in the .env file
- Add the possibility to change a user's password
- use the Admin field to restrict access to certain routes
