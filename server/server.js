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

app.use('/api/user', userRouter);

// Serve static files
app.use(express.static('build'));


// Socket.io
io.on('connection', (socket) => {
  // socket.on('USER_DISCONNECT', (room, id) => {
  //   let deleteList = [];
  //   let clientList = [];    
  //   const clients = io.sockets.adapter.rooms.get(room);
  //   for (const clientId of clients) {
  //     const clientSocket = io.sockets.sockets.get(clientId);
  //     clientList.push(clientSocket.data.nickname);
  //     deleteList.push(clientSocket.id);
  //   }

  //   for (const client of deleteList) {
  //     if (client === id) {
  //       clientList.splice(deleteList.indexOf(client), 1);
  //     }
  //   }
  //   io.to(room).emit('UPDATE_PLAYER_LIST', clientList);
  // });

  // Makes the user join a room
  socket.on('JOIN_ROOM', (userType, room, fn) => {
    // Create client object
    const client = {
      id: socket.id,
      clientType: userType
    };

    // Check if room already exists
    if (io.sockets.adapter.rooms.has(room)) {
      if (userType !== 'dm'){
        // If user is a player, then join
        socket.join(room);
        fn(true, client);
      } else {
        fn(false, {});
      }
    } else if (userType === 'dm') {
      // If user is a dm, then create a room
      socket.join(room);
      fn(true, client);
    } else {
      fn(false, {});
    }
  });

  socket.on('SET_NAME', (name) => {
    socket.data.nickname = { nickname: name };
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

/** Listen * */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('=======================');
});
