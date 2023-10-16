const mongoose = require('mongoose') ;

const schemaTravel = new mongoose.Schema({
    country : {
        type : String ,
        required : [true , 'the country is required'] ,
    } ,
    city : {
        type : String , 
        required : [true , 'the city is required'] ,
    } ,
    startDate : {
        type : Date ,
        required : [true , 'the date is required'] ,
    } ,
    startTime : {
        type : String ,
        required : [true , 'the date is required'] ,
    } ,
    duration : {
        type : Number ,
        required : [true , 'the duration is required'] ,
    }
} , { timestamps : true }) ;

const travelModel = mongoose.model('travels' , schemaTravel) ; 
module.exports = travelModel ;
