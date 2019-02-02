const {ObjectId}  = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo}  = require('./../server/model/todo');
const {User}  = require('./../server/model/user');

var id = '5c5297528c1a2924784c26d9';

Todo.findByIdAndDelete(id).then((result) =>  {
  console.log(result);
}).catch((err)  =>  {
  console.log(err);
});

mongoose.connection.close();
