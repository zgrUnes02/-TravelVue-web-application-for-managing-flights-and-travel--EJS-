const checkIfAdmin = (req , res , next) => {
    if ( req.session.user.role == 'admin' ) {
        next() ;
    }
    else {
        res.redirect('/user/dashboard') ;
    }
}

module.exports = checkIfAdmin ;
