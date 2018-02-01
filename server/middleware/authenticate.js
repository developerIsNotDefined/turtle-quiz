const User = require('./../users/users.model');
const {errorsFormattingHelper} = require('./errorhelpers');

module.exports = async (req, res, next) => {
  let err, user;
  let token = req.header('Authorization');

  [err, user] = await User.findByToken(token);
  if (!user)
    return res.status(401).send(errorsFormattingHelper(['Unauthorized']));

  req.user = user;
  req.token = token;
  next();
}