var env = process.env.NODE_ENV || 'development';                 //exists in Heroku, default 'development'
console.log('env *****', env);

if (env === 'development' || env === 'test'){
    var config = require('./config.json');    
    var envConfig = config[env];
    
    Object.keys(envConfig).forEach( (key) => {
        process.env[key] = envConfig[key];
    });

    // console.log(config);
    // console.log(Object.keys(envConfig));
}


// if (env === 'development') {
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
// } else if (env === 'test') {
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
// }
