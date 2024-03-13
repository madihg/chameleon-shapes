let socket = io();

// Define the sketch in "instance mode"
const sketch = (p) => {
  let userColor = 'rgba(100, 100, 250, 0.5)'; // Semi-transparent color

  p.setup = () => {
    // Create a canvas that matches the window size
    let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
    cnv.style('position', 'absolute'); // Ensure canvas overlays the background image
    p.clear(); // Clear the background to keep it fully transparent
  };

  p.draw = () => {
    // If mouse is pressed, draw
    if (p.mouseIsPressed) {
      p.stroke(userColor);
      p.strokeWeight(10);
      p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);

      // Send this drawing action to the server
      socket.emit('draw', {
        x: p.mouseX,
        y: p.mouseY,
        px: p.pmouseX,
        py: p.pmouseY,
        color: userColor
      });
    }
  };

  // Receive drawing actions from the server
  socket.on('draw', (data) => {
    p.stroke(data.color);
    p.strokeWeight(10);
    p.line(data.x, data.y, data.px, data.py);
  });
};

// Create a new p5 instance with the sketch
new p5(sketch);
