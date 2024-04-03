// pages/index.js
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io();

export default function Home() {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [players, setPlayers] = useState({});
  const [currentPlayer, setCurrentPlayer] = useState('');

  useEffect(() => {
    socket.on('board', newBoard => {
      setBoard(newBoard);
    });

    socket.on('players', newPlayers => {
      setPlayers(newPlayers);
    });

    socket.on('currentPlayer', player => {
      setCurrentPlayer(player);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleClick = index => {
    if (board[index] === '' && currentPlayer === players[socket.id]) {
      socket.emit('move', index);
    }
  };

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {board.map((cell, index) => (
          <div key={index} className="cell" onClick={() => handleClick(index)}>
            {cell}
          </div>
        ))}
      </div>
    </div>
  );
}
