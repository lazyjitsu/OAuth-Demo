When our server is ready and handling HTTPS requests, what's the next most important and common task that we do as node developers?

Well, we need to secure our server against common issues, issues with how our server is configured. Issues with how it handles incoming requests. And with the data that we send back.

For example, we don't want our response to leak data that's going to be exploited by hackers trying to break into our server.

What is helmet?

Helmet is a widely used npm package that contains a collection of middleware. Middleware that helps us secure our server, plugging all of the most common holes that node servers might have. 

Helmet has various middlewares to help us with security stuff. We can enable/disable or install not install individually as we deem fit. They are available as individual NPMs but grouping them together makes it easier to cover all possible scenarios.

```
npm i helmet
```
Require and add it at the top of the file

```
const helmet = require('helmet');

app.use(helmet())


Without `app.use(helmet())` you will see in dev tools that the header `x-powered-by-express` is being set! This is not good because hackers now have as technology to target.

Once you enable that middleware by doing `app.use(helmet())`, you will see the express header gone but also see some new ones. 

For example, we have the `Strict-Transport-Security` header which refers to the `HST` we saw on the helmet features website. It stands for 'http strict transport` security. This header tells the browser that it should never talk toyour API using http, and all HTTP requests should be automically converted to HTTPs requests instead. Its common developers accept both but just redirecting http to https. The first time accessing the browser will remember and all subsequent requests will just go straight to https. 

Another is `Content-Security-Policy` which controls  which resources your browser is allowed to load. This is used to protect against `cross-site scripting` Cross site scripting attack is where a malicious user, rather than saving some data to your database, instead saves a script which is then run by all of the users using your application inside of their browser with cross-site scripting or access attacks. This means they can steal your user's cooies and session tokens.

It's not a silver bullet but helmet does help of course. 

