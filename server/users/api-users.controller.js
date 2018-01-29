const User = require('./users.model');
const _ = require('lodash');
const authenticate = require('./../middleware/authenticate');

module.exports = app => {
  app.post('/sign-up', async (req, res) => {
    try{
      const body = _.pick(req.body, ['email', 'password', 'name']);
      const user = new User(body);
      await user.preSave();
      const token = await user.generateAuthToken();
      res.header('Authorization', token).send(user);
    } catch(err){
      res.status(400).send(err);
    }
  });

  app.post('/sign-in', async (req, res) => {
    try{
      const user = await User.findByCredentials(req.body.email, req.body.password);
      const token = await user.generateAuthToken();
      res.header('Authorization', token).send(user);
    } catch(err) {
      res.status(400).send({message:err.message});
    }
  });

  app.delete('/sign-out', authenticate, async (req, res) => {
    try{
      await req.user.removeToken(req.token);
      res.send();
    } catch(err){
      res.status(400).send({message: 'Server is not available for the time being'});
    }
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