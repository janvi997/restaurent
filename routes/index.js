var express = require('express');
var router = express.Router();
const jwt=require("jsonwebtoken");
var resservice=require('../services/resservice');
const { request } = require('express');
const jwtsec="janvi12345";
const authMiddleware=(req, res, next)=>{
try{
  const token=req.headers.authorization.split(" ")[1];
  const user=jwt.verify(token,jwtsec);
  req.user=user;
  next()
}
  catch{
    res.status(401).send({message:"invalid token"});
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/login', function(req, res) {
 
  
  const result=resservice.authenticateUser(req.body.username,req.body.password)
  .then(user=>{
    if(user){
    const token = jwt.sign({
      exp:Math.floor(Date.now()/1000)+(60*60*5),
      username:req.body.username,
      _id:user._id
    },jwtsec);
    
    res.send({message:"logged in",
         token:token
        });
  }
    else{
    res.status(422).send({message:"invalid credentials"});
    //res.render('index', { title: 'Express' });
  
  }
  }); 
})
  

module.exports = router;
