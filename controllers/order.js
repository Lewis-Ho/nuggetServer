var path = require('path'),
    order_model = require(path.join(__dirname, '..',  'models', 'order_model'));

exports.get = function(req, res, next) {
  var order_number = req.params.order_number;
  try {
      promise = order_model.get(order_number);
      
      promise.then(function(response) {
         res.send(200, {status:true, message: response.data});
      }).fail(function(response) {
           res.send(400, {
              error: "Order failed to retrieved"
           });
      });
  } catch (error) {
    log.error(error.stack);
    res.send(500, {
      error: "Order failed to retrieved"
    });
    next(error);
  }
}

exports.cancel =  function(req, res, next) {
    var order_number = req.params.order_number;
    try {
        promise = order_model.cancelOrder(order_number);
        promise.then(function(response) {

           res.send(200, {status:true, message:"Order number "+order_number+" was cancelled"});

        }).fail(function(response) {
             res.send(400, {
                error: "Order could not be cancelled"
             });
        });
    }catch (error) {
      log.error(error.stack);
      res.send(500, {
        error:   "Order could not be cancelled"
      });
      next(error);
   }
}
