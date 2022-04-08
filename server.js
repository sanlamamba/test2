const http = require("http");
const app = require("./app");
require("dotenv").config();
const portNormalizer = (portnum) => {
  const port = parseInt(portnum, 10);
  if (isNaN(port)) return portnum;

  if (port >= 0) return port;

  return false;
};

const port = portNormalizer(process.env.PORT);

app.set("port", port);

const errorHandler = (error) => {
  if (error.syscall !== "listen") throw error;

  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe : " + address : "port : " + port;

  switch (error.code) {
    case "EACCES":
      console.log(bind + " requires higher access!");
      break;

    case "EADDRINUSE":
      console.log(bind + " is already in use. ");
      process.exit(1);
      break;

    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe : " + address : "port : " + port;
  console.log("Listening on " + bind);
});

server.listen(port);
