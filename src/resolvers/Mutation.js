const bcrypt = require('bcryptjs');

const Mutation = {
  async createItem(parent, args, ctx, info) {
    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args,
        },
      },
      info
    );
    return item;
  },
  async signup(parent, args, ctx, info) {
    // 1 check if passwords are equal
    const { password, passwordConfirmation } = args;
    if (passwordConfirmation != password) {
      throw new Error('Passwords dont match');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const { email, name } = args;
    const user = await ctx.db.mutation.createUser({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return user;
  },
};

module.exports = Mutation;
