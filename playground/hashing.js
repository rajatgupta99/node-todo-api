const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var data = {
  id: 'Rajat Gupta'
};

var password = 'Ilag@1991';

bcrypt.genSalt(20 , (err, salt)  =>  {
  bcrypt.hash(password, salt, (err, hash) =>  {
    console.log(hash);
  })
});

var hash = '$2a$10$.4D5eZr2aQpb6uBm11/A.eoIRkUzFvPEaMAE./xV.Gv99Yx28PDii';

bcrypt.compare(password, hash, (err, res) =>  {
  console.log(res);
})

// var token = jwt.sign(data, '123abc');
//
// console.log(token);
//
// var decodedData = jwt.verify(token, '123abc');
//
// console.log(decodedData);

// var message = 'My name is Rajat';
//
// var hash = SHA256(message).toString();
//
// console.log(hash);
