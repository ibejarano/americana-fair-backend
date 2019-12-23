const createServer = require('./createServer');
require('dotenv').load();

// require('dotenv').config({ path: '.env' });

console.log(process.env.PRISMA_ENDPOINT);

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
