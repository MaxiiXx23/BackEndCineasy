const mysql = require('mysql');
const conn = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'e4ca1298',
  database : 'cineasy'
});
module.exports = conn;
