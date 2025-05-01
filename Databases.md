
When it comes to the type of database that they are, MongoDB is what's called a documents database.
Our information is stored in JSON. These documents that look very, very much like JSON documents with keys that are strings and values that can be things like numbers and strings or dates.

Postgres, on the other hand, falls into what's called the relational model, which is what pretty much all sequel databases follow.

Data is organized into tables which have rows and columns, and the tables are related to each other in some way, relational databases really shine at modeling these relationships between tables of data.

Whereas in MongoDB, our documents are organized into collections of these documents or in other NoSQL databases.

The overall idea, though, is that these documents include all of the related data for something like a planet or a collection of friends, all in one spot.

Whereas with relational databases, data is generally split apart as much as possible. We might have a table that contains a list of friends along with where those friends live. Organized by City. The cities would be organized in their own table, which has a relationship with the friends table, where a friend lives in a city.

The no sql approach would be to include that city information directly in the friends information directly in the Friends document. Because that information is all in one place. No sql databases are designed to be queried more quickly.

The import diff IMW, is that SQL has a language to query so you can go from MySQL to Oracle to Postgress. NoSQL databases have a proprietary way of communicating so how you would query on one flavor of NoSQL db can be vastly diff than another. 


**With MongoDB, it's primarily designed to be run in a way where it's horizontally scaled, with multiple database machines all sharing part of the work load.**

**We have many instances of the MongoDB process running side by side. It's much easier to horizontally scale MongoDB than it is most SQL databases where you generally take the vertical scaling approach rather than horizontal scaling.**

Now the truth is these days, sequel is learning a lot from no sequel. By making it easier to scale sequel databases horizontally. 

### Schemas

A schema defines the structure of the data that we store in our database. For example, if we have a list of friends being tracked in our database, our schema would say that a friend always includes a first name, last name, phone number and maybe a location. This gives us the advantage of having our data be predictable and structured, which makes it easier to work with.

With sequel databases like Postgres, our tables follow these rigid schemas that define, for example, what data is included in our friends table. Sequel databases require that, you know, the schema of the data ahead of time. When you initially create that database.

In this way, sequel databases resist evolution, they're not easy to restructure. For example, if our database is currently being used by some application.

We can't change the type of data that our tables hold very easily. Sometimes we even need to bring our database down.

To migrate our data from one schema formats to another. This sequel approach is not great if we want our application to always be available to our users 24 hours a day, seven days a week.

Migrating schemas is a complicated topic that you could write books about. While no sequel databases like MongoDB are more flexible, in fact, they're sometimes called schema less databases, which kind of refers to the fact that they don't have schemas.

But that's not entirely accurate. While MongoDB, for example, doesn't force you to have a schema. It's very easy to add schemas in your code at runtime. For example, we could have our API enforce the schema every time we read or write to our database.

This allows us to take advantage of the performance and flexibility of no sequel, while also adding some of the safety and structure of schemas.

We'll learn more about this kind of validation very shortly. For now, what we need to know is that with these different approaches, we need to trade off flexibility with predictability.

## Choosing a DB for our NASA Project

Requirements:

1. Data needs to persist between restarts
2. API needs to be stateless for cluster mode. Recall new Map() lives only in the single node:process it was created in!

We have a controller for each of our routes. The only state that our servers should rely on is the data in this request object being passed in to our server. In our case, through Express, any other data needs to come from external sources and services which are independent from our node process, from our node http server that's running.

OK, so that's how we make our server stateless. But what data are we actually storing? We can see in our models.
That our database will need to support a list of launches where each launch contains a few different properties, including a number, some strings, dates. As well as an array and some booleans. And we have a list of planets. Flightnumber is an important state to keep track of and the number has to be unique IMW

### SQL vs. MongoDB

This is hot topic! Both will meet our requirements. Well we've written in JS and return JSON objects so IMW, its an easier more naturaly pick to go w/noSql mongoDB. Also, we have BSON (binary json). 

MongoDB has a shell which allows you to query it. The way you query your data in MongoDB is writing code in JS. 
After creating MongoDB in Atalas/AWS cloud.
Install:
Udemy said to install mongoose
`npm install mongoose`
It said to install your driver
npm install mongodb

Mongodb driver is the  driver that mongoose uses to connect to our database. Mongodb driver is the official API node uses to talk to mongo databases by the company that created mongo databases. 

We use `mongoose.connection` which is an event emitter that emits events when the connetion is ready when either our connection succeeded or we have an error. 


You can look at Mongo as a schemaless database.

It's up to whatever is accessing our Mongo data to enforce some structure on the data that lives in our collections.
And that's one of the things that Mongoose provides for us. Mongoose here in blue gives us these schema objects. Which are tied to a collection in MongoDB.

Each schema maps to the group of documents inside of a collection. The schema lets us give the documents in our collections a structure that must be followed when accessing our data with Mongoose.

We can say, for example, that a documents flight number is a number while the mission name is a string. And we can see that our flight number and mission name are both required fields. This required property is an example of how Mongoose lets us add validation logic to our documents. And if we so choose, Mongoose lets us provide more advanced validators that can check that, for example, a phone number isn't just a string. But a string that follows a certain format with dashes and with a certain amount of digits. That are grouped together.

To get the data and documents stored in our Mango collections, these queries can include any of our create, read, update and delete crud operations. And our models give us JavaScript objects. We can work with directly in Node.
That's what mongooses means by object modeling, Mongoose takes the data as it's represented in MongoDB. And allows us to access it as objects in JavaScript.

### Schema

`touch models/launches.mongo.js`
E.g.
```
const planetSchema = new mongoosese.Schema({
    // ideally, we want this to match the frontend (Launch.js). Find the reference <option value={planet.keplerName}
    keplerName: {
        type: String,
        required: true
    }
});
```

We map our schemas to collections by using mongoose models. E.g.
```
mongoose.model($collection,$schema);
i.e.
mongoose.model('Launch', launchesSchema);
```

Mongoose will then take the collection name, lower case it, and pluralize it. IOW: 'launches' Mongo refers to 'mongoose.model('Launch',launchesSchema)' as compiling the model. 

And than in our launches.model.js, we add:

`const launches = require('./launches.mongo');`
and don't forget the planets model.js file too


### Mongoose Models vs MVC Models
Models and schemas are objects and classes that Mongoose provides for us to talk to collections of documents
in MongoDB.

These are very specific tools, while models in model view controller are a more general concept that can apply to any database or any external data source.

Our model is something that generally captures the data our API is working with.

Now, in some node projects, you'll see just one model.

You'll have a Model.js file, which most likely just exports the Mongoose model that we have here,directly. So why do we have these additional models?

We're using these model files here to act as the data access layer, that controls how data is read and
updated, while hiding the Mongoose and MongoDB specific implementation details. The things that are in our Mongo.js file.

If we ever decided to switch databases, we could swap out the implementation of our model here to use a different data structure or database because our controllers only work with the functions that we export from this file and they don't care about how they're implemented,none of the code in our controllers or any of the code above this data access layer will have to change because of how we've set things up.

At least any changes would be limited to the overall higher level functionality that our model supports. Allowing for this kind of flexibility is a big part of what these extra layers and abstractions are all about. 

Our model.js files here are higher level and easier to work with in the context of what our API is trying to do than a mongoose model would be directly. Hopefully that makes sense why we didn't use mongoose model directly! It's for this flexibility of changing databases but still having our data represented in our code prior to integrating mongoose IMU.


### Creating and Inserting Documents

Luckily we don't keep loading the same data into the mongoose database every time we start the server via loadPlanetsData() fcn thanks to `upsert` which is short for 'insert' and 'update'. 

### find
E.g. planets.find({
    keplerName: 'Kepler-62 f', <-- only documents matching these propeties would be returned >,
    {
        // Mongo calls this the projection. It's the list of fields from those planet documents that you'd  like to include in the results.
        bobby: 1 <-- return the field bobby>
        jim: 0 <-- exlude the name from our docs>
        or we can use a string to include/exclude a list of fields. the above bobby/jim would look like
        'bobby -jim'
    }
})

// find all documents
await MyModel.find({})

// find all documents named john and at least 18
await MyModel.find({ name: 'john', age: { $gte: 18 }}).exec();

// executes, passing results to callback
MyModel.find({name: 'john', age: { $gte: 18 }}, function (err, docs) {});

// Regular Expressions
await MyModel.find({ name: /john/i }, 'name friends').exec()

see docs for more options

### Object Ids

There are mongodb object id time stamp calculators online we can use to see when an objectid was created! pretty cool. Object ids need to be unique of course.

{
    _id:68137e5a684705c061b6e19b
    keplerName: "Kepler-296 A f"
    __v:0
}

Mongoose creates the '__v:0' property as an added advanced feature which is called the version key to help keep track of the version you create. If you wanted to keep older versions around, you can increment this value. 

### Saving/Listing Launches



### Referential Integrity

The property of data stating that all its references are valid. IOW: the data exists in the table/location it is referencing IMW. 

The easiest way to implement is to ensure it exists before you call any add code per Udemy.

We go to our launches.model.js and import './planets.mongo' Generally we want to talk to layers below. This is so our dependencies to get all tangled up when changes are introduced! 
IOW: our top two lines are both talking to same layer and we're not mixing and matching. E.g.

```
const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');
```

### Autoincrement

Harder to do with mongo than a SQL db. 

MongoDB is better for horizontal scaling due to this fact! IOW: If you have multiple database instances running in a cluster, which one decides which id/number to use when creating and storing that state? Maybe all the instances decide but than that number needs to remain in sync and thus overhead.  So the reason Mongo is better for horizontal scaling is the reason it's harder for autoincrementing.




