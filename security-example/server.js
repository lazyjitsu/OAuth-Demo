const express = require('express')
const https = require('https');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');
const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const cookieSession = require('cookie-session');

PORT = 2000;

require('dotenv').config();

const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    COOKIE_KEY_1: process.env.COOKIE_KEY_1,
    COOKIE_KEY_2: process.env.COOKIE_KEY_2,
}

const AUTH_OPTIONS = {
    callbackURL: '/auth/google/callback',
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET
}

function verifyCallback(accessToken, refreshToken, profile, done) {
    console.log('Google profile',profile, 'access token: ',accessToken);
    // if the credentials are valid, call done. if something goes wrong, we can pass an error
    // we are passing in null. the user data is just the profile
    done(null,profile); //passport knows u are logged in now
}
console.log('AUTH_OPTIONS',AUTH_OPTIONS);
passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

// Save the session to cookie
passport.serializeUser((user,done) => {
    done(null,user.id) // we are just saving the user id to the cookie
})

// Read the session from cookie
passport.deserializeUser((obj,done) => {
    done(null,obj)
})
const app = express();

app.use(helmet());
// session needs to be initialized before passport.initalize uses it
app.use(cookieSession({
    name: 'session-salad',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    // keys are the list of values we use to keep cookie secure; to encrypt the cookie
    keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2],
}))
app.use(passport.initialize())
// .session() authenticates the session that is passed in to server using our keys
app.use(passport.session()) // will allow deserealization of the user object i.e deserialize the cookie
function checkLoggedIn(erq, res, next) {
    const isLoggedIn = true; //Todo
    if (!isLoggedIn) {
        return res.stats(401).json({
            error: 'You must be logged in'
        })
    }
    next();
}

// login w/ identity provider google
app.get('/auth/google',passport.authenticate('google', {
    scope: ['email'] // what we want to get back from google
}))

// this callback encompasses steps 4,5 & 6 of the OAuth Authorization Code flow!
// 4. Authorization Code Response
// 5. Send authorization code + client secret to /token
// 6. Access token (and optionally Refresh Token)

app.get('/auth/google/callback',passport.authenticate('google', {
        // what happens if we fail or succeed
        failureRedirect: '/failure',
        successRedirect: '/',
        session:true,
    }),
    (req, res) => { // do something addional when google calls us back
        console.log('google called us bak!!')
})

app.get('/auth/logout',(req,res) => {
    
})
// we could pass in as many functions as we want such as:
// app.get('/secret',checkLoggedIn,checkPermissions,(req,res) ....
// and all requests made for /secret would have to pass both those middlewares before
//  node will run them in order and finally return the response

app.get('/secret',checkLoggedIn,(req,res) => {
    res.send("Your secret is <b>Dragons</b>")
})
app.get('/failure',(req,res) => {
    return res.send('Failed to login bro!')
})
app.get('/',(req,res) => {
    // res.send("What up");
    res.sendFile(path.join(__dirname,'public','index.html'))
    console.log("hit")
});


const server = https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
},app);

server.listen(PORT,() => {
    console.log(`Listening on ${PORT}`)
})