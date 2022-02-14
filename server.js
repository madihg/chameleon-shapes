var express = require('express'); 
var app = express();
var server = app.listen(process.env.PORT || 3000);
app.use(express.static('public'));
console.log('server running')
var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket){
  // socket.on("newMsg", function(data){
  // //send a message to everyone
  //   io.emit("newMsgFromServer", data)
  // //send a message to just the person who sent the original
  //   socket.emit("newMsgFromServer", data)
  // })
  
}