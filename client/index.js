const net = require("net");
const readline = require("readline");

// Create an interface for terminal input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Connect to the server
const client = net.createConnection({ host: "127.0.0.1", port: 5000 }, () => {
  console.log("Connected to the server.");
  rl.prompt();

  // Send user input to the server
  rl.on("line", (line) => {
    client.write(line.trim());
    rl.prompt();
  });
});

// Handle data received from the server
client.on("data", (data) => {
  console.log(`\n${data.toString().trim()}`);
  rl.prompt();
});

// Handle disconnection
client.on("end", () => {
  console.log("Disconnected from the server.");
  process.exit(0);
});

// Handle errors
client.on("error", (err) => {
  console.error("Connection error:", err.message);
  process.exit(1);
});
