const mongoose = require('mongoose');


// schema for the login page
//required true bcz googleauth is the only option that is being provided

const UserSchema = new mongoose.Schema({
    googleID: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    }
  
});

//Create collection and add schema
const User=mongoose.model('users', UserSchema);
module.exports=User;
