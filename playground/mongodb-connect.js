const {MongoClient, ObjectID} = require('mongodb');// const MongoClient = require('mongodb').MongoClient;

// var obj = new ObjectID();
// console.log(obj);

// var user = {name: 'peter', age:25};
// var {name} = user;                                                          //destructure es6
// console.log(name);                                                          //2make NEW variables from OBJECT property


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{      //database doesn't need to exists
// MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) =>{   //MongoDB module v3
    if (err) {
        return console.log('Unable to connect to MongoDB server');          //return => Program stops
    }
    console.log('Connected to MongoDB server');
    //const db = client.db('TodoApp');                                      //MongoDB module v3

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false        
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });                                                                     //the collection doesn't need to exists

    // db.collection('Users').insertOne({
    //     name: 'Peter',
    //     age: 25,
    //     location: 'Roeselare'        
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert user', err);
    //     }
    //     console.log(result.ops[0]._id.getTimestamp());                         //console.log(JSON.stringify(result.ops, undefined, 2));
    // });                                                                        //the collection doesn't need to exists

    db.close();//client.close();                                              //MongoDB module v3
});