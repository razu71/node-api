const http = require('http');

const app = require('./index');

const port = process.env.PORT || 5000;

const server = http.createServer(app); 

server.listen(port);

console.log(`server listning port http://127.0.0.1:${port}`);