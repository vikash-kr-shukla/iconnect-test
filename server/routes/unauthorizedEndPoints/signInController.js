const express = require('express');
const router = express.Router();
let jwt = require('jsonwebtoken');
const User = require('../../services/User');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

// API for user Login
router.post('/user', function(req, response) {
  if(req.body.email && req.body.password)
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
          var dbPassword=cryptr.decrypt(successData.password)
          if(req.body.password === dbPassword)
          {
            let token = jwt.sign({successData}, global.tokenConfig.secretKey, {
              algorithm: global.tokenConfig.algorithm,
              expiresIn: '2m'
              });
            result = {
              status: true,
              message: 'Login Successfully',
             token: token
            };
            response.send(result);
            response.end;
          }
          else{
            var result = {
              status: false,
              message: 'No Data Found'
            };
            response.send(result);
            response.end;
          }
         
        }
        else{
          var result = {
            status: false,
            message: 'No Data Found'
          };
          response.send(result);
          response.end;
        }
      }
    )
}
  else
  {
    result = {
      status: false,
      message: 'server not get proper formatted request'
    };
    response.send(result);
    response.end;
  }
});
module.exports = router;