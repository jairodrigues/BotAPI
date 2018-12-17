## Description

The Bot API

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# incremental rebuild (webpack)
$ npm run webpack
$ npm run start:hmr

# production mode
$ npm run start:prod
```

## Test

```bash

# e2e tests
$ npm run test:e2e
```

## Support

Local

```
Database => SQL Server
Port => 1433
username => 'sa',
password => 'Acesso@2018',
Databases => Execute script dbcreate.sql in Database/dbcreate.sql
```

Docker

```
docker-compose up
```

## Documentation

```
http:localhost:3000/api/v1/swagger
```
