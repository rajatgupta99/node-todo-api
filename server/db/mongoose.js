const mongoose = require('mongoose');

var uri = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;
mongoose.connect(`${uri}`, {useNewUrlParser: true});

module.exports = {
  mongoose
};
