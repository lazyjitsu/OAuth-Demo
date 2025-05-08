const express = require('express')
const https = require('https');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');
const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');



require('dotenv').configure();

PORT = 2000;
const AUTH_OPTIONS = {
    callbackURL: '/auth/google/callback',
    clientId: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET
}

function verifyCallback(accessToken, refreshToken, profile, done) {
    console.log('Google profile',profile, 'access token: ',accessToken);

    // if the credentials are valid, call done. if something goes wrong, we can pass an error
    // we are passing in null. the user data is just the profile
    done(null,profile); //passport knows u are logged in now
}
passport.use(new Strategy(AUTH_OPTIONS), verifyCallback);

const app = express();

const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET
}

app.use(helmet());
// 
app.use(passport.initialize())
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
    scope: []
}))

// this callback encompasses steps 4,5 & 6 of the OAuth Authorization Code flow!
// 4. Authorization Code Response
// 5. Send authorization code + client secret to /token
// 6. Access token (and optionally Refresh Token)

app.get('/auth/google/callback',passport.authenticate('google', {
        // what happens if we fail or succeed
        failureRedirect: '/failure',
        successRedirect: '/',
        session:false,
    }),
    (req, res) => { // do something addional when google calls us back
        console.log('google called us bak!!')
})

app.get('/auth/logout',(req,res) => {
    
})

app.get('/secret',checkLoggedIn,(req,res) => {
    res.send("Your secret is <b>Dragon</b>")
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