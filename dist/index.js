"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
// WebSocket server creation on port 8080
const wss = new ws_1.WebSocketServer({ port: 8080 });
// Type definitions
let users = 0; // Track the number of users connected
const Allsockets = []; // Store all connected WebSocket instances
// On new connection
wss.on('connection', (socket) => {
    users++; // whenever someone connects to the server the count of user is incremented
    Allsockets.push(socket); // stored the socket to the sockets array
    // When a message is received from a socket
    socket.on('message', (message) => {
        console.log("Recieved Message: ", message.toString());
        // Broadcast the received message to all connected clients
        Allsockets.forEach((socket) => {
            socket.send(message.toString());
        });
    });
});
