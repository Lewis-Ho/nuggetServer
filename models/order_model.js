var path = require('path'),
    Promise = require("bluebird"),
    log = require('winston'),
    tools = require(path.join(__dirname, '..', 'libs', 'tools')),
    pool = require(path.join(__dirname, '..', 'libs', 'pool'));
    // request = require('request');
    // config = require(path.join(__dirname, '..','..', 'conf'));


exports.getAllOrders = function (){
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


exports.getRevisionById = function (id){
  return new Promise(function(resolve, reject) {
    var sql = 'SELECT * FROM nuggetdb.revision WHERE revision_id=?'

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


exports.getOrdersByUserId = function (uid) {
  return new Promise(function(resolve, reject) {
    var sql = 'SELECT * FROM nuggetdb.order WHERE user_id=?'

    pool.getConnection(function(err, connection) {
      if (err || typeof connection === "undefined") {
        log.error("Unable to get a connection to the DB due to: " + err);
        console.log ("Unable to get a connection to the DB due to: " + err);
        reject(err);
        if (connection)
          connection.destroy();
      } else {
        var query=connection.query(sql, [uid], function (err, response) {
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
          var order = {
            "id": response.insertId,
            "user_id": user_id,
            "category": cat
          }
          connection.release();
          if (err)
            reject(err);
          else{
            resolve(order)
          }
        });
      }
    });
  });
}


exports.createRevision = function (obj){
  return new Promise(function(resolve, reject) {
    console.log('order_model createRevision')
    var sql = 'INSERT INTO nuggetdb.revision SET ?'

    pool.getConnection(function(err, connection) {
      if (err || typeof connection === "undefined") {
        log.error("Unable to get a connection to the DB due to: " + err);
        console.log ("Unable to get a connection to the DB due to: " + err);
        reject(err);
        if (connection)
          connection.destroy();
      } else {

        var revision = {
          "revision_id": tools.genRevision(),
          "order_id": obj.order_id,
          "user_id": obj.user_id,
          "status": obj.status,
          "total": obj.total,
          "payment_type": "credit",
          "shipping_rate": "regular",
          "currency": "USD",
          "assigned_editor_id": "someEditorId",
          "billing_first_name": obj.billing_first_name,
          "billing_last_name": obj.billing_last_name,
          "billing_phone": tools.genHash(obj.billing_phone, 'md5'),
          "billing_company": obj.billing_company,
          "billing_street1": tools.genHash(obj.billing_street1, 'md5'),
          "billing_street2": tools.genHash(obj.billing_street2, 'md5'),
          "billing_city": tools.genHash(obj.billing_city, 'md5'),
          "billing_state": tools.genHash(obj.billing_state, 'md5'),
          "billing_postal_code": tools.genHash(obj.billing_postal_code, 'md5'),
          "billing_country": obj.billing_country,
          "billing_email": tools.genHash(obj.billing_email, 'md5'),
          "source_url": obj.source_url
        }

        var query = connection.query(sql, {
          "revision_id": revision.revision_id,
          "order_id": revision.order_id,
          "user_id": revision.user_id,
          "status": revision.status,
          "total": revision.total,
          "payment_type": revision.payment_type,
          "shipping_rate": revision.shipping_rate,
          "currency": revision.currency,
          "assigned_editor_id": revision.assigned_editor_id,
          "billing_first_name": revision.billing_first_name,
          "billing_last_name": revision.billing_last_name,
          "billing_phone": revision.billing_phone,
          "billing_company": revision.billing_company,
          "billing_street1": revision.billing_street1,
          "billing_street2": revision.billing_street2,
          "billing_city": revision.billing_city,
          "billing_state": revision.billing_state,
          "billing_postal_code": revision.billing_postal_code,
          "billing_country": revision.billing_country,
          "billing_email": revision.billing_email,
          "source_url": revision.source_url
        }, function (err, response) {
          console.log('here')
          console.log(response)
          connection.release();
          if (err)
            reject(err);
          else{
            resolve(revision)
          }
        });
      }
    });
  });
}


exports.updateRevisionStatus = function (revisionId, status){
  return new Promise(function(resolve, reject) {
    var sql = 'UPDATE nuggetdb.revision SET status=? WHERE revision_id=? '

    pool.getConnection(function(err, connection) {
      if (err || typeof connection === "undefined") {
        log.error("Unable to get a connection to the DB due to: " + err);
        console.log ("Unable to get a connection to the DB due to: " + err);
        reject(err);
        if (connection)
          connection.destroy();
      } else {
        var query = connection.query(sql, [status, revisionId], function (err, response) {
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
