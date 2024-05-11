const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http');
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(cors());
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
const assetRouter = require('./routes/asset.router');

app.use('/api/user', userRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/character', characterRouter);
app.use('/api/creature', creatureRouter);
app.use('/api/map', mapRouter);
app.use('/api/asset', assetRouter);

// Serve static files
app.use(express.static('build'));

app.get('*', function (req, res) {
  const index = path.join(__dirname, '..', 'build', 'index.html');
  res.sendFile(index);
});

// Socket.io
io.on('connection', (socket) => {
  // Makes the user join a room
  socket.on('JOIN_ROOM', (username, room, fn) => {
    // Join room
    socket.join(room);

    // Get all socket data
    const clients = io.sockets.adapter.rooms.get(room);
    clients.forEach((clientId) => {
      const clientSocket = io.sockets.sockets.get(clientId);
      clientSocket.data.username = username;
    });

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

  socket.on('GET_PLAYER_LIST', (room, fn) => {
    let clientList = [];
    const clients = io.sockets.adapter.rooms.get(room);
    clients.forEach((clientId) => {
      const clientSocket = io.sockets.sockets.get(clientId);
      clientList.push(clientSocket.data.username);
    });
    fn(clientList);
  });

  socket.on('MOVE_TOKEN', (token, room) => {
    io.to(room).emit('MOVE_TOKEN', token);
  });

  socket.on('RESIZE_TOKEN', (token, dir, room) => {
    io.to(room).emit('RESIZE_TOKEN', token, dir);
  });

  socket.on('ADD_TOKEN_TO_BOARD', (room) => {
    io.to(room).emit('ADD_TOKEN_TO_BOARD');
  });

  socket.on('REMOVE_TOKEN', (token, room) => {
    io.to(room).emit('REMOVE_TOKEN', token);
  });
  
  socket.on('ROLL_DICE', (result, owner, rollType, targets, damageType, room) => {
    io.to(room).emit('ROLL_DICE', result, owner, rollType, targets, damageType);
  });

  socket.on('SELECT_MAP', (map, room) => {
    io.to(room).emit('SELECT_MAP', map);
  });

  socket.on('VIEW_MAP', (map) => {
    socket.emit('VIEW_MAP', map);
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
