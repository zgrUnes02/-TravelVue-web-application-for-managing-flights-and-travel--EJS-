const travelModel = require('../models/travelModel') ;

const flightsController = {
    //* Just show the form for creating a new flight
    formCreate : (req , res) => {
        res.render('insideBlog/flightsCreate' , {user : req.session.user}) ;
    } ,

    //* Add the new flight in database
    createFlight : async (req, res) =>  {
        const { country , city , startDate , startTime , duration } = req.body ;
        try {
            await travelModel.create({
                country : country , 
                city : city ,
                startDate : startDate ,
                startTime : startTime ,
                duration : duration ,
            }) ;
            res.redirect('/flight/form/create') ;
        }
        catch ( error ) {
            res.redirect('/flights') ;
        }
    } ,

    //* Delete the flight
    deleteFlight : async (req , res) => {
        const { id } = req.params ;
        try {
            await travelModel.findByIdAndDelete(id) ;
            res.redirect('/flights') ;
        }
        catch ( error ) {
            res.redirect('/flights') ;
        }
    } , 

    //* Show the form for editing the flight
    editFlight : async (req , res) => {
        const { id } = req.params ;
        try {
           const flightWantToUpdate = await travelModel.find({_id : id}) ;
            if ( flightWantToUpdate.length != 0 ) {
                res.render('insideBlog/flightsEdit' , {user : req.session.user , flight : flightWantToUpdate[0]}) ;
            } 
        }
        catch ( error ) {
            res.redirect('/flights') ;
        }
    } ,

    //* Update the flight in database 
    updateFlight : async (req , res) => {
        const { id , country , city , startDate , startTime , duration } = req.body ;
        try {
            await travelModel.findByIdAndUpdate(id , {
                country : country ,
                city : city ,
                startDate : startDate ,
                startTime : startTime ,
                duration : duration
            }) ;
            res.redirect('/flights') ;
        }
        catch ( error ) {
            res.redirect('/flights') ;
        }
    }
}

module.exports = flightsController ;
