var path = require('path'),
    Promise = require("bluebird"),
    log = require('winston'),
    tools = require(path.join(__dirname, '..', 'libs', 'tools')),
    pool = require(path.join(__dirname, '..', 'libs', 'pool'));


exports.createUser = function (obj){
  return new Promise(function(resolve, reject) {
    var sql = 'INSERT INTO nuggetdb.user SET ?'

    pool.getConnection(function(err, connection) {
      if (err || typeof connection === "undefined") {
        log.error("Unable to get a connection to the DB due to: " + err);
        console.log ("Unable to get a connection to the DB due to: " + err);
        reject(err);
        if (connection)
          connection.destroy();
      } else {
        var query = connection.query(sql, {
          "first_name": obj.first_name,
          "last_name": obj.last_name,
          "type": obj.type,
          "current_credit": obj.current_credit,
          "email": obj.email
        }, function (err, response) {
            connection.release();
           if (err)
                reject(err);
              else{
                resolve(response[0])
              }
        });
      }
    });
  });
}
