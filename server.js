const http = require('http');
const express = require ('express');

const app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(_dirname + '/public/index.html');
});

var port = process.env.PORT || 3000;

var server = http.createServer(app)
                 .listen(port, function () {
                    console.log('Listening on port ' + port + '.');
                  });

module.exports = server;

const io = require('socket.io')(server);
