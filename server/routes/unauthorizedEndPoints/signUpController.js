const express = require('express');
const router = express.Router();
const User = require('../../services/User');
const passwordValidator = require('password-validator');
const Cryptr = require('cryptr');
 var schema = new passwordValidator();
schema.is().min(8).is().max(20).has().uppercase().has().lowercase().has().digits().has().not().spaces().is().not().oneOf(['Passw0rd', 'Password123']);
const cryptr = new Cryptr('myTotalySecretKey');



router.post('/user', function(req, response) {
  if (
    req.body.name &&
    req.body.password &&
    req.body.email
  ) {
    var statusPass = schema.validate(req.body.password);
    if(statusPass === true)
    {
    
      User.retrieveUser(
        {email: req.body.email.toLowerCase().trim()},
        function(err, successData) {
          if (err) {
            response.status(500).send({
              message:
                err.message || "Some error occurred while creating key."
            });
          } else if(successData) {
            result = {
              status: false,
              message: 'User exists'
            };
            response.send(result);
            response.end;
          }
          else{
            var userData = {
              name: req.body.name.trim(),
              password: cryptr.encrypt(req.body.password.trim()),
              email: req.body.email.toLowerCase().trim()
            };
            User.createUser(
              userData,
              function(err, successData) {
                if (err) {
                  response.status(500).send({
                    message:
                      err.message || "Some error occurred while creating key."
                  });
                } else if(successData) {
                  result = {
                    status: true,
                    message: 'Signup successfully',
                    data: successData
                  };
                  response.send(result);
                  response.end;
                }
                else{
                  result = {
                    status: false,
                    message: 'Oops! Something went wrong'
                  };
                  response.send(result);
                  response.end;
                }
              }
            )
          }
        }
      )
    }
      else{
        result = {
          status: false,
          message: 'Password not in format'
        };
        response.send(result);
        response.end;
      }
          }
          else{
            result = {
              status: false,
              message: 'server not get proper formatted request'
            };
            response.send(result);
            response.end;
          }
       
});
module.exports = router;