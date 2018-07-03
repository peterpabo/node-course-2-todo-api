var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI);
//mongoose.connect('mongodb://mlab:mlab123@ds125241.mlab.com:25241/udemytodoapi?authMechanism=SCRAM-SHA-1');// || 'mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};
