// Importing the CSS file for styling
import './App.css';
// Importing the useState hook from React
import { useState } from 'react';

// Functional component for individual square in the game board
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// Functional component for the game board
function Board({ xIsNext, squares, onPlay }) {
  // Handling click event for a square
  function handleClick(i) {
    // If the game is won or the square is already filled, do nothing
    if (calculateWinner(squares) || squares[i])
      return;

    // Create a copy of the current squares array
    const nextSquares = squares.slice();

    // Set 'X' or 'O' 
    if (xIsNext)
      nextSquares[i] = 'X';
    else
      nextSquares[i] = 'O';

    // Trigger the onPlay callback with the updated squares
    onPlay(nextSquares);
  }

  // Determine the winner or the next player
  const winner = calculateWinner(squares);
  let status;
  if (winner)
    status = 'Winner: ' + winner;
  else
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');

  // Render the game board
	return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// Main Game component
export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);  // State for tracking the current player
  const [history, setHistory] = useState([Array(9).fill(null)]); // State for maintaining the game history
	const [currentMove, setCurrentMove] = useState(0);
	const currentSquares = history[currentMove];

  // Callback function to handle a player's move
	function handlePlay(nextSquares) {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
		setXIsNext(!xIsNext);
	}

	function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

	const moves = history.map((squares, move) => {
    let description;
    if (move > 0)
      description = ' Go to move #' + move;
    else
      description = ' Go to game start';

    return (
      <li>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  // Render the overall game structure
  return (
    <div className="game">
      <h1>Tic-Tac-Toe</h1>
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <h2># Actions #</h2>
        <p>Check game action history </p>
        <p>Click to return to a previous action.</p>
        <p>⚠️ | Caution: Avoid overwriting an action</p>
				<ol>{moves}</ol>
      </div>
    </div>
  );
}

// Function to calculate the winner based on the current squares
function calculateWinner(squares) {
  // Define all possible winning combinations
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Check each winning combination
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    // If all squares in a combination have the same value, return the winner
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  // Return null if no winner is found
  return null;
}




// The export JavaScript keyword makes this function accessible outside of this file
/*
function Square() {
	const [value, setValue] = useState(null);

	function handleClick() {
		setValue('X');
		console.log('clicked!');
	}

	return (
		<button className="square" onClick={handleClick}>{value}</button>
	);
}*/

/*
import logo from './logo.svg';
import './App.css';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
*/