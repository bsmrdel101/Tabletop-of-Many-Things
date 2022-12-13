const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http');
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');
require('dotenv').config();

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());


// Routes
const userRouter = require('./routes/user.router');
const dashboardRouter = require('./routes/dashboard.router');

app.use('/api/user', userRouter);
app.use('/api/dashboard', dashboardRouter);

// Serve static files
app.use(express.static('build'));

// Socket.io
io.on('connection', (socket) => {
  // Makes the user join a room
  socket.on('JOIN_ROOM', (room, fn) => {
    // Join room
    socket.join(room);

    // Get all socket data
    const clients = io.sockets.adapter.rooms.get(room);
    let dmExists = false;
    io.sockets.sockets.forEach((client) => {
      if (client.data.clientType === 'dm') dmExists = true;
    });

    // Check if the dm already exists
    if (clients && clients.size === 1 || !dmExists) {
      socket.data.clientType = 'dm';
      fn('dm');
    } else {
      socket.data.clientType = 'player';
      fn('player');
    }
  });

  socket.on('UPDATE_PLAYER_LIST', (room) => {
    let clientList = [];
    const clients = io.sockets.adapter.rooms.get(room);
    for (const clientId of clients) {
      const clientSocket = io.sockets.sockets.get(clientId);
      clientList.push(clientSocket.data.nickname);
    }
    io.to(room).emit('UPDATE_PLAYER_LIST', clientList);
  });

  socket.on('PLACE_TOKEN', (cell, token, username, room) => {
    socket.join(room);
    io.to(room).emit('PLACE_TOKEN', cell, token, username);
  });

  socket.on('REMOVE_OCCUPIED_TOKEN_SPACE', (lastPosX, lastPosY, size, room) => {
    io.to(room).emit('REMOVE_OCCUPIED_TOKEN_SPACE', lastPosX, lastPosY, size);
  });

  socket.on('REMOVE_TOKEN', (cell, room) => {
    socket.join(room);
    io.to(room).emit('REMOVE_TOKEN', cell);
  });

  socket.on('SELECT_MAP', (e, map, room) => {
    selectedMap = [{e}, {map}];
    io.to(room).emit('SELECT_MAP', e, map);
  });
});


const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('=======================');
});
