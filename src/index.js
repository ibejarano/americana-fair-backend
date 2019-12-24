const createServer = require('./createServer');
require('dotenv').load();
const db = require('./db');

// require('dotenv').config({ path: '.env' });
console.log(process.env.FRONTEND_URL);
const server = createServer();

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  },
  deets => {
    console.log(`Server is now running on port ${deets.port}`);
  }
);
