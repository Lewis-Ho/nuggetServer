var path = require('path'),
    log = require('winston'),
    Promise = require("bluebird"),
    config = require(path.join(__dirname, '..', 'config', 'config.json')),
    user_model = require(path.join(__dirname, '..',  'models', 'user_model')),
    mailer   = require("mailer");

// SEND - should take only receiver, senter email, email type
//        pull email template based on tpye to dynamically generate emails



exports.sendOrderConfirmationEmail = function(req, res, next) {
  console.log('sendOrderConfirmationEmail')
  console.log(req.body.receiver)
  if (!req.body) {
    return res.status(400).send({
      "status":false, "message": "Request body is missing required properties"
    });
  }
  var body = req.body;
  mailer.send(
      { host:           config["mailchimp"].host
      , port:           587
      , to:             req.body.receiver
      , from:           config["mailchimp"].sender
      , subject:        "Order confirmed!"
      , body:           "Your order has been confirmed"
      , authentication: "login"
      , username:       config["mailchimp"].userName
      , password:       config["mailchimp"].password
      }, function(err, result){
        if(err){
          console.log(err);
          return res.status(500).send({
            error: "Failed to send mail: "+err.message
          });
          next(e);
        } else {
          return res.status(200).send({
            "status":true, "message": "email sent"
          });
        }
      }
    );

    // SHOULD UPDATE ORDER CONFIRMATION TABLE TO EMAIL SENT
}


exports.sendOrderCompletedEmail = function(req, res, next) {
  console.log('sendOrderCompletedEmail')
  if (!req.body || !req.body.userId || !req.body.url) {
    return res.status(400).send({
      "status":false, "message": "Request body is missing required properties"
    });
  }

  console.log(req.body)

  user_model.getUserById(req.body.userId).then(function(response) {
    console.log(response)
    if (!response) {
      return res.status(400).send({
        "status":false, "message": "User not found"
      });
    } else {
      mailer.send(
        { host:           config["mailchimp"].host
        , port:           587
        , to:             response.email
        , from:           config["mailchimp"].sender
        , subject:        "Reviewed!"
        , body:           "Your order has been reviewed by our editors. Please go to '+body.url+' to review."
        , authentication: "login"
        , username:       config["mailchimp"].userName
        , password:       config["mailchimp"].password
        }, function(err, result){
          if(err){
            console.log(err);
            return res.status(500).send({
              error: "Failed to send mail: "+err.message
            });
            next(e);
          } else {
            return res.status(200).send({
              "status":true, "message": "email sent"
            });
          }
        }
      );
    }
  }).catch(e => {
    log.error(e.stack);
    return res.status(500).send({
      error: "Order failed to retrieved: "+e.message
    });
    next(e);
  });

    // SHOULD UPDATE ORDER CONFIRMATION TABLE TO EMAIL SENT
}


exports.sendAdminOrderAlert = function(req, res, next) {
  console.log('sendAdminOrderAlert')
  if (!req.body.receiver) {
    res.status(400).send({
      "status":false, "message": "Request body is missing receiver email"
    });
  }
  if (!req.body.fileUrl) {
    res.status(400).send({
      "status":false, "message": "Request body is missing file download url"
    });
  }
  var body = req.body;
  mailer.send(
    { host:           config["mailchimp"].host
    , port:           587
    , to:             req.body.receiver
    , from:           config["mailchimp"].sender
    , subject:        "Order confirmed!"
    , body:           "New Order just came in. Download URL: " + body.fileUrl
    , authentication: "login"
    , username:       config["mailchimp"].userName
    , password:       config["mailchimp"].password
    }, function(err, result){
        if(err){
          console.log(err);
          res.status(500).send({
            error: "Failed to send mail: "+err.message
          });
          next(e);
        } else {
          res.status(200).send({
            "status":true, "message": "email sent"
          });
        }
      }
    );

    // SHOULD UPDATE ORDER CONFIRMATION TABLE TO EMAIL SENT
}
