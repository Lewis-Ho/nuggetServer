var path = require('path'),
    Promise = require("bluebird"),
    log = require('winston'),
    pool = require(path.join(__dirname, '..', 'libs', 'pool'));
    // request = require('request');
    // config = require(path.join(__dirname, '..','..', 'conf'));


exports.all = function (){
  return new Promise(function(resolve, reject) {
    var sql = 'SELECT * FROM nuggetdb.order'

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
                  resolve(response[0])
                }
          });
        }
    });
  });
}

exports.getOrderByOrderId = function (id){
  return new Promise(function(resolve, reject) {
    var sql = 'SELECT * FROM nuggetdb.order WHERE id=?'

    pool.getConnection(function(err, connection) {
      if (err || typeof connection === "undefined") {
        log.error("Unable to get a connection to the DB due to: " + err);
        console.log ("Unable to get a connection to the DB due to: " + err);
        reject(err);
        if (connection)
          connection.destroy();
      } else {

          var query=connection.query(sql, [id], function (err, response) {
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

exports.createOrder = function (user_id, cat){
  return new Promise(function(resolve, reject) {
    var sql = 'INSERT INTO nuggetdb.order SET ?'

    pool.getConnection(function(err, connection) {
      if (err || typeof connection === "undefined") {
        log.error("Unable to get a connection to the DB due to: " + err);
        console.log ("Unable to get a connection to the DB due to: " + err);
        reject(err);
        if (connection)
          connection.destroy();
      } else {
        var query = connection.query(sql, {
          "user_id": user_id,
          "category": cat
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
