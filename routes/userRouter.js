const express = require('express') ;
const userController = require('../controllers/userController');
const userRouter = express.Router() ;
const checkIfAdmin = require('../middlewares/checkIfAdmin') ;

//* Middlewares 
const checkAuthentication = require('../middlewares/checkAuthentication') ;
const checkIfUser = require('../middlewares/checkIfUser') ;

//* Routes
userRouter.get('/user/dashboard' , checkAuthentication , checkIfUser , userController.userDashboard) ;
userRouter.get('/user/flights' , checkAuthentication , checkIfUser , userController.userFlights) ;
userRouter.get('/user/change/status/:id' , checkAuthentication , checkIfAdmin , userController.changeUserStatus) ;
userRouter.get('/user/add/flight/:id' , checkAuthentication , checkIfUser , userController.addFlightToUser) ;
userRouter.get('/user/flight/delete/:id' , checkAuthentication , checkIfUser , userController.deleteUserFlight) ;

module.exports = userRouter ;
