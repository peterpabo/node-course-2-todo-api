const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5b375b4cbb91802a74e26f31';
var userid = '5b30debd3b69cdec28aaf1f4';

if (!ObjectID.isValid(id)) {
    console.log('ID NOT valid!');
}

if (!ObjectID.isValid(userid)) {
    console.log('userID NOT valid!');
}

Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos', todos);
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo', todo);
});

Todo.findById(id).then((todo) => {
    if (!todo) {
       return console.log('ID not found');
    }
    console.log('Todo by ID', todo);    
}).catch((e) => { console.log(e) });

User.findById(userid).then((user) => {
    if (!user) {
       return console.log('userID not found');
    }
    console.log(JSON.stringify(user, undefined, 2));// console.log('User by ID', user);    
}).catch((e) => { console.log(e) });