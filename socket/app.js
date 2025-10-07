const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from public directory
app.use(express.static('public'));

// Store connected users
const users = new Map();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle new user
  socket.on('new user', (username) => {
    users.set(socket.id, username);
    console.log(`${username} joined the chat`);
    
    // Broadcast to all clients that a user joined
    socket.broadcast.emit('user joined', {
      username: username
    });
    
    // Send current online count to all clients
    io.emit('online count', users.size);
  });

  // Handle chat messages
  socket.on("chat message", (msg) => {
    const username = users.get(socket.id) || 'Anonymous';
    console.log(`${username}: ${msg}`);
    
    // Send message to all clients including sender
    io.emit("chat message", {
      message: msg,
      username: username,
      id: socket.id
    });
  });

  // Handle typing indicator
  socket.on('typing', () => {
    const username = users.get(socket.id) || 'Anonymous';
    socket.broadcast.emit('typing', {
      username: username
    });
  });

  // Handle stop typing
  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing');
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    const username = users.get(socket.id) || 'Anonymous';
    console.log(`${username} disconnected`);
    
    // Broadcast to all clients that a user left
    socket.broadcast.emit('user left', {
      username: username
    });
    
    // Remove user from the map
    users.delete(socket.id);
    
    // Send updated online count to all clients
    io.emit('online count', users.size);
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
