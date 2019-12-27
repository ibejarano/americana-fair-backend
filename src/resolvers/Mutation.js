const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').load();

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

  async login(parent, args, ctx, info) {
    // 1 search for email
    const { email, password } = args;
    const [user] = await ctx.db.query.users({ where: { email } });
    // 2 if exist then go to 3 else throw Error
    if (!user) {
      throw new Error('User or password is incorrect');
    }
    // 3 if passwords match generate a jwt token
    const passwordMatchs = await bcrypt.compare(password, user.password);
    if (!passwordMatchs) {
      throw new Error('Password is wrong!');
    }
    const token = jwt.sign({ user: user.id }, process.env.APP_SECRET);
    // 4 set the cookie
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });

    return user;
  },
};

module.exports = Mutation;
