const express = require('express') ;
const blogController = require('../controllers/blogController');
const blogRouter = express.Router() ;
const { body , validationResult } = require('express-validator') ;
const checkSessionExists = require('../middlewares/checkSessionExists.js') ;

blogRouter.get('/' , checkSessionExists , blogController.home) ;

//* Redirect to login interface
blogRouter.get('/login' , checkSessionExists , blogController.login) ;

//* Send input values to check it and login the user  
blogRouter.post('/login/authentication' , [
    body('email').trim().notEmpty().withMessage('The email field is required') ,
    body('password').trim().notEmpty().withMessage('The password field is required') ,
] , blogController.loginAuthentication) ;

//* Redirect to register interface
blogRouter.get('/register' , checkSessionExists , blogController.register) ;

//* Send input values to check it and register a new user  
blogRouter.post('/register/authentication' , [
    body('full_name').trim().notEmpty().withMessage('The full name field is required') ,
    body('email').trim().notEmpty().withMessage('The email field is required') ,
    body('password').trim().notEmpty().withMessage('The password field is required') ,
    body('confirm_password').trim().notEmpty().withMessage('The confirmation password field is required') ,
] , blogController.registerAuthentication) ;

module.exports = blogRouter ;
