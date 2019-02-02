const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose}  = require('./db/mongoose');
var {Todo}  = require('./model/todo');
var {User}  = require('./model/user');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) =>  {
    res.send({
      status: 200,
      body: {
        message: 'Welcome to todo node api'
      }
    });
});

app.post('/todos', (req, res) =>  {
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

app.get('/todos', (req, res)  =>  {
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

app.get('/todos/:id', (req, res)  =>  {
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

app.delete('/todos/:id', (req, res) =>  {
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


app.listen(port, (result)  =>  {
    console.log('Connected to node server');
})

module.exports = {
  app
}
