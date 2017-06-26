var mysql = require('mysql'),
    path = require('path'),
    log = require('winston'),
    config = require(path.join(__dirname, '..', 'conf'));

var db_config = config.get("nuggetDb");

console.log("db_config")
console.log(db_config)

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

db_config.createConnection = function createConnection(config) {
  console.log('trying to connecting to db')
  connection = mysql.createConnection(config);
  handleDisconnect(connection);
  return connection;
};


module.exports = mysql.createPool(db_config);
