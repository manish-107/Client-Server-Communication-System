const net = require("net");
const readline = require("readline");

// Store connected clients
const clients = [];

// Create an interface to read input from the terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Create a TCP server
const server = net.createServer((socket) => {
  console.log("A client connected:", socket.remoteAddress, socket.remotePort);

  // Add the new client to the list
  clients.push(socket);

  // Broadcast a message to all clients
  const broadcast = (message, sender) => {
    clients.forEach((client) => {
      if (client == sender) {
        client.write(client);
      }
    });
  };

  // Handle incoming data from the client
  socket.on("data", (data) => {
    const message = data.toString().trim();
    console.log(`Received: ${message}`);
    // Broadcast the message from this client to all other clients
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

// Function to send a message from the server to all connected clients
const sendMessageFromServer = (message) => {
  clients.forEach((client) => {
    client.write(`Server says: ${message}\n`);
  });
};

// Ask for input in the terminal and broadcast it to all clients
rl.on("line", (input) => {
  sendMessageFromServer(input);
});

// Start the server
const PORT = 5000;
const HOST = "0.0.0.0";
server.listen(PORT, HOST, () => {
  console.log(`Server running at ${HOST}:${PORT}`);
  console.log("Type a message in the terminal to send to all clients.");
});
