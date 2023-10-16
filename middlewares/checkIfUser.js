const checkIfUser = (req , res , next) => {
    if ( req.session.user.role == 'user' ) {
        next() ;
    }
    else {
        res.redirect('/dashboard') ;
    }
}

module.exports = checkIfUser ;
