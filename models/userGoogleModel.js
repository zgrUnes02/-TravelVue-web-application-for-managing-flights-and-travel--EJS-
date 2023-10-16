const mongoose = require('mongoose') ;

const schemaUser = new mongoose.Schema({
    full_name : {
        type : String ,
        required : [true , 'the full name is required'] ,
    } ,
    id : {
        type : String ,
    } ,
} , { timestamps : true }) ;

const userGoogleModel = mongoose.model('usersInputs' , schemaUser) ;
module.exports = userGoogleModel ;
