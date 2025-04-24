const http = require('http');
const app = require('./app'); // Import the app module
const {loadPlanetsData} = require('./models/planets.model'); // Import the planets model
// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
  
//   });
console.log("APP clalled")
  const PORT = process.env.PORT || 8100;
  const server = http.createServer(app);
  // await loadPlanetsData(); can't run from here; needs to be inside async
let p;
  async function startServer() {
    p = await loadPlanetsData(); // Load planets data before starting the server
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
  // server.listen(PORT, () => {
  //   console.log(`Server is running on port ${PORT}`);
  // });
  console.log(`found planets ${p}`);
startServer(); // Start the server after loading planets data
console.log(PORT)