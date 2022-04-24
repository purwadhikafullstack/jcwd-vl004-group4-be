`npm install` if config and seeders files already exist

## 1. Create Database

Will create a new database with name given in config.json

```
npx sequalize-cli db:create
```

## 2. Generate new Model

```
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
```

## 3. Synchronize Database and Models

After making changes in the models run update-tables command to update the database tables. Tables will be created if don't exist already.

```
npm run update-tables

```

# Seeding Database

Seeders are used to insert dummy or initial data in database.

## Run a Seeder to Insert Data

```
npx sequelize-cli db:seed:all
```

Or,

```
npx sequelize-cli db:seed --seed .\seeders\1_dummy-users.js
```

Undo changes made by most recent seeder,

```
npx sequelize-cli db:seed:undo
```

## Create a new Seeder

```
npx sequelize-cli seed:generate --name dummy-users
```
