const mongoose = require('mongoose');

var uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';

mongoose.Promise = global.Promise;
mongoose.connect(`${uri}/TodoApp`, {useNewUrlParser: true});

module.exports = {
  mongoose
};
