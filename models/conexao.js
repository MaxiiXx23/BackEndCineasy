const mysql = require('mysql');
const conn = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'Cineasy'
});
module.exports = conn;
