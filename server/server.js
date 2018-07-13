require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;          //  Heroku setup    //const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
    // console.log(req.body);
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({todos});                      //argument is OBJECT, to make it more flexible suppose we want to use more arguments
    }, (e) => {
        res.status(400).send(e);
    })
})

app.get('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;// res.send(req.params);
    
    if (!ObjectID.isValid(id)){
        return res.status(404).send();
    }
/*
    Todo.findById(id).then((todo) => {              //Change findById => findOne
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});

    }).catch((e) => {
        res.status(400).send();
    })
*/
    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {              //Change findById => findOne
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});

    }).catch((e) => {
        res.status(400).send();
    })
});


app.delete('/todos/:id', authenticate, (req, res) => {      //add authenticate
    //get the id
    var id = req.params.id;

    //validate the id -> not valid? return 404
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    //remove todo by id
        //success
            //if no doc, send 404 (not found)
            //if doc, send doc back with 200
        //error
            //400 with empty body (bad request)
    Todo.findOneAndRemove({               //change .findByIdAndRemove => findOneAndRemove
        _id: id,
        _creator: req.user._id
    }).then((todo) => { 
        if(!todo) {
            return res.status(404).send();
        }
        res.send({todo});                                     //=>	change to OBJECT {todo : todo} => es6 => {todo}
    }).catch( (e) => {
        res.status(400).send();
    });

});

app.patch('/todos/:id', authenticate, (req, res) => {         //patch => to update a resource   //add authenticate
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();            //returns number of ms from 1/1/1970 (linux), neg. is from the past
    } else {
        body.completed = false;
        body.completedAt = null;    //database clear field
    }
/*
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {  //findByIdAndUpdate > findOneAndUpdate
        if (!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    }); //param2 mongo operators
*/
    Todo.findOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body}, {new: true}).then((todo) => {  //findByIdAndUpdate > findOneAndUpdate
        if (!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    }); //param2 mongo operators

});

//POST /users
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);
/*
    User.findByToken();
    user.generateAuthToken;
*/

    user.save().then(() => {
        return user.generateAuthToken();//res.send(user);
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});


app.get('/users/me', authenticate,  (req, res) => {
    res.send(req.user);
});                //model NOT instance



app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);


    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });        
    }).catch( (e) => {
       res.status(400).send();
    });
    
});


app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});


// app.listen(3000, () => {
//     console.log('Started on port 3000');
// });
app.listen(port, () => {                            //  Heroku setup
    console.log(`Started up at port ${port}`);
});


module.exports = {app};