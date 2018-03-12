const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = reauire('express-session')
const morgan = require('morgan')

const app = express()

app.use(mogan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(session({
    key : 'user_sid',
    secret: 'sk&iNJ21Jdkfs@',
    resave: false,
    saveUnitialized: false,
    cookie:{
        express: 600000
    }
}))

app.use((req,res,next) => {
    if(req.cookies.user_sid && !req.session.user){
        res.clearCookie('user_sid')
    }
    next()
})

var sessionChecker  = (req, res, next) => {
    if(req.session.user && req.cookies.user_sid){
        next()
    } else { 
        res.redirect('/login');
    }
}



app.listen(3000, () => console.log('Listening on port 3000'))