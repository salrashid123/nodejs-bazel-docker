const http = require('http');

const host = "localhost";
const port = 8080;

options = {}

http.get('http://' + host + ':' + port + '/',options, (res) => {
    console.log('statusCode:', res.statusCode);
    res.on('data', (d) => {
        process.stdout.write(d);
    });
}).on('error', (e) => {
    console.error(e);
});