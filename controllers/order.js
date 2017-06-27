var path = require('path'),
    log = require('winston'),
    Promise = require("bluebird"),
    order_model = require(path.join(__dirname, '..',  'models', 'order_model'));


function generateOrderId() {

}

exports.getAllOrders = function(req, res, next) {
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
  console.log('getOrderByOrderId')
  var orderId = req.params.id;
  console.log(orderId)
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

exports.createOrder = function(req, res, next) {
  console.log('createOrder')
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
      error: "Order failed to retrieved"
    });
    next(error);
  }
}
