const http = require('http');
const app = require('./app');

const server = http.createServer(app);
//port lissing the requests
server.listen(3000);
