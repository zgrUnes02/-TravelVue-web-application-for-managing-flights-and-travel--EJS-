const express = require('express') ;
const dashboardController = require('../controllers/dashboardController.js') ;
const flightsController = require('../controllers/flightsController.js') ;
const dashboardRouter = express.Router() ;

//* Middlewares
const checkAuthentication = require('../middlewares/checkAuthentication.js') ;
const checkIfAdmin = require('../middlewares/checkIfAdmin.js') ;

//* Dashboard routes
dashboardRouter.get('/profile' , checkAuthentication , dashboardController.profile) ;
dashboardRouter.get('/dashboard' , checkAuthentication , checkIfAdmin , dashboardController.dashboard) ;
dashboardRouter.get('/logout' , checkAuthentication , dashboardController.logout) ;
dashboardRouter.post('/update/profile' , checkAuthentication , dashboardController.changeProfileInfo) ;
dashboardRouter.get('/users' , checkAuthentication , checkIfAdmin , dashboardController.users) ;
dashboardRouter.get('/requests' , checkAuthentication , checkIfAdmin , dashboardController.requests) ; 

//* Flights routes
dashboardRouter.get('/flights' , checkAuthentication , checkIfAdmin , dashboardController.flights) ;
dashboardRouter.get('/flight/form/create' , checkAuthentication , checkIfAdmin , flightsController.formCreate) ;
dashboardRouter.post('/flight/create' , checkAuthentication , checkIfAdmin , flightsController.createFlight) ;
dashboardRouter.get('/flights/edit/:id' , checkAuthentication , checkIfAdmin , flightsController.editFlight) ;
dashboardRouter.post('/flights/update' , checkAuthentication , checkIfAdmin , flightsController.updateFlight) ;
dashboardRouter.get('/flights/delete/:id' , checkAuthentication , checkIfAdmin , flightsController.deleteFlight) ;

//* Requests routes
dashboardRouter.get('/requests/:id' , dashboardController.requestOfUser) ;

module.exports = dashboardRouter ;
                                     