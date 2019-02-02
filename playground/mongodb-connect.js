// const MongoClient = require('mongodb').MongoClient;
//
// const url = 'mongodb://localhost:27017';
// var database = 'TodoApp';
// var collectionName = 'Users';
//
// MongoClient.connect(url, (err, client)  =>  {
//     if(err) return console.log('Unable to connect to MongoDB Server!');
//
//     console.log(`Connected to MongoDB Server...`);
//
//     var db = client.db(database);
//
//     db.collection(collectionName).insertOne({
//       name: 'Rajat Gupta',
//       age: 27,
//       location: 'San Jose'
//     }, (err, result)  =>  {
//         if(err) return console.log('Unable to insert the document!');
//
//         console.log(result.ops[0]._id.getTimestamp());
//     });
//
//     client.close();
// });

const {MongoClient} = require('mongodb');

const url = 'mongodb://localhost:27017';
var database = 'TodoApp';

MongoClient.connect(url, (err, client)  =>  {
  if(err){
    return console.log('Unable to connect to mongodb server.');
  }

  console.log('Connected to mongodb server...');

  var db = client.db(database);

  for(var i=0; i<10000; i++){
    db.collection('Todos').insertOne({
      text: 'My new task',
      completed: false
    }, (err, result)  =>  {
      if(err){
        console.log('Error inserting into collection');
      }

      console.log(`Document Inserted -> ${result.ops[0]}`);
    })
  }


  client.close();
});
