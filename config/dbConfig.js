// no longer used, can be removed

module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "Purw4dh1k@",
  DB: "pharmacyapp_db_4",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
