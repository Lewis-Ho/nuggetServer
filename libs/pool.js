// var mysql = require('mysql'),
//   // path = require('path'),
//   // log = require('winston'),
//   config = require(path.join(__dirname, 'config', 'config.json'));
//
// function handleDisconnect(connection) {
//   connection.on('error', function(err) {
//     if (!err.fatal) {
//       return;
//     }
//
//     if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
//       throw err;
//     }
//
//     log.warn('Re-connecting lost connection: ' + err.message);
//     connection = mysql.createConnection(connection.config);
//     handleDisconnect(connection);
//     connection.connect(function(err) {
//       if (err)
//         log.error('Database reconnection error: ' + err.message);
//     });
//   });
// }
//
// var db_config = config.get("nuggetDb");
// console.log('In pool.js')
// console.log(nuggetDb)
//
// db_config.createConnection = function createConnection(config) {
//   connection = mysql.createConnection(config);
//   handleDisconnect(connection);
//   return connection;
// };
//
// module.exports = mysql.createPool({
//   host     : 'collegenugget.cpfgohlas9p3.us-east-2.rds.amazonaws.com',
//   user     : 'nuggetAdmin',
//   password : 'kindhat40',
//   database : 'Users'
// });



var mysql = require('mysql'),
  path = require('path'),
  log = require('winston'),
  config = require(path.join(__dirname, '..', 'conf'));

function handleDisconnect(connection) {
  connection.on('error', function(err) {
    console.log ("getting connection")

    if (!err.fatal) {
      return;
    }

    if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
      throw err;
    }

    log.warn('Re-connecting lost connection: ' + err.message);
    connection = mysql.createConnection(connection.config);
    console.info(connection);
    handleDisconnect(connection);
    connection.connect(function(err) {
      if (err)
        log.error('Database reconnection error: ' + err.message);
    });
  });
}

var db_config = config.get("database");


db_config.createConnection = function createConnection(config) {

  connection = mysql.createConnection(config);
  handleDisconnect(connection);
  return connection;
};


module.exports = mysql.createPool({
  host     : 'collegenugget.cpfgohlas9p3.us-east-2.rds.amazonaws.com',
  user     : 'nuggetAdmin',
  password : 'kindhat40',
  database : 'Users'
});
