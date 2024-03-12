let img; // Variable to store the background image
const brushColor = [0, 0, 255, 127]; // Example brush color: blue with 50% transparency
let socket;

function preload() {
    // Load an image (replace 'path/to/image.jpg' with the actual path to your image)
    img = loadImage('path/to/image.jpg');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(img);
    socket = io.connect(window.location.origin);

    socket.on('mouse', data => {
        // Other users' drawing data
        fill(data.color);
        noStroke();
        ellipse(data.x, data.y, 20, 20); // Example brush size
    });
}

function mouseDragged() {
    // Drawing for the current user
    fill(brushColor);
    noStroke();
    ellipse(mouseX, mouseY, 20, 20); // Example brush size

    // Send this user's drawing data to the server
    let data = {
        x: mouseX,
        y: mouseY,
        color: brushColor
    };

    socket.emit('mouse', data);
}

// Optionally, for full coverage on mobile devices
function touchMoved() {
    // Call mouseDragged to handle drawing logic
    mouseDragged();
    return false; // Prevent default
}
