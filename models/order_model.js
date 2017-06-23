var path = require('path'),
    Promise = require("bluebird"),
    log = require('winston'),
    pool = require(path.join(__dirname, '..', '..', 'libs', 'pool')),
    request = require('request'),
    config = require(path.join(__dirname, '..','..', 'conf'));


exports.test = function (){
  return new Promise(function(resolve, reject) {
    var sql = 'SELECT * FROM innodb.`order`;'

    pool.getConnection(function(err, connection) {
      if (err || typeof connection === "undefined") {
        log.error("Unable to get a connection to the DB due to: " + err);
        console.log ("Unable to get a connection to the DB due to: " + err);
        reject(err);
        if (connection)
          connection.destroy();
      } else {

          var query=connection.query(sql, {}, function (err, response) {
              connection.release();
             if (err)
                  reject(err);
                else{
                  console.log('successful. response')
                  console.log(response)
                  resolve(response)
                }
          });
        }
    });
  });

}
