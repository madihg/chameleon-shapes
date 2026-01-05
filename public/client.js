// PartyKit connection - will be set after DOM loads
let socket;
let userColor = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`;

// PartyKit host - update this after deploying your PartyKit server
const PARTYKIT_HOST = window.location.hostname === "localhost" 
  ? "localhost:1999" 
  : "chameleon-shapes.madihg.partykit.dev";

function connectToParty() {
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  const wsUrl = `${protocol}//${PARTYKIT_HOST}/party/main`;
  
  socket = new WebSocket(wsUrl);
  
  socket.onopen = () => {
    console.log("Connected to PartyKit");
  };
  
  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      
      if (data.type === "draw") {
        // Drawing received from server
        stroke(data.color);
        strokeWeight(10);
        line(data.x, data.y, data.px, data.py);
      } else if (data.type === "userCount") {
        // Update user count
        document.getElementById('user-count').textContent = `${data.count} animal(s) that change(s)`;
      }
    } catch (e) {
      console.error("Error parsing message:", e);
    }
  };
  
  socket.onclose = () => {
    console.log("Disconnected from PartyKit, reconnecting...");
    setTimeout(connectToParty, 1000);
  };
  
  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('position', 'absolute');
  cnv.style('z-index', '2');
  background(255, 255, 255, 0); // Transparent background
  
  // Connect to PartyKit
  connectToParty();
}

function mouseDragged() {
  // Only send if socket is connected
  if (socket && socket.readyState === WebSocket.OPEN) {
    let data = {
      type: "draw",
      x: mouseX,
      y: mouseY,
      px: pmouseX,
      py: pmouseY,
      color: userColor
    };
    socket.send(JSON.stringify(data));
  }
  
  // Also draw on this user's canvas for immediate feedback
  stroke(userColor);
  strokeWeight(10);
  line(mouseX, mouseY, pmouseX, pmouseY);
}

// Handle window resize
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
