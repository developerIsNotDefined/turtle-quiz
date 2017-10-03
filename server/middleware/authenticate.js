const User = require('./../users/users.model');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');

  User.findByToken(token)
    .then(user => {
      if (!user) {
        return Promise.reject();
      }
      req.user = user;
      req.token = token;
      next();
    })
    .catch(err => res.status(401).send());
};