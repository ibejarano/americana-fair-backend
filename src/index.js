const createServer = require('./createServer');
require('dotenv').load();
const db = require('./db');

// require('dotenv').config({ path: '.env' });

const server = createServer();

server.start(
  {
    cors: {
      credentials: true,
    },
  },
  deets => {
    console.log(`Server is now running on port ${deets.port}`);
  }
);
