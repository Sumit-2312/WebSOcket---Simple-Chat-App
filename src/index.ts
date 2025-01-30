import { WebSocketServer, WebSocket } from "ws";

// WebSocket server creation on port 8080
const wss = new WebSocketServer({ port: 8080 });

// Type definitions
let users: number = 0;  // Track the number of users connected
const Allsockets: WebSocket[] = []; // Store all connected WebSocket instances

// On new connection
wss.on('connection', (socket: WebSocket) => {
  
  users++; // whenever someone connects to the server the count of user is incremented
  Allsockets.push(socket); // stored the socket to the sockets array
  
  // When a message is received from a socket
  socket.on('message', (message: string) => { // when the particular socket will get a message then the callback function will be called having message an input
    console.log("Recieved Message: ", message.toString());

    // Broadcast the received message to all connected clients
    Allsockets.forEach((socket) => {
      socket.send(message.toString());
    });
  });


});

