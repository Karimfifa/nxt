// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let players = {};
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];

io.on('connection', socket => {
  console.log('a user connected');
  players[socket.id] = currentPlayer;
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  io.emit('players', players);
  socket.emit('currentPlayer', players[socket.id]);
  socket.emit('board', board);

  socket.on('move', index => {
    if (players[socket.id] === currentPlayer && board[index] === '') {
      board[index] = players[socket.id];
      io.emit('board', board);
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    delete players[socket.id];
    io.emit('players', players);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
