const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'register_db',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'gym'
});

module.exports = connection;