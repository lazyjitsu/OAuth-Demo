const http = require('http');
const app = require('./app'); // Import the app module
const mongoose = require('mongoose')
const {loadPlanetsData} = require('./models/planets.model'); // Import the planets model

console.log("APP clalled")
const PORT = process.env.PORT || 8100;

const MONGO_URL='mongodb+srv://nasa-api:zi23V2KSRR39Syn6@nasa-planets.miwv8g9.mongodb.net/?retryWrites=true&w=majority&appName=NASA-Planets'

const server = http.createServer(app);

// mongoose.connection.on('open',() => {
//   console.log('MongoDB connection ready!')
// })
// to do/emit just once
mongoose.connection.once('open',() => {
  console.log('MongoDB connection ready!')
})

mongoose.connection.on('error', (err) => {
  console.error('Err: ',err);
})
  async function startServer() {
    await mongoose.connect(MONGO_URL)
    await loadPlanetsData(); // Load planets data before starting the server
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }

startServer(); // Start the server after loading planets data
console.log(PORT)