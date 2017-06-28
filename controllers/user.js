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
