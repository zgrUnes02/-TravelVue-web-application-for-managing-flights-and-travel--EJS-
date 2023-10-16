const mongoose = require('mongoose') ;

const schemaUser = new mongoose.Schema({
    full_name : {
        type : String ,
        required : [true , 'the full name is required'] ,
    } ,
    email : {
        type : String ,
        required : [true , 'the email is required'] ,
    } ,
    password : {
        type : String ,
        required : [true , 'the password is required'] ,
    } ,
    role : {
        type : String ,
        default : 'user' ,
    } ,
    status : {
        type : String ,
        default : 'active' ,
    } ,
} , { timestamps : true }) ;

const userInputsModel = mongoose.model('usersInputs' , schemaUser) ;
module.exports = userInputsModel ;
