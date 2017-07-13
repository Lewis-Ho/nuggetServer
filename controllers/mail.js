var path = require('path'),
    log = require('winston'),
    Promise = require("bluebird"),
    mailer   = require("mailer");

// SEND - should take only receiver, senter email, email type
//        pull email template based on tpye to dynamically generate emails



exports.sendOrderConfirmationEmail = function(req, res, next) {
  console.log('sendOrderConfirmationEmail')
  if (!req.body) {
    res.status(400).send({
      "status":false, "message": "Request body is missing required properties"
    });
  }
  var body = req.body;
  mailer.send(
      { host:           "smtp.mandrillapp.com"
      , port:           587
      , to:             body.receiver
      , from:           "test@sagerize.com"
      , subject:        "Order confirmed!"
      , body:           "Your order has been confirmed"
      , authentication: "login"
      , username:       'College Nugget'
      , password:       'lOPdP18mRD-IDFhdIu87eg'//uses api key as password
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
      { host:           "smtp.mandrillapp.com"
      , port:           587
      , to:             body.receiver
      , from:           "test@sagerize.com"
      , subject:        "Reviewed!"
      , body:           "Your order has been reviewed by our editors. Please go to '+body.url+' to review."
      , authentication: "login"
      , username:       'College Nugget'
      , password:       'lOPdP18mRD-IDFhdIu87eg'//uses api key as password
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
    { host:           "smtp.mandrillapp.com"
    , port:           587
    , to:             body.receiver
    , from:           "test@sagerize.com"
    , subject:        "Order confirmed!"
    , body:           "New Order just came in. Download URL: " + body.fileUrl
    , authentication: "login"
    , username:       'College Nugget'
    , password:       'lOPdP18mRD-IDFhdIu87eg'//uses api key as password
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
