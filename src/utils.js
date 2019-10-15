const jwt = require('jsonwebtoken');
const APP_SECRET = 'the-secret-key-here';

function getUserId(context) {
  const Authorization = context.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, APP_SECRET);
    return userId;
  }

  throw new Error('NOT_AUTHENTICATED');
}

module.exports = {
  APP_SECRET,
  getUserId
};
