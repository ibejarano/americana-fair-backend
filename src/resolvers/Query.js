const { forwardTo } = require('prisma-binding');

const Query = {
  items: forwardTo('db'),
  async users(parent, args, ctx, info) {
    return ctx.db.query.users({}, info);
  },
};

module.exports = Query;
