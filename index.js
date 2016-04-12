require("babel-register");

if(process.env['NODE_ENV'] === 'dev') {
  console.log('Used Dev Env');
  var env = require('node-env-file');
  env('./config/env/dev');
}

require("./base.js");
