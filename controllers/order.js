var path = require('path'),
    log = require('winston'),
    Promise = require("bluebird"),
    order_model = require(path.join(__dirname, '..',  'models', 'order_model'));


function generateOrderId() {

}

exports.all = function(req, res, next) {
  console.log('getAllOrders')
  try {
      Promise = order_model.getAllOrders();
      Promise.then(function(response) {
        res.status(200).send({
          "status":true, "message": response
        });
      }).catch(e => {
        throw e;
      });
  } catch (error) {
    log.error(error.stack);
    res.send(500, {
      error: "Order failed to retrieved"
    });
    next(error);
  }
}


exports.getOrderByOrderId = function(req, res, next) {
  if (!req.params.id) {
    res.status(400).send({
      "status":false, "message": "Missing order id"
    });
  }
  var orderId = req.params.id;
  try {
      Promise = order_model.getOrderByOrderId(orderId);
      Promise.then(function(response) {
        res.status(200).send({
          "status":true, "message": response
        });
      }).catch(e => {
        throw e;
      });
  } catch (error) {
    log.error(error.stack);
    res.send(500, {
      error: "Order failed to retrieved"
    });
    next(error);
  }
}


exports.getOrdersByUserId = function(req, res, next) {
  if (!req.params.uid) {
    res.status(400).send({
      "status":false, "message": "Missing user id"
    });
  }
  var uid = req.params.uid;
  try {
      Promise = order_model.getOrdersByUserId(uid);
      Promise.then(function(response) {
        res.status(200).send({
          "status":true, "message": response
        });
      }).catch(e => {
        throw e;
      });
  } catch (error) {
    log.error(error.stack);
    res.send(500, {
      error: "Order failed to retrieved"
    });
    next(error);
  }
}


exports.createOrder = function(req, res, next) {
  console.log('createOrder')
  if (!req.body.userId || !req.body.category) {
    res.status(400).send({
      "status":false, "message": "Request body is missing required properties"
    });
  }
  var userId = req.body.userId;
  var cat = req.body.category;
  try {
    // INSERT INTO nuggetdb.Order SET user_id='10002',category='resume'
      Promise = order_model.createOrder(userId, cat);
      Promise.then(function(response) {
        res.status(200).send({
          "status":true, "message": response
        });
      }).catch(e => {
        throw e;
      });
  } catch (error) {
    log.error(error.stack);
    res.send(500, {
      error: "Failed to create order"
    });
    next(error);
  }
}


exports.createRevision = function(req, res, next) {
  console.log('createRevision')
  if (!req.body.order_id || !req.body.user_id) {
    res.status(400).send({
      "status":false, "message": "Request body is missing required properties"
    });
  }
  var body = req.body;
  try {
    // INSERT INTO nuggetdb.Order SET user_id='10002',category='resume'
      Promise = order_model.createRevision(body);
      Promise.then(function(response) {
        res.status(200).send({
          "status":true, "message": response
        });
      }).catch(e => {
        throw e;
      });
  } catch (error) {
    log.error(error.stack);
    res.send(500, {
      error: "Failed to create revision"
    });
    next(error);
  }
}
