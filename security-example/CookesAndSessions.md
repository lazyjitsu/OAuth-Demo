## Sessions

This is a topic that is definitely going to come up when you're building a large, authenticated website. 

So what is a session? Sessions are a way of storing data about the current active user. This could be something like the name of a user or what page of a site they last visited.

However, usually public data like a user's name can be stored on the client's side in the browser without worrying about any server side session. Sessions are most often used to store data about the current user who is logged in to our web application in their browser.
There's no reason to keep this data secure.

On the other hand, what should definitely live in a session is data that we wouldn't want the user in their browser to modify. 

So what kinds of data do we NOT want our users to change a user's bank balance, the amount of money they have in their bank account or their permissions to access data in the server?
For this type of information, the client can have access to it. The client can read it.
But if we're a bank, we don't want users setting their own bank balances. That would be a disaster.

This is the data that we most often need sessions for when we want to keep track of state. That shouldn't be changed by the user in their browser directly. Now, if this sounds a lot like what you would use a database for? Well, you're absolutely right.


However, sessions are usually short lived. Sessions captured the state of an application during the time that a user is interacting with it. 

**The data in a session is what is relevant to a user as they're using the application until they quit or log out, whereas the data in a database is more permanent.**

To use another example, if you're on a shopping site.

The current items in your shopping cart might be in a session while your order history might live in a database that persists through many sessions.

The database sticks around regardless of who's logged in or which browser you're using on which machine, whereas sessions tend to be tied to a specific browser and the temporary state of the application on that browser.

##  Server vs Client Side Sessions With Cookies

Sessions are most often used to store data about the current user who is logged in to our web application in their browser.

We store sessions in one of two ways we can have server side sessions where user data lives in the server on a database somewhere, and the data would get looked up for each request that the user makes and potentially deleted if the user logs out or quits their browser.

The alternative is to have a client side session where we store session data in the browser, specifically in the browsers cookies. 

IE Server Cookie stored in DB, Browser Cookie Stored in Session

In fact, cookies are almost always used to implement sessions, although we do things slightly differently in the cookie.

Depending on if we're using this client side session or a server side session to really understand this, let's look back at our cookie based authentication example.

Depending on if we're doing server side sessions or client side sessions, we'll be using cookies in one of two ways.

Will either be using stateful cookies or stateless cookies.

Let's start with stateful cookies.

When using cookies for authentication, once the user authenticated with the server by putting in the correct password, the server responds by setting a cookie that stores this session identifier. This is what's known as a stateful cookie.

Where the cookie value this session ID is just a reference, a pointer to some session information that lives in a database somewhere in the server. So we use these stateful cookies when we're doing server side sessions with state for cookies.

We require a database to store our session data and our server needs to look up the session in that database for the user identified by the Session ID.

This is great if we already have a database and we know really well how to manage data in that database, but it requires an additional request from the server to look up what data is actually stored for this user. And it can be more challenging to scale when you have many users.
And each time you need to look something up, you're doing a read and write to that database, which adds load to your server.

Now, on the other hand, if you're doing stateless cookies and client side sessions, all the session information that you need lives in the client. Already, it's stored in the browser's cookies. Each piece of session data corresponds to one cookie value.

In this case, the server can still trust that the cookies haven't been tampered with as long as the server signs the user's cookies before they're sent to the clients. 

Say we've logged in to the server. What this means is that we've put in some credentials.The server has validated them and has now told us, OK, you're authenticated as a user with some specific user ID. The server can send back the user I.D. that's been authenticated and store it in a cookie that lives in the browser to prevent the user from tampering with that cookie and seeing that they're logged in.

As another user, for example, the server can encrypt or at least sign that cookie value using a secret key that only the server has access to. Now, if a browser without that key tries to modify the cookie with the session, when the server tries to read that value, it'll know that cookie is invalid and has been tampered with and not authorized the user to make whatever request they're making.

There's different benefits for doing client side sessions and server side sessions.

If we're really, really concerned with keeping the data in our session a secret, we can keep this
session on the server side, in a database that's not directly accessible to users. However, in the vast majority of cases, it's enough to ensure that the session data isn't being modified
or tampered with.

For example, if we're playing a game, we're OK with the user reading their own score.
But we don't want the user to be able to give themselves a high score just by modifying their session data directly or if we're logged in to a banking application.
We're OK with seeing who were logged in as, but the bank doesn't want us to be able to change who
were logged in as that would give us the ability to transfer balances from strangers accounts into our own. 

In the vast majority of these cases. We don't need to keep the session in the server.
The session can be available in the browser. And as long as the server signs that cookie the server will always know whether that data is valid.

Remember, only the server has the key to sign the session.


## Express Sessions

2 main options:

`express-session` for server side and `cookie-session` for client side session.


Lets start with `express-session` the server side session approach. Express session still uses cookies but it ONLY saves the session ID in the cookie NOT the session data such as: users id, permissions etc... The session data itself lives on a database. Our `expression-session` middleware plug into many diff database such as: mongodb, sql, Apache Cassandra etc..
There is a default in-memory storage but it's NOT meant for production! 

The `cookie-session` approach stores the session data inside the users cookie that is being sent back & forth w/ever request. The benefit is simplicity (no db involved). The downside is the cookie needs to be small, of course there are limits on how much data browser can send via cookie. Browser's max cookie size is around 4096 bytes. 

Ok, for our examle, it looks like we're using `cookie-session` because it simplies scaling, we can have multiple instances of our node server running ea. handling diff requests. We don't need to introduce a db to accomplish this. To keep our server stateless. Any session data we need will be available directly in the browsers cookie IMU. The server itself, can remain stateless. That is to say, it doesnt need to remember anything! 

If you have to hav security and that is an important factor, server side cookies via `express-session` is our best bet but in most cases it's not a requirement. 

`npm install cookie-session`


```
app.use(cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    // keys are the list of values we use to keep cookie secure; to encrypt the cookie
    keys: ['secret key for rotation', 'original key']
}))
```

Now of course we want something less predictable and NOT hard coded than the above keys. Note we have two in there so that if we want to rotate a key to some new value, we can and the cookies will still be valid. We can wait til all the cookies have been signed with the new secret key before we remove the original key!


Better to use `dotenv`

```
app.use(cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    // keys are the list of values we use to keep cookie secure; to encrypt the cookie
    keys: [config.COOKIE_KEY_1,config.COOKIE_KEY_2]
}))
```

The `passport.initalize()` is the middleware that set up the passport session which is populated by two functions inside passport. One for serializing (serialize to the session to determine what the cookie will store) and the other for deserializing (take it from the cookie and set it to a value that makes it available to us by express). Deserialize saves the user session from the cookie and places it into the request object inside of all of our middleware/request handlers inside the `req.user` property. 

So serializing means saving our user data to a cookie that's going to be passed around to our users browser. And deserializing means loading that user data from that cookie into a value that we can read inside of our express API.

Those two functions I mentioned serialize user and  deserialize user.
We can define those ourselves on this passport object. E.g.
```
passport.serializeUser((user,done) => {
    done(null,user)
})
<!-- In this case, whatever's coming in from our cookie is going to be what's populated on our request that user object in express in much the same way we can do the same thing in serialize user. -->
passport.deserializeUser((obj,done) => {
    done(null,obj)
})
```
And as an argument to this function, we pass any callback that's executed whenever the user is being saved to the cookie to be sent back to the browser.

This callback takes in a user object that's the user being serialized, as well as this done a function which we call once we've done all of that serialization work. done is a callback in case we need to do any asynchronous work to serialized the user, for example, making a lookup inside of a database. 

Warning: regnerate error gets generated so we need to uninstall/install passport to this version per Udemy.

```
npm uninstall passport
npm install passport@0.5
```
Example:

session-salad=eyJwYXNzcG9ydCI6eyJ1c2VyIjp7ImlkIjoiMTAyNzM1NDYwMTE1Njg1NjE1Nzk2IiwiZW1haWxzIjpbeyJ2YWx1ZSI6ImdyYXBobmVlbmphQGdtYWlsLmNvbSIsInZlcmlmaWVkIjp0cnVlfV0sInBob3RvcyI6W3sidmFsdWUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQUxWLVVqVzVWWGNxTS1nLWNDSzI2VjlDNGc5Y1E2aFdoWWwyeG9hazdXc3cxekZ0a2IzWVFnPXM5Ni1jIn1dLCJwcm92aWRlciI6Imdvb2dsZSIsIl9yYXciOiJ7XG4gIFwic3ViXCI6IFwiMTAyNzM1NDYwMTE1Njg1NjE1Nzk2XCIsXG4gIFwicGljdHVyZVwiOiBcImh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BTFYtVWpXNVZYY3FNLWctY0NLMjZWOUM0ZzljUTZoV2hZbDJ4b2FrN1dzdzF6RnRrYjNZUWdcXHUwMDNkczk2LWNcIixcbiAgXCJlbWFpbFwiOiBcImdyYXBobmVlbmphQGdtYWlsLmNvbVwiLFxuICBcImVtYWlsX3ZlcmlmaWVkXCI6IHRydWVcbn0iLCJfanNvbiI6eyJzdWIiOiIxMDI3MzU0NjAxMTU2ODU2MTU3OTYiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FMVi1Valc1VlhjcU0tZy1jQ0syNlY5QzRnOWNRNmhXaFlsMnhvYWs3V3N3MXpGdGtiM1lRZz1zOTYtYyIsImVtYWlsIjoiZ3JhcGhuZWVuamFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWV9fX19; path=/; expires=Sat, 10 May 2025 15:09:23 GMT; secure; httponly

set-cookie:
session-salad.sig=ifJAJg3w4qUwDfypwwY55mHKqM0; path=/; expires=Sat, 10 May 2025 15:09:23 GMT; secure; httponly

Note the path the cookie is set on is '/' and `secure` for only https and `httponly` for NOT allowing javascript to access the cookie. To prove that, in dev tools console type:
```
document.cookie
```
and you will see '' returned! 

Goto application--> cookies and see two cookies: 1 the actual session and the other the signature.

So far all we're doing is taking in the profile as it comes in from google and setting our session to that and reading that entire profile back whenever our cookie is sent to the API. This can be quite expensive and we should look for the salient parts of the profile so we can trim it down IMW. 


Let's take a look.

The serialize user is going to take the Google profile, the one that we get in our verify callback.
Recall the code:
```
function verifyCallback(accessToken, refreshToken, profile, done) {
    console.log('Google profile',profile, 'access token: ',accessToken);
    done(null,profile); //passport knows u are logged in now
}
passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));
```

And it's going to create that first cookie for our session. Right now, we're taking the entire user profile, but instead we could pick and choose certain properties or even just select one property like User ID.

But if we were using server side sessions, for example, we could store just this ID in the cookie.
And if we needed to know more about the user to determine what they have access to, for example, what permissions they have in our API? Well, this decentralized user function would be called when we take that cookie and read it when we're handling a request, the cookie data would be passed in as this object. The cookie would be verified with our secret key, and we would take this object with our cookie data and we could look up the user with that session by their user ID. Inside of our database and our database might store this user's permissions, their email and any other data we need.

So this deserialized user function might do some database lookups like a user dot find by ID. And in this case, the objects that were being sent in our session is an ID. It's this user ID that we serialized.
So he could find my ID. And once that fetches our user data, we could see that then whatever data we fetched about our user can be sent in the done callback.

## Logout

## Next Steps

- Refresh Token
- Role Based Access Control 
    - store roles in session


Security Cheat Sheet

https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html
