var path = require('path'),
    log = require('winston'),
    Promise = require("bluebird"),
    order_model = require(path.join(__dirname, '..',  'models', 'order_model'));


function generateOrderId() {

}

exports.all = function(req, res, next) {
  console.log('getAllOrders')
  Promise = order_model.getAllOrders();
  Promise.then(function(response) {
    return res.status(200).send({
      "status":true, "message": response
    });
  }).catch(e => {
    log.error(e.stack);
    return res.status(500).send({
      error: "Order failed to retrieved: "+e.message
    });
    next(e);
  });
}


exports.getOrderByOrderId = function(req, res, next) {
  console.log('getOrderByOrderId')
  if (!req.params.id) {
    return res.status(400).send({
      "status":false, "message": "Missing order id"
    });
  }
  var orderId = req.params.id;
  Promise = order_model.getOrderByOrderId(orderId);
  Promise.then(function(response) {
    return res.status(200).send({
      "status":true, "message": response
    });
  }).catch(e => {
    log.error(e.stack);
    return res.status(500).send({
      error: "Order failed to retrieved: "+e.message
    });
    next(e);
  });
}


exports.getOrdersByUserId = function(req, res, next) {
  console.log('getOrdersByUserId')
  if (!req.params.uid) {
    return res.status(400).send({
      "status":false, "message": "Missing user id"
    });
  }
  var uid = req.params.uid;
  Promise = order_model.getOrdersByUserId(uid);
  Promise.then(function(response) {
    return res.status(200).send({
      "status":true, "message": response
    });
  }).catch(e => {
    log.error(e.stack);
    return res.status(500).send({
      error: "Order failed to retrieved: "+e.message
    });
    next(e);
  });
}


exports.createOrder = function(req, res, next) {
  console.log('createOrder')
  if (!req.body.user_id || !req.body.category) {
    return res.status(400).send({
      "status":false, "message": "Request body is missing required properties"
    });
  }
  var userId = req.body.user_id;
  var cat = req.body.category;

  // INSERT INTO nuggetdb.Order SET user_id='10002',category='resume'
  Promise = order_model.createOrder(userId, cat);
  Promise.then(function(response) {
    return res.status(200).send({
      "status":true, "message": response
    });
  }).catch(e => {
    log.error(e.stack);
    return res.status(500).send({
      error: "Failed to create order"+e.message
    });
    next(e);
  });
}


exports.createRevision = function(req, res, next) {
  console.log('createRevision')
  if (!req.body.order_id || !req.body.user_id) {
    return res.status(400).send({
      "status":false, "message": "Request body is missing required properties"
    });
  }
  var body = req.body;
  // INSERT INTO nuggetdb.Order SET user_id='10002',category='resume'
  Promise = order_model.createRevision(body);
  Promise.then(function(response) {
    console.log(response)
    return res.status(200).send({
      "status":true, "message": response
    });
  }).catch(e => {
    log.error(e.stack);
    return res.status(500).send({
      error: "Failed to create revision: "+e.message
    });
    next(e);
  });
}


exports.getRevisionById = function(req, res, next) {
  console.log('getRevisionById')
  if (!req.params.id) {
    return res.status(400).send({
      "status":false, "message": "Missing revision id param"
    });
  }
  var rid = req.params.id;
  // INSERT INTO nuggetdb.Order SET user_id='10002',category='resume'
  Promise = order_model.getRevisionById(rid);
  Promise.then(function(response) {
    return res.status(200).send({
      "status":true, "message": response
    });
  }).catch(e => {
    log.error(e.stack);
    return res.status(500).send({
      error: "Failed to create revision: "+e.message
    });
    next(e);
  });
}


exports.updateRevisionStatus = function(req, res, next) {
  console.log('updateRevisionStatus')
  if (!req.params.id || !req.params.status) {
    return res.status(400).send({ error: "Bad Request - Invalid rows parameter" })
    return;
  }
  var revisionId = req.params.id;
  var status = req.params.status;

  order_model.getRevisionById(revisionId).then(function(result){
    if (result && Object.keys(result).length > 0 ) {
      return order_model.updateRevisionStatus(revisionId, status)
    } else {
      return res.status(404).send({ error: "Revision not found" })
      return;
    }
  }).then(function(response) {
    return res.status(200).send({
      "status":true, "message": response
    });
  }).catch(e => {
    log.error(e.stack);
    return res.status(e.status || 500).send({
      error: "Failed to update revision status: "+e.message
    });
    next(e);
  });
}

exports.createOrderHistory = function(req, res, next) {
  console.log('createOrderHistory')
  if (!req.body.order_id || !req.body.user_id) {
    return res.status(400).send({
      "status":false, "message": "Request body is missing required properties"
    });
  }
  var body = req.body;
  Promise = order_model.createOrderHistory(body);
  Promise.then(function(response) {
    console.log('then function')
    console.log(response)
    return res.status(200).send({
      "status":true, "message": response
    });
  }).catch(e => {
    log.error(e.stack);
    return res.status(500).send({
      error: "Failed to create order history: "+e.message
    });
    next(e);
  });
}
