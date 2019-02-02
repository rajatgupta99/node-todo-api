const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', (err, client) =>  {
      if(err) return console.log('Error connecting');

      var db = client.db('TodoApp');

      db.collection('Todos').deleteMany({
        text: 'My new task'
      });

      db.collection('Users').deleteOne({
        _id : new ObjectID('5c511f233458a45338820236')
      }).then((result)  =>  {
        console.log(result);
      }).catch((err)  =>  {
        console.log(err);
      })
});
