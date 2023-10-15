const { NODE_ENV } = process.env;
const { JWT_SECRET } = process.env;

const secret = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

const urlRegExp = /(https?:\/\/)(w{3}\.)?([a-zA-Z0-9-]{0,63}\.)([a-zA-Z]{2,4})(\/[\w\-._~:/?#[\]@!$&'()*+,;=]#?)?/;

module.exports = { secret, urlRegExp };
