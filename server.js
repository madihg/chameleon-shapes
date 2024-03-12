const express = require("express");
const app = express();
const server = app.listen(process.env.PORT || 3000, () =>
  console.log("Server running")
);
app.use(express.static("public"));

const socket = require("socket.io");
const io = socket(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("mapClick", (point) => {
    // Broadcast the click position to all clients except the sender
    socket.broadcast.emit("mapClick", point);
  });
});
<div id="user-count">Number of friends currently checking boxes: 0</div>;

let userCount = 0; // Track the number of connected users

io.on("connection", (socket) => {
  userCount++; // Increment user count on new connection
  io.emit("userCount", userCount); // Emit the updated count to all clients

  // Your existing connection logic here...

  socket.on("disconnect", () => {
    userCount--; // Decrement user count on disconnection
    io.emit("userCount", userCount); // Emit the updated count to all clients
  });
});
