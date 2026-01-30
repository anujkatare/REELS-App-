import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

import chatSocket from "./socket/chat.socket.js";
import mediaRoutes from "./routes/media.route.js";

// --------------------
// INIT APP FIRST
// --------------------
const app = express();
const server = http.createServer(app);

// --------------------
// SOCKET.IO
// --------------------
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// --------------------
// __dirname fix (ESM)
// --------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --------------------
// MIDDLEWARES (AFTER app init)
// --------------------
app.use(cors());
app.use(express.json());

// --------------------
// ROUTES
// --------------------
app.use("/api/media", mediaRoutes);

// --------------------
// STATIC FILES (uploads)
// --------------------
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

// --------------------
// SOCKET HANDLERS
// --------------------
chatSocket(io);

// --------------------
// START SERVER
// --------------------
server.listen(5000, () => {
  console.log("Server running on port 5000");
});
