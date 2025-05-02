const http = require('http');
const app = require('./app'); // Import the app module
const {mongoConnect} = require('./services/mongo')
const {loadPlanetsData} = require('./models/planets.model'); // Import the planets model

console.log("APP clalled")
const PORT = process.env.PORT || 8100;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  await loadPlanetsData(); // Load planets data before starting the server
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer(); // Start the server after loading planets data
console.log(PORT)