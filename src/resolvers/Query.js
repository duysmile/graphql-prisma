exports.feed = async (parent, args, context, info) => {
  const where = args.filter ? {
    OR: [
      { description_contains: args.filter },
      { url_contains: args.filter }
    ]
  } : {};

  const linkRequest = context.prisma.links({
    where,
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy
  });

  const countRequest = context.prisma
    .linksConnection({
      where
    })
    .aggregate()
    .count();

  const [ links, count ] = await Promise.all([linkRequest, countRequest]);
  return {
    links,
    count
  };
};
