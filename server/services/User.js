const User = require('../models/UserSchema');
       
async function createUser(reqData, callback) {
  const createFn = await  User.create(reqData)
    .then(successData => {
      callback(null, successData)
      })
      .catch(err => {
          return callback(err)
      }); 
  }



  async function retrieveUser(roleDataQry, callback){
    console.log("Query", roleDataQry)
    const retrieveFn =
     await User.findOne(
      roleDataQry
      )
    .then(successData => {
    callback(null, successData)
      })
      .catch(err => {
          return callback(err)
      }); 
  }
  
   module.exports.createUser = createUser;
   module.exports.retrieveUser = retrieveUser;