const {ObjectID} = require('mongodb');
const {Todo} = require('./../../model/todo.js')
const {User} = require('./../../model/user');
const jwt = require('jsonwebtoken');

const userOneID = new ObjectID();
const userTwoID = new ObjectID();

const todos = [{
  _id: new ObjectID(),
  text: 'First Test Note',
},{
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: false,
  completedAt: 333
}];

const populateTodos = (done)  =>  {
    Todo.remove({}).then(() =>  {
      return Todo.insertMany(todos);
    }).then(()  =>  {
      done();
    });
};

const users = [{
  _id: userOneID,
  text: 'First Test Note',
  tokens: {
    access: 'auth',
    token:  jwt.sign({_id: userOneID._id.toHexString(), access: 'auth'}, '123abc').toString()
  }
},{
  _id: userTwoID,
  text: 'Second test todo',
  completed: false,
  completedAt: 333
}];

const populateUsers = (done)  =>  {
  User.remove({}).then(()  =>  {
    var UserOne = new User(users[0]).save();
    var UserTwo = new User(users[1]).save();

    return Promise.all([UserOne, UserTwo]);
  }).then(()  =>  {
    done();
  });
};


module.exports = {
  todos,
  populateTodos,
  users,
  populateUsers
}
