const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true , "Please add the username"]
    },
    email : {
        type : String ,
        required : [true , "Please add tje user email address"],
        unique : [true , "Email address alreay registered."]
    },
    password : {
        type : String,
        required : [true , "Please add the user password"]
    }

},{
    timestamps : true
});

module.exports =mongoose.model('user' , userSchema);