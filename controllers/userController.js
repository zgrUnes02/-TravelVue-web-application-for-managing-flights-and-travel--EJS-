const session = require('express-session') ;
const userModel = require('../models/userInputsModel');
const travelModel = require('../models/travelModel') ;
const pivotModel = require('../models/pivotModel') ;

const userController = {
    
    //* Send user to his dashboard
    userDashboard : async (req , res) => {
        try {
            const flights = await travelModel.find({}) ;
            res.render('insideBlog/users/index' , {user : req.session.user , flights : flights}) ;
        }
        catch ( error ) {
            console.log(error) ;
        }
    } ,

    //* Send flights page ( The flights that the user chose ) 
    userFlights : async (req , res) => {
        try {
            //* Find the flights where user is the authenticated user
            const allFlights = await pivotModel.find({user_id : req.session.user._id}) ;

            //* Get just the IDs
            const flightsIds = allFlights.map(flight => flight.flight_id) ;

            //* Find the flights where
            const flights = await travelModel.find({_id : { $in : flightsIds }}) ;

            //* Finally render the flights page with the flights that the user has chose
            res.render('insideBlog/users/flights' , {user : req.session.user , flights : flights}) ;
        }
        catch ( error ) {
            console.log(error) ;
        }
    } ,

    //* Delete user flight
    deleteUserFlight : async (req , res) => {
        const { id } = req.params ;
        try {
            await pivotModel.deleteOne({flight_id : id}) ;
            res.redirect('/user/flights') ;
        }
        catch ( error ) {
            console.log(error) ;
        }
    } ,

    //* Change the user status ( Blocked or Unblocked )
    changeUserStatus : async (req , res) => {
        try {
            const { id } = req.params ;
            const user = await userModel.findById(id) ;
            if ( user.status == 'active' ) {
                await userModel.findByIdAndUpdate(id , {
                    full_name : user.full_name ,
                    email : user.email ,
                    password : user.password ,
                    role : user.role ,
                    status : 'blocked' ,
                    createdAt: user.createdAt ,
                    updatedAt: user.updatedAt ,
                    __v : user.__v ,
                }) ;
                res.redirect('/users') ;
            }
            else if ( user.status == 'blocked' ) {
                await userModel.findByIdAndUpdate(id , {
                    full_name : user.full_name ,
                    email : user.email ,
                    password : user.password ,
                    role : user.role ,
                    status : 'active' ,
                    createdAt: user.createdAt ,
                    updatedAt: user.updatedAt ,
                    __v : user.__v ,
                }) ;
                res.redirect('/users') ;
            }
            else {
                res.redirect('/users') ;
            }
        }
        catch ( error ) {
            console.log(error) ;
        }
    } ,

    //* Add new flight to the user
    addFlightToUser : async (req , res) => {
        try {
            const { id } = req.params ;
            let exists = false ;

            //* Find the flights that user has chosen
            const allFlights = await pivotModel.find({user_id : req.session.user._id}) ;

            //* Redirect to flights page if flight already exists
            allFlights.map((flight) => {
                if ( flight.flight_id == id ) {
                    exists = true ;
                }
            })

            //* Create the flight if it not exists in user's flights
            if ( !exists ) {
                await pivotModel.create({
                    user_id : req.session.user._id ,
                    flight_id : id ,
                }) ; 
                //* Redirect to user's dashboard
                res.redirect('/user/dashboard') ;
            }
            else {
                //* Redirect to user's dashboard
                res.redirect('/user/dashboard') ;
            }
        }
        catch ( error ) {
            console.log(error) ;
        }
    }
}

module.exports = userController ;
