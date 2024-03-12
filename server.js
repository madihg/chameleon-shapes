const express = require('express');
const app = express();
const server = app.listen(process.env.PORT || 3000, () => console.log('Server running'));
app.use(express.static('public'));

const io = require('socket.io')(server);

io.sockets.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`);

    socket.on('mouse', (data) => {
        // Broadcast drawing data to all other clients
        socket.broadcast.emit('mouse', data);
    });
});
