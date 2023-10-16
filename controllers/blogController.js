const { validationResult } = require('express-validator');
const userInputsModel = require('../models/userInputsModel') ;
const session = require('express-session') ;

const blogController = {
    home : (req , res) => {
        res.render('home') ;
    } ,
    login : (req , res) => {
        res.render('login') ;
    } ,
    register : (req , res) => {
        res.render('register' , {errorMessageConfirmation : ''}) ;
    } ,

    //* Login new user
    loginAuthentication : async (req , res) => {
        const { email , password } = req.body ;
        const errors = validationResult(req) ;
        if ( !errors.isEmpty() ) {
            res.redirect('/login') ;
        }
        else {
            const userExists = await userInputsModel.find({email : email , password : password}) ;
            if ( userExists.length == 1 ) {
                if ( userExists[0].role == 'admin' ) {
                    req.session.user = userExists[0];
                    req.session.authorized = true;
                    res.redirect('/dashboard') ;
                } 
                else {
                    if ( userExists[0].status == 'blocked' ) {
                        res.redirect('/login') ;
                    }
                    else {
                        req.session.user = userExists[0];
                        req.session.authorized = true;
                        res.redirect('/user/dashboard') ;
                    }  
                }
            }
            else {
                res.redirect('/login') ;
            }
        }
    } ,
    
    //* Register new user 
    registerAuthentication : async (req , res) => {
        const { full_name , email , password , confirm_password } = req.body ;
        const errors = validationResult(req) ;
        if ( !errors.isEmpty() ) {
            res.redirect('/register') ;   
        }
        else {
            try {
                if (password != confirm_password) {
                    res.render('register', { errorMessageConfirmation: 'The password not confirmed' });
                }
                else {
                    const userExists = await userInputsModel.find({email : email}) ;
                    if ( userExists.length == 0 ) {
                        const newUser = await userInputsModel.create({
                            full_name : full_name ,
                            email : email ,
                            password : password ,
                        }) ;
                        res.redirect('/login') ;
                    }
                    else {
                        res.redirect('/register') ;
                    }
                }
            }
            catch (error) {
                res.status(200).json({ error: 'catch error' });
            } 
        }
        
    } ,
}

module.exports = blogController ;
