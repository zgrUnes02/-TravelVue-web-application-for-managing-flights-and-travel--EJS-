const session = require('express-session') ;
const { validationResult } = require('express-validator');
const userInputsModel = require('../models/userInputsModel') ;
const travelModel = require('../models/travelModel') ;
const pivotModel = require('../models/pivotModel') ;

const dashboardController = {

    //* Go to the profile
    profile : (req , res) => {
        res.render('insideBlog/profile' , {user : req.session.user}) ;
    } ,

    //* Go to the dashboard
    dashboard : (req , res) => {
        res.render('insideBlog/dashboard' , {user : req.session.user}) ;
    } ,

    //* Change profile information 
    changeProfileInfo : async (req , res) => {
        const { full_name , email , changeInfo , current_password , new_password , confirm_password } = req.body ;
        try {
            //* Check if request from the information form 
            if ( changeInfo == 'information' ) {
                //* Change user name and email
                const userNeedUpdate = await userInputsModel.findOne({email : email}) ;
                await userInputsModel.findByIdAndUpdate(req.session.user._id , {
                    full_name : full_name ,
                    email : email , 
                }) ;
                res.redirect('/logout') ;
            }
            //* Check if request from the change password form
            else if ( changeInfo == 'password' ) {
                //* Change password
                if ( current_password == req.session.user.password ) {
                    const userNeedUpdate = await userInputsModel.findOne({email : req.session.user.email}) ;
                    const updatedUser =  await userInputsModel.findByIdAndUpdate(userNeedUpdate._id , {
                        full_name : userNeedUpdate.full_name ,
                        email : userNeedUpdate.email ,
                        password : new_password , 
                    }) ;
                    res.redirect('/logout') ;
                }
                else {
                    res.redirect('/profile') ;
                }
            }
        }
        catch ( error ) {
            res.redirect('/profile') ;
        }
    } ,

    //* Go to flights page
    flights : async (req , res) => {
        const flights = await travelModel.find({}) ;
        res.render('insideBlog/flights' , {user : req.session.user , flights : flights}) ;
    } ,

    //* Go to users page
    users : async (req , res) => {
        const id = req.session.user._id ;
        try {
            const users = await userInputsModel.find({ _id: { $ne: id } });
            res.render('insideBlog/users', { user: req.session.user, users: users }) ;
        }
        catch ( error ) {
            res.redirect('/dashboard') ;
        }
    } ,

    //* Requests of an user
    requestOfUser : async (req , res) => {
        try {
            const { id } = req.params
            const requests = await pivotModel.find({user_id : id}) ;
            const flights = [] ;
            requests.map(request => flights.push(request.flight_id)) ;
            const requestsOfTheUser = await travelModel.find({_id : {$in : flights}}) ;
            res.send(requestsOfTheUser)
        }
        catch ( error ) {
            res.send(error) ;
        }
    } ,

    //* Go to request page
    requests : async (req , res) => {
        const requests = await pivotModel.find({}) ;
        res.render('insideBlog/requests' , {user : req.session.user}) ;
    } ,

    //* Log out from the application
    logout : (req , res) => {
        req.session.destroy() ;
        res.redirect('/') ;
    } ,
}

module.exports = dashboardController ;
