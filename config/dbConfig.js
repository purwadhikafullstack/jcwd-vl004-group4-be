module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "naufal11",
  DB: "pharmacyapp_db_4",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
