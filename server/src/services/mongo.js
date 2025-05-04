const mongoose=require('mongoose')

/*
    We'll have these two event listeners that listen to events on this global
    Mongoose stock connection
 */

const MONGO_URL= process.env.MONGO_URL;
// mongoose.connection.on('open',() => {
//   console.log('MongoDB connection ready!')
// })

mongoose.connection.once('open',() => {
    console.log('MongoDB connection ready!')
  })
  
mongoose.connection.on('error', (err) => {
    console.error('Err: ',err);
})


async function mongoConnect() {
    await mongoose.connect(MONGO_URL)
}

async function mongoDisconnect() {
    await mongoose.disconnect();
}
module.exports = {
    mongoConnect,
    mongoDisconnect
}