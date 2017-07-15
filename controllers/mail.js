var path = require('path'),
    log = require('winston'),
    Promise = require("bluebird"),
    config = require(path.join(__dirname, '..', 'config', 'config.json')),
    mailer   = require("mailer");

// SEND - should take only receiver, senter email, email type
//        pull email template based on tpye to dynamically generate emails



exports.sendOrderConfirmationEmail = function(req, res, next) {
  console.log('sendOrderConfirmationEmail')
  console.log(req.body.receiver)
  if (!req.body) {
    res.status(400).send({
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


exports.sendOrderCompletedEmail = function(req, res, next) {
  console.log('sendOrderCompletedEmail')
  if (!req.body) {
    res.status(400).send({
      "status":false, "message": "Request body is missing required properties"
    });
  }
  var body = req.body;
  mailer.send(
    { host:           config["mailchimp"].host
    , port:           587
    , to:             req.body.receiver
    , from:           config["mailchimp"].sender
    , subject:        "Reviewed!"
    , body:           "Your order has been reviewed by our editors. Please go to '+body.url+' to review."
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
