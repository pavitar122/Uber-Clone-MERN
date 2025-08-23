import http from "http";
import app from "./app.js";
import dotenv from "dotenv";
import { initializeSocket } from "./socket.js";

dotenv.config();

const port = process.env.PORT || 3000;

const server = http.createServer(app);

initializeSocket(server);

server.listen(port, () => {
  console.log(`Server is running on porth ${port}`);
});
