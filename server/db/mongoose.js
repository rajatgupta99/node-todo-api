const mongoose = require('mongoose');

var uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp';

mongoose.Promise = global.Promise;
mongoose.connect(`${uri}`, {useNewUrlParser: true});

module.exports = {
  mongoose
};
