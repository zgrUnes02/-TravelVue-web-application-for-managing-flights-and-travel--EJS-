const session = require('express-session') ;

const checkSessionExists = (req , res , next) => {
    if ( req.session.authorized ) {
        res.redirect('/dashboard') ;
    }
    else {
        next() ;
    }
}

module.exports = checkSessionExists ;
