As with typical node applications, we'll be using MVC. 

It is customary to group code w/similar functionality together. It is for that reason controllers is NOT in the server folder.
It's also common to have multiple packages i.e. multiple package.json like we will in this project.

D:.
├───client
|
└───server
    ├───models
    └───routes

So we have a package.json in the clients folder, server folder and the main root folder. The package.json in the main root folder will control (i.e. start/stop) the packages in the client and server folders. This way we can run commands against our client & server folders. Now, we will create & populate these files the right way using package.json

Create React App is a great way to start react if your new to it IMU.  This is a tool to quickly create react app applications.
It simplifies our life by bundling our files together so they can be sent directly to any browser w/out us developers having to take any extra steps.

so open up zip file and copy contents to client folder, cd client; npm install

`npm start`  # will start on port 3000 in the browser.

## Notes on the React code from Nasa

If we go to our app layout dogs and we scroll just above our return statements where we return, all of these components will see a couple of these use functions, like use launches and use planets.

These are hooks. Which are reacts way of responding to events that occur in your application and managing the resulting state of your application. With hooks, you take the states that would live in your react components. These things, like the header and the footer, or any buttons or forms that your application is composed of. And you move this state into these hooks instead, which simplify how you pass this state, like the list of planets. Around between your different components, which we can see, for example, the list of planets being passed in to our launch page because they're required for that drop down.
So you capture this state in the hooks and you also save react from RE rendering your application needlessly
because react can keep track of exactly what state has changed versus what state hasn't changed. And only render the things that have changed.

These hooks simply how you pass state. 

All of these hooks. Are really just making sure that our application state is saved and any calculations or API requests needed for that state are only performed when the user performs some action that will cause an update. For example, our launches data won't be reloaded every time we switch pages because nothing has changed.
Hooks are great for making our react applications more efficient and minimizing the amount of requests that are API needs to handle which speeds everything up.

Everybody wins.
