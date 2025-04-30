
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
