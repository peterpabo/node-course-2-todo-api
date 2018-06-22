const {MongoClient, ObjectID} = require('mongodb');// const MongoClient = require('mongodb').MongoClient;


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{      //database doesn't need to exists
// MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) =>{   //MongoDB module v3
    if (err) {
        return console.log('Unable to connect to MongoDB server');          //return => Program stops
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').find({
    //         _id: new ObjectID('5b2cd5d953dcfa1d48c1e683')
    //     }).toArray().then((docs) => { 
    // // db.collection('Todos').find({completed: false}).toArray().then((docs) => { 
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);        
    // });

    // db.collection('Todos').find().count().then((count) => {                      //Promise
    //     console.log(`Todos count: ${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);        
    // });

    db.collection('Users').find({name: 'Mike'}).toArray().then((docs) => {                         //Promise
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);        
    });


    // db.close();//client.close();                                              //MongoDB module v3
});