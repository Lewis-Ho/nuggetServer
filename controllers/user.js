var path = require('path'),
    log = require('winston'),
    Promise = require("bluebird"),
    user_model = require(path.join(__dirname, '..',  'models', 'user_model'));


exports.createUser = function(req, res, next) {
  console.log('createOrder')
  if (!req.body.first_name || !req.body.last_name) {
    res.status(400).send({
      "status":false, "message": "Request body is missing required properties"
    });
  }
  var body = req.body;
  try {
      Promise = user_model.createUser(body);
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

exports.getUserById = function(req, res, next) {
  if (!req.params.uid) {
    return res.status(400).send({
      "status":false, "message": "Missing user id"
    });
  }
  var uid = req.params.uid;
  Promise = user_model.getUserById(uid);
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


exports.updateUserCredit = function(req, res, next) {
  if (!req.body.user_id) {
    res.status(400).send({
      "status":false, "message": "Missing user id"
    });
  }
  var uid = req.params.uid;
  try {
      Promise = user_model.updateUserCredit(uid);
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
