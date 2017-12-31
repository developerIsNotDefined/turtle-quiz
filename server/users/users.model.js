const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    maxlength: 20,
    validate: {
      validator: value => validator.isAlphanumeric(value),
      message: '{VALUE} is not a valid name'
    }
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 40,
    unique: true,
    validate: {
      validator: value => validator.isEmail(value),
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 20
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

userSchema.methods.toJSON = function(){
  const user = this;
  const userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email', 'name']);
};

userSchema.methods.generateAuthToken = function(){
  const user = this;
  const access = 'auth';
  const token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET_KEY).toString();

  user.tokens.push({access, token});

  return user.save()
    .then(() => token);
};

userSchema.methods.removeToken = function(token){
  const user = this;

  return user.update({
    $pull: {
      tokens: {token}
    }
  });
};

userSchema.statics.findByToken = function(token){
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

userSchema.statics.findByCredentials = function(email, password){
  const User = this;

  return User.findOne({email})
    .then(user => {
      if (!user) {
        return Promise.reject({message: 'wrong email'});
      }

      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, res) => {
          if(res){
            resolve(user);
          } else {
            reject({message: 'wrong password'});
          }
        });
      });
    });
}

userSchema.pre('save', function(next){
  const user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;