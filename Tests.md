That's telling us that this launch is that find one operation timed out after 10 seconds. So why are our database operations timing out when we run our tests? The answer is fairly simple.

If we look at our test file, remember that we're using super test to start up our server by passing in this app object from the App.js file. And we use Super Test to make requests directly against the express server that's defined in this App.js file.

The challenge here is that it's in our server.js that we actually connect to Mongo with our start server function that calls Mongo reconnect. So we're not actually connecting to MongoDB Before we run our tests and our tests are waiting around until they time out!

How do we solve this?

Well, the simplest way would be to copy over our connect call and run that before we do any of our
tests. But we want to follow the dry principle that don't repeat yourself if we're already connecting in our
server.js file.

We should be able to move this code into a common file that can be used both in our tests and in our
server.js, plus our server code.
.

Let's move our Connect function and our Mongoose event listeners to a file in our server folder under source.

So lets create a new folder.

And there's a few different conventions that you might see for this kind of shared code that doesn't fall under the category of being a model or a route, you might see some people calling it a utility folder or utils for short.
However, I like making it explicit that what's going to be in this folder rather than just being general utility functions are going to be services that are going to be available throughout the lifecycle of our server.

So I'll call this services folder, and we're going to have one module inside of this folder for MongoDB so we'll call it mongo.js.

And what this file will have is all of the code where we use Mongoose.  Well, we have these two event listeners that listen to events on this global Mongoose stock connection object so we can copy those over.

I'll remove them from the server and paste them into mongoose. And of course, we need to include the Mongo URL.
See file server.js and mongo.js files for more info....



Look at that, our server.js file is already looking much cleaner and more organized, trying to get
our tests, the work has given us a chance to improve the quality of our code.

One of the extra benefits of writing test the bull code is that testable code is also just better all
around for maintainability.

What we can do now. In launches.test.js. We want to require our mongo  service and call that connect function

We're going to use a feature of Jest, which allows us to set up an environment for our tests inside
of a describe block.

Setting up whatever is required for the tests included in that block, we're going to want our Mongo
connection to stay alive for both our get tests for the launches collection as well as our post tests.

So we can do something a little bit clever and wrap both of these describe hooks. In another describe .
So I'm going to create describe.

And see, that's what we're doing in this file is we're testing the launches API and the way we're testing
our launch is API described in this callback here.

Now we have this nested structure.

Where we have the lunches API tests grouped by the HTTP method and each HTTP method has some tests that
need to succeed with this change.

The above is an edit/copy/paste of the transcripts

Important: These tests are integegration tests sometimes called end-to-end tests. They use the real database for our app which means they change the database!  Recall we do some post tests and this updates our database. We may consider a test database if need be.


