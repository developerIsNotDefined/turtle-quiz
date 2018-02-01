const User = require('./users.model');
const _ = require('lodash');
const authenticate = require('./../middleware/authenticate');

module.exports = app => {
  app.post('/sign-up', async (req, res) => {
    let err, user, token;

    const body = _.pick(req.body, ['email', 'password', 'name']);
    user = new User(body);

    [err, user] = await user.preSave();
    if (!user)
      return res.status(400).send(err);
    
    [err, token] = await user.generateAuthToken();
    if (!token)
      return res.status(400).send(err);

    res.header('Authorization', token).send(user);
  });

  app.post('/sign-in', async (req, res) => {
    let err, user, token;

    [err, user] = await User.findByCredentials(req.body.email, req.body.password);
    if (!user)
      return res.status(400).send(err);

    [err, token] = await user.generateAuthToken();
    if (!token)
      return res.status(400).send(err);

    res.header('Authorization', token).send(user);
  });

  app.delete('/sign-out', authenticate, async (req, res) => {
    let err, removeResult;

    [err, removeResult] = await req.user.removeToken(req.token);
    if (!removeResult)
      return res.status(400).send(err);

    res.send();
  });
}

// const User = require('./users.model');
// const _ = require('lodash');
// const authenticate = require('./../middleware/authenticate');
//
// module.exports = app => {
//   app.post('/sign-up', (req, res) => {
//     const body = _.pick(req.body, ['email', 'password', 'name']);
//     const user = new User(body);
//
//     user.save()
//       .then(user => user.generateAuthToken())
//       .then(token => res.header('Authorization', token).send(user))
//       .catch(err => res.status(400).send(err));
//   });
//
//   app.post('/sign-in', (req, res) => {
//     User.findByCredentials(req.body.email, req.body.password)
//       .then(user => {
//         return user.generateAuthToken()
//           .then(token => res.header('Authorization', token).send(user));
//       })
//       .catch(err => res.status(400).send(err));
//   });
//
//   app.delete('/sign-out', authenticate, (req, res) => {
//     req.user.removeToken(req.token)
//       .then(() => res.send())
//       .catch(() => res.status(400).send({message: 'Server is not available for the time being'}));
//   });
// }