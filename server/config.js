const DB_CONNECT_USER = {
  login: 'admin',
  password: 'admin'
};

const cors = app => {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Expose-Headers', 'Authorization');
    next();
  });
};

module.exports = {
  PORT: 3003,
  JWT_SECRET_KEY: 'my_jwt_secret_key',
  DB_CONNECT_URL: `mongodb://${DB_CONNECT_USER.login}:${DB_CONNECT_USER.password}@ds137054.mlab.com:37054/turtle-quiz`,
  cors
};