const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', (err, client)  =>  {

      if(err) return console.log('Error connecting to mongo server');

      var db = client.db('TodoApp');

      db.collection('Todos').findOneAndUpdate({
        _id:  new ObjectID('5c513a74977b2f17d40671c8')
      }, { $set : {
        'text'  : 'Finish maths homework',
        completed: true
      }

      }).then((result)  =>  {
        console.log(result);
      }).catch((err)  =>  {
        console.log(err);
      })
});
