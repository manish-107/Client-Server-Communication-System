const net = require("net");

// Store connected clients
const clients = [];

// Create a TCP server
const server = net.createServer((socket) => {
  console.log("A client connected:", socket.remoteAddress, socket.remotePort);

  // Add the new client to the list
  clients.push(socket);

  // Broadcast a message to all clients
  const broadcast = (message, sender) => {
    clients.forEach((client) => {
      if (client !== sender) {
        client.write(message);
      }
    });
  };

  // Handle incoming data from the client
  socket.on("data", (data) => {
    const message = data.toString().trim();
    console.log(`Received: ${message}`);
    broadcast(`Client ${socket.remotePort}: ${message}\n`, socket);
  });

  // Handle client disconnection
  socket.on("end", () => {
    console.log("Client disconnected:", socket.remotePort);
    clients.splice(clients.indexOf(socket), 1); // Remove client from list
  });

  // Handle errors
  socket.on("error", (err) => {
    console.error("Socket error:", err.message);
  });
});

// Start the server
const PORT = 5000;
const HOST = "0.0.0.0";
server.listen(PORT, HOST, () => {
  console.log(`Server running at ${HOST}:${PORT}`);
});
