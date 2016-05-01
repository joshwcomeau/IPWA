// Allow ES6 on the server-side.
require('babel-core/register');
require('babel-polyfill');

// require('./initialize');

// Boot up the server that corresponds to the environment.
// var fileSuffix  = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';
// var fileName    = './server.'+fileSuffix; // eg. ./server.dev
//
// require(fileName);

require('./server')
