The way this works is when you type node server agrees to start your node application, the main node process is created.
Node calls this the master process inside of the cluster module.  We have access to this function called fork.
Any time we run the fork function in our server.js file node takes this master process and creates a copy of it that it calls the worker process.
 
We can call this for function however, many times we like to create many worker processes that are attached to a single master. It's these worker processes which do all of the hard work of taking in http requests, processing them and responding to them. Each worker contains all of the code required to respond to any request in our server, while the master is only responsible for coordinating the creation of these worker processes using the fork function.

In this example (pic: clusters-1.gif), where the work function has been called twice, we now have three node processes running. The master, which we created ourselves when we told Node to execute server.js and then the two worker processes that were each created by the fork function, it will be these worker processes that accept
incoming requests and share them using what's called the round robin approach, where it sends the first request to the first worker. The next request to the second worker. And because we only have two processes. The third request goes back into the first work etc..

You might be surprised that this round robin approach ends up being one of the most fair ways of distributing work between the two workers, even compared to fancy approaches that try to predict priorities and assign different importance or weight to each request.

Round robin is a good approach. If node is in a Windows environment, it leaves the load distributing to windows. So round robin might work a bit diff on windows IOW.


The work processes run the same code that's in server.js to plain and simple about it. Remember our diagram when we type node server, guess what we call the master process is started, and it's from this master process that we can call our fork function to create these two worker processes.

The worker processes that we fork run the same code that we have in server.js. The only way we differentiate our master process from the worker processes is by using the isMaster Boolean flag from the cluster module.

```
if (cluster.isMaster) {
    // runs only once during startup e.g. `node server.js`
}
```
