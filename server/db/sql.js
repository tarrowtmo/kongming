var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'cdb-p251i4ng.cd.tencentcdb.com',
  user     : 'root',
  password : 'phoenixyu80@sql',
  database : 'tarrow',
  port: '10029'
});
module.exports = connection