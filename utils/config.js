const {
  NODE_ENV, PORT, MONGO_URL, JWT_SECRET,
} = process.env;

module.exports.PORT = NODE_ENV === 'production' ? PORT : 3000;
module.exports.MONGO_DB = NODE_ENV === 'production' ? MONGO_URL : 'mongodb://127.0.0.1:27017/bitfilmsdb';
module.exports.SECRET_KEY = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

module.exports.CORS_OPTIONS = {
  origin: ['http://localhost:3000'],
  credentials: true,
  exposedHeaders: ['set-cookie'],
};
