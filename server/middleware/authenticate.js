const User = require('./../users/users.model');

module.exports = async (req, res, next) => {
  let token = req.header('Authorization');
  try{
    const user = await User.findByToken(token);
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch(err){
    res.status(401).send();
  }
}