const mongoose = require('mongoose');
const User=mongoose.model('User', { 
    
    username: String, 
    password: String,
     restaurent: [
         {
         name:String,
         place:String
     }
    ]
     });
     module.exports=User