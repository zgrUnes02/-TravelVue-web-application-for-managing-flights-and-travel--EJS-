const express = require('express') ;
const dotenv = require('dotenv').config() ;
const port = process.env.PORT || 4001 ;
const app = express() ;
const EmitterEvent = require('node:events') ;
const blogRouter = require('./routes/blogRouter') ;
const emitter = new EmitterEvent() ;
const mongoose =require('mongoose') ;
const xss = require('xss-clean') ;
const dashboardRouter = require('./routes/dashboardRouter') ;
const userRouter = require('./routes/userRouter') ;
const session = require('express-session') ;
const cookieParser = require('cookie-parser') ;

//* Connect blog with database with mongoose library
mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log('The connection with database has been approved with success.')
})
.catch((error) => {
    console.log('There is an error' , error) ;
})

//* Cookie parser
app.use(cookieParser('secret')) ;

//* Use middleware
app.use(session({
    secret : 'hi' ,
    cookie : {
        maxAge : 10000000 ,
        sameSite : 'strict' ,
        secure : false ,
    } ,
    saveUninitialized : true ,
})) ;

app.use(xss()) ;
app.use(express.urlencoded({extended : false})) ;
app.set('view engine' , 'ejs') ;
app.use(express.static(__dirname + '/public')) ;

//* Routes
app.use(blogRouter) ;
app.use(dashboardRouter) ;
app.use(userRouter) ;

emitter.on('serverIsRunningWithSuccess' , (port) => {
    console.log(`The server is running on http://localhost:${port}`) ;
}) ;

app.listen(port , emitter.emit('serverIsRunningWithSuccess' , port)) ;
