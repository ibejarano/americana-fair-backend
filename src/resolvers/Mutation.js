const Mutation = {
  async createItem(parent, args, ctx, info) {
    console.log(args);
  },
};

module.exports = Mutation;
