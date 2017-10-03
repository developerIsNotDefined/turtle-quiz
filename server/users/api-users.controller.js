const User = require('./users.model');
const _ = require('lodash');
const authenticate = require('./../middleware/authenticate');

module.exports = app => {
  app.post('/sign-up', (req, res) => {
    const body = _.pick(req.body, ['email', 'password', 'name']);
    const user = new User(body);

    user.save()
      .then(user => user.generateAuthToken())
      .then(token => res.header('Authorization', token).send(user))
      .catch(err => res.status(400).send(err));
  });

  app.post('/sign-in', (req, res) => {
    User.findByCredentials(req.body.email, req.body.password)
      .then(user => {
        return user.generateAuthToken()
          .then(token => res.header('Authorization', token).send(user));
      })
      .catch(err => res.status(400).send(err));
  });

  app.delete('/sign-out', authenticate, (req, res) => {
    req.user.removeToken(req.token)
      .then(() => res.send())
      .catch(() => res.status(400).send({message: 'Oops, something bad happened to server'}));
  });
}