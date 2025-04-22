const http = require('http');
const app = require('./app'); // Import the app module

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
  
//   });

  const PORT = process.env.PORT || 8000;
  const server = http.createServer(app);

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

console.log(PORT)