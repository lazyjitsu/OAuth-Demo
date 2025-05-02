const mongoose=require('mongoose')

/*
    We'll have these two event listeners that listen to events on this global
    Mongoose stock connection
 */

const MONGO_URL='mongodb+srv://nasa-api:zi23V2KSRR39Syn6@nasa-planets.miwv8g9.mongodb.net/?retryWrites=true&w=majority&appName=NASA-Planets'

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