const mysql = require('mysql');
              require('dotenv').load();

const conn = mysql.createPool({
    host: process.env.VUE_APP_MYSQL_HOST,
    user: process.env.VUE_APP_MYSQL_USER,
    password: process.env.VUE_APP_MYSQL_PASS,
    database: process.env.VUE_APP_MYSQL_DB,
    connectionLimit: 10,
    port: 3307
});

module.exports = conn;
