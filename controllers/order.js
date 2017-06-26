var path = require('path'),
    log = require('winston'),
    Promise = require("bluebird"),
    order_model = require(path.join(__dirname, '..',  'models', 'order_model'));

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
