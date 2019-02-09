const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
  id: 'Rajat Gupta'
};

var token = jwt.sign(data, '123abc');

console.log(token);

var decodedData = jwt.verify(token, '123abc');

console.log(decodedData);

// var message = 'My name is Rajat';
//
// var hash = SHA256(message).toString();
//
// console.log(hash);
