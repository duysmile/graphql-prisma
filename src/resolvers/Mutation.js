const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { APP_SECRET, getUserId } = require('../utils');

exports.login = async (parent, args, context, info) => {
  const user = await context.prisma.user({
    email: args.email
  });

  if (!user) {
    throw new Error('EMAIL_NOT_FOUND');
  }

  const valid = bcrypt.compareSync(args.password, user.password);
  if (!valid) {
    throw new Error('INVALID_PASSWORD');
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user
  };
};

exports.signup = async (parent, args, context, info) => {
  const password = bcrypt.hashSync(args.password, 10);
  const user = await context.prisma.createUser({...args, password});

  const token = jwt.sign({userId: user.id}, APP_SECRET);
  return {
    token,
    user
  };
};

exports.post = (parent, args, context, info) => {
  const userId = getUserId(context);
  return context.prisma.createLink({
    ...args,
    postedBy: { connect: { id: userId } }
  });
};
