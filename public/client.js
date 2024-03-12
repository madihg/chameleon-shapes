const socket = io();
const mapImage = document.getElementById("map-image");

mapImage.addEventListener("click", (e) => {
  const rect = mapImage.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const point = { x: x / mapImage.offsetWidth, y: y / mapImage.offsetHeight }; // Normalize points based on image size

  // Emit the normalized click position to the server
  socket.emit("mapClick", point);
});

// Optional: Listen for clicks from other users if you want to do something with that information
socket.on("mapClick", (point) => {
  // Handle incoming click positions from other users if needed
});
socket.on("userCount", (count) => {
  // Assuming you have an element with the ID 'user-count' to display the count
  document.getElementById(
    "user-count"
  ).textContent = `Number of friends currently mapping their journey: ${count}`;
});
