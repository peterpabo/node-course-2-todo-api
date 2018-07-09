const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({  //Mongoose => lowercased & pluralized automatically.

    email: {
        type: String, 
        required : true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            /*
            validator: (value) => {
                return validator.isEmail(value);
            },
            */
           validator: validator.isEmail,
           message: '{VALUE} is not a valid email'
        }
    },
    password:{
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access:{
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]    

});



UserSchema.methods.toJSON = function() {    //limit data send back to client and server, by overriding toJSON method
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']); 

};



UserSchema.methods.generateAuthToken = function() {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access },'abc123').toString();

    user.tokens = user.tokens.concat([{access, token}]);//user.tokens.push({access, token});    //used for mongo several versions.


/*
    user.save().then(() => {
        return token;
    }).then((token) => {

    });
*/    

    return user.save().then(() => { //!!! Promise
        return token;
    });
};


UserSchema.statics.findByToken = function(token) {              //like methods, but it's MODEL not INSTANCE
    var User = this;                                            //uppercase User
    var decoded;

    try{
        decoded = jwt.verify(token, 'abc123');
    } catch(e){


        // return new Promise((resolve, reject) => {
        //     reject();
        // });
        return Promise.reject();//reject(value) => value will be used as the catch((e))


    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};


UserSchema.statics.findByCredentials = function (email, password){
    var User = this;

    return User.findOne({email}).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        });

    });    
};




UserSchema.pre('save', function(next) {
    var user = this;
    if(user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;                
                next();                
            });
        });
    } else {
        next();
    }
});


var User = mongoose.model('User', UserSchema);

module.exports = {User};