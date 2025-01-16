const net = require("net");

const client = net.createConnection(
  { host: "172.17.4.125", port: 5000 },
  () => {
    console.log("Connected to server");
    client.write("Hello, Server!");
  }
);

client.on("data", (data) => {
  console.log("Received from server:", data.toString());
});

client.on("end", () => {
  console.log("Disconnected from server");
});
