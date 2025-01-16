const net = require("net");

const server = net.createServer((socket) => {
  console.log("Client connected:", socket.remoteAddress, socket.remotePort);

  socket.on("data", (data) => {
    console.log("Received from client:", data.toString());
    socket.write(`Server received: ${data}`);
  });

  socket.on("end", () => {
    console.log("Client disconnected");
  });
});

const PORT = 5000;
const HOST = "0.0.0.0";

server.listen(PORT, HOST, () => {
  console.log(`Server listening on ${HOST}:${PORT}`);
});
