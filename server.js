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

var votes = {};

function countVotes(votes) {
  var voteCount = {
    VIM: 0,
    Atom: 0,
    Sublime: 0,
    TextMate: 0
  };
  for (vote in votes) {
    voteCount[votes[vote]]++
  }
  return voteCount;
}

io.on('connection', function (socket) {
  console.log('A user has connected.', io.engine.clientsCount);

  io.sockets.emit('userConnection', io.engine.clientsCount);

  socket.emit('statusMessage', 'You have connected.');

  socket.on('message', function (channel, message) {
    if (channel === 'voteCast') {
      votes[socket.id] = message;
      console.log(votes);
      io.sockets.emit('voteCount', countVotes(votes));
      socket.emit('voteCastMessage', 'Vote Cast!');
    }
  });

  socket.on('disconnect', function () {
    console.log('A user has disconnected.', io.engine.clientsCount);
    delete votes[socket.id];
    socket.emit('voteCount', countVotes(votes));
    io.sockets.emit('userConnection', io.engine.clientsCount);
  });
});
