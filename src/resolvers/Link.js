exports.postedBy = (parent, args, context) => {
  return context.prisma.link({ id: parent.id }).postedBy();
};

exports.votes = (parent, args, context) => {
  return context.prisma.link({ id: parent.id }).votes();
};
