const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const createServer = require('./createServer');
require('dotenv').load();
const db = require('./db');

// require('dotenv').config({ path: '.env' });
const server = createServer();

server.express.use(cookieParser());

// create a new middleware for user check
server.use((req, res, next) => {
  console.log('cookie?', req.cookies);
  if (!req.cookies) return next();
  const {token} = req.cookies;
  if (token) {
    const {user} = jwt.verify(token, process.env.APP_SECRET);
    console.log('i am getting this', user);
    req.userId = user;
  }
  next();
});

server.use(async (req, res, next) => {
  if (!req.userId) return next();
  const user = await db.query.users(
    {where: {id: req.userId}},
    `{id, name, email, permissions}`,
  );
  req.user = user;
  next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  },
  deets => {
    console.log(`Server is UP and running on port ${deets.port}`);
  },
);
