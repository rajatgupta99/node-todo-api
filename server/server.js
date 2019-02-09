const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

var config = require('./../config/config');
var {mongoose}  = require('./db/mongoose');
var {Todo}  = require('./model/todo');
var {User}  = require('./model/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
var port = process.env.PORT;

app.use(bodyParser.json());

app.post('/user', (req, res)  =>  {
  var body = _.pick(req.body, ['email','password'])
   var newUser = new User(body);

   newUser.save().then(() =>  {
     return newUser.generateAuthToken();
   }).then((token)  =>  {
     res.header('x-Auth', token).send(newUser);
   }).catch((err) =>  {
     res.send(err);
   })
});

app.get('/', (req, res) =>  {
    res.send({
      status: 200,
      body: {
        message: 'Welcome to todo node api'
      }
    });
});

app.post('/todos', authenticate, (req, res) =>  {
    var todo = new Todo({
      text: req.body.text
    });

    todo.save().then((result) =>  {
      //console.log(result);
      res.send(result);
    }).catch((err)  =>  {
        //console.log(err);
        res.status(400).send(err);
    });
});

app.get('/todos', authenticate, (req, res)  =>  {
    Todo.find().then((alltodos) =>  {
        res.send({
          status: 200,
          count: alltodos.length,
          Todos: {
            data : alltodos
          }
        });
    }).catch((err)  =>  {
        res.send(err);
    });
})

app.get('/todos/:id', authenticate, (req, res)  =>  {
    var id = req.params.id;

    if(id){
      if(ObjectID.isValid(id)){
        Todo.findById(id).then((output) =>  {
          if(output){
            res.status(200).send({
              status: 200,
              output
            })
          }else{
            res.status(404).send({
              'message':  'No records found with this ID'
            })
          }
        }).catch((err)  =>  {
            res.status(404);
        })
      }else{
        res.status(404).send({
          'message':  'Invalid Id'
        })
      }
    }else{
      res.status(400).send({
        'message' : 'Please provide an ID'
      });
    }
});

app.delete('/todos/:id', authenticate, (req, res) =>  {
  var id = req.params.id;

  if(id){
    if(ObjectID.isValid(id)){
        Todo.findByIdAndDelete(id).then((output)  =>  {
          if(output){
            res.status(200).send({
              status: 200,
              body: {
                  deletedRecord: output
              }
            });
          }else{
            res.status(404).send({
              'message':  'No records found with this ID'
            });
          }
        }).catch((err)  =>  {
          res.status(404);
        });
    }else{
      res.status(404).send({
        'message':  'Invalid Id'
      });
    }
  }else{
    res.status(400).send({
      'messsage'  : 'Please provide an ID'
    });
  }
});

app.put('/todos/:id', authenticate, (req, res)  =>  {
    var id = req.params.id;

    var body = _.pick(req.body, ['text','completed']);

    if(ObjectID.isValid(id)){
      if(_.isBoolean(body.completed) && body.completed){
        body.completed = true;
        body.completedAt = new Date().getTime();
      }else{
        body.completed = false;
        body.completedAt = null;
      }

      Todo.findByIdAndUpdate(id, {$set:body}, {new: true}).then((result)  =>  {
          if(result){
            res.status(200).send({
              'message':  'Records Updated',
              'updatedRecord' : result
            });
          }else{
            res.status(404).send({
              'message':  'No records found with this ID'
            });
          }
      }).catch((err)  =>  {
        res.status(400);
      })

    }else{
      req.status(404).send({
        'message':  'Invalid Id'
      });
    }
});


app.get('/users/me', authenticate, (req, res)  =>  {
    res.send(req.user);
});

app.listen(port, (result)  =>  {
    console.log('Connected to node server');
})

module.exports = {
  app
}
