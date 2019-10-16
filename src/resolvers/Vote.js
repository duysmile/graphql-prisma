exports.link = (parent, args, context) => {
  return context.prisma.vote({ id: parent.id }).link();
};

exports.user = (parent, args, context) => {
  return context.prisma.vote({ id: parent.id }).user();
};
