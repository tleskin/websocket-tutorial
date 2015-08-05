var socket = io();

var connectionCount = document.getElementById('connection-count');
var currentTally = document.getElementById('current-tally');

socket.on('userConnection', function (count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});

var statusMessage = document.getElementById('status-message');
var voteCastMessage = document.getElementById('vote-cast-message');

socket.on('statusMessage', function (message) {
  statusMessage.innerText = message;
});

socket.on('voteCastMessage', function (message) {
  voteCastMessage.innerText = message;
});

var buttons = document.querySelectorAll('#choices button');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', this.innerText);
  });
}

socket.on('voteCount', function (votes) {
  console.log(votes);
  currentTally.innerText = 'Current votes: VIM:' + votes["VIM"] + " Atom:" + votes["Atom"] + " Sublime:" + votes["Sublime"] + " TextMate:" + votes["TextMate"];
});
