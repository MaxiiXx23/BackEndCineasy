const mysql = require('mysql');
const conn = mysql.createPool({
  host: 'us-cdbr-east-05.cleardb.net',
  user: 'b1e63faf60a2af',
  password: '28afff17',
  database: 'heroku_7fd597d2fb977e3'
});
module.exports = conn;
