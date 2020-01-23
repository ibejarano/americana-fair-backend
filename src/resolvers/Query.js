const {forwardTo} = require('prisma-binding');

const Query = {
  items: forwardTo('db'),
  me(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: {id: ctx.request.userId},
      },
      info,
    );
  },
  async users(parent, args, ctx, info) {
    return ctx.db.query.users({}, info);
  },
};

module.exports = Query;
