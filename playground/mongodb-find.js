const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', (err, client)  =>  {
    if(err) return console.log('Error connecting to Mongodb');

    console.log('Connected to database...');

    var db = client.db('TodoApp');

    db.collection('Todos').find().count().then((count)  =>  {
        console.log(`Total Todo's count: ${count}`);
    }).catch((err) =>  {
        console.log(`Error fetching records: ${err}`);
    })
})
