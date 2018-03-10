const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const {tryCatchHelper, errorsFormattingHelper, mongoErrorsFormattingHelper} = require('./../helpers/errorhelpers');

const userSchema = new mongoose.Schema({
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
    maxlength: 100
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

class UserModel extends mongoose.model {
  toJSON() {
    const userObject = this.toObject();
    return _.pick(userObject, ['_id', 'email', 'name']);
  }

  async generateAuthToken() {
    let err, user, access = 'auth';
    let token = jwt.sign({_id: this._id.toHexString(), access}, process.env.JWT_SECRET_KEY).toString();
    this.tokens.push({access, token});

    [err, user] = await this.preSave();
    if (!user)
      return [err];
    
    return [null, token];
  }

  async removeToken(token) {
    let err, removeResult;

    [err, removeResult] = await tryCatchHelper(this.update({
      $pull: {
        tokens: {token}
      }
    }));
    if(!removeResult)
      return [mongoErrorsFormattingHelper(err)];

    return [null, removeResult];
  }

  static async findByToken(token) {
    let err, decoded, user, access = 'auth';

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch(err) {
      return [err];
    }
    
    [err, user] = await tryCatchHelper(this.findOne({
      '_id': decoded._id,
      'tokens.token': token,
      'tokens.access': access
    }));
    if (!user)
      return [errorsFormattingHelper(['user not found'])];

    return [null, user];
  }

  static async findByCredentials(email, password) {
    let err, user, compareResult;

    [err, user] = await tryCatchHelper(this.findOne({email}));
    if (!user)
      return [errorsFormattingHelper(['wrong email'])];

    [err, compareResult] = await tryCatchHelper(bcrypt.compare(password, user.password));
    if(!compareResult)
      return [['wrong password']];

    return [null, user];
  }

  async preSave() {
    let err, user;

    if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(this.password, salt);
      this.password = hash;
    }

    [err, user] = await tryCatchHelper(this.save());
    if(!user)
      return [mongoErrorsFormattingHelper(err)];

    return [null, user];
  }
}

userSchema.loadClass(UserModel);

const User = mongoose.model('User', userSchema);

module.exports = User;

// userSchema.pre('save', function(next){
//   const user = this;
//
//   if (user.isModified('password')) {
//     bcrypt.genSalt(10, (err, salt) => {
//       bcrypt.hash(user.password, salt, (err, hash) => {
//         user.password = hash;
//         next();
//       });
//     });
//   } else {
//     next();
//   }
// });