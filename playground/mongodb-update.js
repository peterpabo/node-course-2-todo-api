const {MongoClient, ObjectID} = require('mongodb');// const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{      //database doesn't need to exists
// MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) =>{   //MongoDB module v3
    if (err) {
        return console.log('Unable to connect to MongoDB server');          //return => Program stops
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5b2cebc97a10e7fd3a316f61')
    // }, {
    //     $set:   {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });
    
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b2cd6fed5c58b231c0d1814')
    }, {
        $set:   {
            name: 'Peter'
        },
        $inc:   {                                                                 //google mongodb operator update
            age: 1
        }        
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    // db.close();//client.close();                                              //MongoDB module v3
});