const express = require('express');
const app = express();
const server = app.listen(process.env.PORT || 3000, () => console.log('Server running'));
app.use(express.static('public'));

const socket = require('socket.io');
const io = socket(server, {
    cors: {
        origin: "*",
    },
    allowEIO3: true, // for backward compatibility
});

// Track the checked state of each checkbox and user scores
let checkedCheckboxes = Array(100).fill(false);
let userScores = {}; // key: socket.id, value: score

io.on('connection', (socket) => {
    // Send initial setup to just connected user
    socket.emit('setup', { checkedCheckboxes, score: userScores[socket.id] || 0 });

    // Listen for checkbox click events
    socket.on('checkboxClicked', (index) => {
        // Toggle the checked state of the checkbox
        checkedCheckboxes[index] = !checkedCheckboxes[index];
        
        // Update the user's score
        userScores[socket.id] = (userScores[socket.id] || 0) + 1;
        
        // Calculate the total number of checked checkboxes
        let totalChecked = checkedCheckboxes.filter(checked => checked).length;
        
        // Broadcast the updated checked states, total checked, and user scores to all users
        io.emit('update', { checkedCheckboxes, totalChecked, userScores });
    });

    // Optionally, handle user disconnection
    socket.on('disconnect', () => {
        // Implement any cleanup or notification logic here
        // Note: You might want to adjust scores or checked states based on your app's logic
    });
});
