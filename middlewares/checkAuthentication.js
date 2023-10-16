const session = require('express-session') ;

const checkAuthentication = (req , res , next) => {
    if ( req.session.authorized ) {
        next() ;
    }
    else {
        res.redirect('/login') ;
    }
}

module.exports = checkAuthentication ;
