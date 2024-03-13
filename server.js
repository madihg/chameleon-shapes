const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

app.use(express.static('public'));

let userCount = 0; // Track the number of connected users

server.listen(3000, () => {
    console.log('listening on *:3000');
});

io.on('connection', (socket) => {
    userCount++; // Increment user count
    console.log('a user connected');
    io.emit('userCount', userCount); // Broadcast updated count

    socket.on('disconnect', () => {
        userCount--; // Decrement user count
        console.log('user disconnected');
        io.emit('userCount', userCount); // Broadcast updated count
    });

    socket.on('draw', (data) => {
        // Broadcast the draw action to ALL clients, including the sender
        io.emit('draw', data);
    });
});