const { Prisma } = require('prisma-binding');
require('dotenv').load();

console.log(process.env.PRISMA_ENDPOINT);
const db = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  debug: false,
});

module.exports = db;
