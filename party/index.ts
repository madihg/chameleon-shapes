import type * as Party from "partykit/server";

class DrawingRoom implements Party.Server {
  constructor(readonly room: Party.Room) {}

  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    // Add connection to our map
    connections.set(conn.id, conn);
    
    // Broadcast updated user count to all clients
    this.broadcastUserCount();
  }

  onClose(conn: Party.Connection) {
    // Remove connection from our map
    connections.delete(conn.id);
    
    // Broadcast updated user count to all clients
    this.broadcastUserCount();
  }

  onMessage(message: string, sender: Party.Connection) {
    try {
      const data = JSON.parse(message);
      
      if (data.type === "draw") {
        // Broadcast drawing data to all OTHER clients (not the sender)
        this.room.broadcast(message, [sender.id]);
      }
    } catch (e) {
      console.error("Error parsing message:", e);
    }
  }

  broadcastUserCount() {
    const count = this.room.getConnections().length;
    this.room.broadcast(JSON.stringify({ 
      type: "userCount", 
      count 
    }));
  }
}

export { DrawingRoom as default };

