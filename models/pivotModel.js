const mongoose = require('mongoose') ;

const schemaPivotModel = new mongoose.Schema({
    user_id : {
        type : String ,
        required : [true , 'the user_id is required'] ,
    } ,
    flight_id : {
        type : String ,
        required : [true , 'the flight_id is required'] ,
    } ,
} , { timestamps : true }) ;

const pivotModel = mongoose.model('usersAndFlights' , schemaPivotModel) ;
module.exports = pivotModel ;
