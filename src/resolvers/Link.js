exports.postedBy = (parent, args, context) => {
  return context.prisma.link({ _id: parent._id }).postedBy();
};
