const {MongoClient, ObjectID} = require('mongodb');// const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{      //database doesn't need to exists
// MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) =>{   //MongoDB module v3
    if (err) {
        return console.log('Unable to connect to MongoDB server');          //return => Program stops
    }
    console.log('Connected to MongoDB server');

    // //deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    //deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    //FindOneAnddelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });
    // 

    // db.collection('Users').deleteMany({name: 'Peter'}).then((result) => {
    //          console.log(result);
    // });

    db.collection('Users').findOneAndDelete({
            _id: new ObjectID('5b2cd979b99b012ad051c76e')
        }).then((results) => {
            console.log(JSON.stringify(results, undefined, 2));
        });

    // db.close();//client.close();                                              //MongoDB module v3
});