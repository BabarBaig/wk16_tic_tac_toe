const Square = ({ takeTurn, id }) => {
  // id = square's number
  // filled = square has been filled
  // tik = symbol in square (same as player)
  // takeTurn() tells parent (Board) this square is filled
  const mark = ['O', 'X', '+']
  const [filled,  setFilled]  = React.useState(false)
  const [tik,     setTik]     = React.useState(2) // initially tik = '+'
  const [mounted, setMounted] = React.useState(true);

  const toggle = () => setMounted(!mounted)

  if (!mounted) return null

  return(
    <button
      id={`square-button-${id}`}
      onClick = { () => {
        setTik(takeTurn(id))  // call board for planer, and set it here
        setFilled(true)
        toggle()              // trigger on buttonClick!
      }}
    >
      <h1>{ mark[tik] }</h1>
    </button>
  )
}

const Board = () => {
  const [player,    setPlayer]    = React.useState(1);  // 1st player is 1 (X)
  const [gameState, setGameState] = React.useState([]);

  const takeTurn = (id) => {
    setGameState([...gameState, { id: id, player: player }]);
    setPlayer((player + 1) % 2)
    return player
  }

  const renderSquare = (i) => {
    // use props to pass callback  function to child (Square)
    return <Square takeTurn={takeTurn} id={i}></Square>;
  }

  return (
    <div className="game-board">
      <div className="grid-row">
        { renderSquare(0) } { renderSquare(1) } { renderSquare(2) }
      </div>
    </div>
  );
};

const Game = () => {
  return (
    <div className="game">
      <Board></Board>
    </div>
  )
}

ReactDOM.render(<Game />, document.getElementById('root'));
