var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://peterpaboservice:testen123@ds125241.mlab.com:25241/udemytodoapi');// || 'mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};
