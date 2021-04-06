const User=require('../models/user'); 

const authenticateUser = (user, pwd) => {
 return User.findOne({
    username: user, 
   password: pwd,
  })
}
