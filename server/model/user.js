const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken')
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 1,
      validate:{
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email.'
      }
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 4,
    },
    tokens:[{
      access:{
        required: true,
        type: String
      },
      token:{
        required: true,
        type: String
      }
    }]
});

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    var body = _.pick(userObject, ['_id', 'email']);

    return {
      status: 'success',
      userDetails: body
    };
}

UserSchema.methods.generateAuthToken = function (){
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, '123abc').toString();

    user.tokens.push({access, token});

    return user.save().then(() =>  {
      return token;
    });
};

UserSchema.statics.findByToken = function (token){
    var User = this;
    var decoded;

    try{
      decoded = jwt.verify(token, '123abc');
    }catch(e){
      return Promise.reject('Invalid Auth Token!');
    }

    return User.findOne({
      '_id': decoded._id,
      'tokens.token': token,
      'tokens.access': 'auth'
    });
};

UserSchema.statics.findByCredentials = function (email, password){
    var User = this;

    return User.findOne({email}).then((userData) =>  {
      if(!userData){
        return Promise.reject('Invalid User Credentials');
      }

      return new Promise((resolve, reject)  =>  {
          bcrypt.compare(password, userData.password, (err, res)  =>  {
              if(res){
                resolve(userData);
              }else{
                reject('Invalid Password!');
              }
          });

      });
    });
};

UserSchema.pre('save', function(next) {
    var user = this;

    if(user.isModified('password')){
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash){
          user.password = hash;
          next();
        });
      });
    }else{
      next();
    }
});


var User = mongoose.model('Users', UserSchema);

module.exports = {User};
