const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http');
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');
const path = require('path');
require('dotenv').config();

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

// Routes
const userRouter = require('./routes/user.router');
const dashboardRouter = require('./routes/dashboard.router');
const characterRouter = require('./routes/character.router');
const creatureRouter = require('./routes/creature.router');
const mapRouter = require('./routes/map.router');
const tokenRouter = require('./routes/token.router');

app.use('/api/user', userRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/character', characterRouter);
app.use('/api/creature', creatureRouter);
app.use('/api/map', mapRouter);
app.use('/api/token', tokenRouter);

// Serve static files
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

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

  socket.on('MOVE_TOKEN', (token, mapId, room) => {
    io.to(room).emit('MOVE_TOKEN', token, mapId);
  });

  socket.on('ADD_TOKEN_TO_BOARD', (x, y, token, mapId, room) => {
    io.to(room).emit('ADD_TOKEN_TO_BOARD', x, y, token, mapId);
  });

  socket.on('REMOVE_TOKEN', (token, room) => {
    io.to(room).emit('REMOVE_TOKEN', token);
  });
  
  socket.on('ROLL_DICE', (result, room) => {
    io.to(room).emit('ROLL_DICE', result);
  });

  socket.on('SELECT_MAP', (map, room) => {
    io.to(room).emit('SELECT_MAP', map);
  });

  socket.on('VIEW_MAP', (map) => {
    socket.emit('VIEW_MAP', map);
  });

  socket.on('SET_GRID', (room) => {
    io.to(room).emit('SET_GRID');
  });

  socket.on('SEND_MESSAGE', (msg, room) => {
    io.to(room).emit('SEND_MESSAGE', msg);
  });
});


const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('=======================');
});
