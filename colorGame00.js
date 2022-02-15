const Square = ({ id, newState }) => {
  // id = square's number
  // filled = square has been filled
  // tik = symbol in square (same as player)
  // takeTurn() tells parent (Board) this square is filled
  // const [filled,  setFilled]  = React.useState(false)
  // const [tik,     setTik]      = React.useState(2) // initially tik = '+'
  // const [mounted, setMounted]  = React.useState(true);

  const [color,   setColor]    = React.useState('green')
  const [status,  setStatus]   = React.useState(null) // 'X' or 'O'
  // const pallette = ['red', 'green', 'blue']
  const pallette = ['green', 'blue']

  const getRandomColor = () => pallette[Math.floor(Math.random()*pallette.length)]
  const XorO = ['O', 'X']

  React.useEffect(() => {
    console.log('Render ${id}')
    return () => console.log(`unmounting square ${id}`)
  })

  // const toggle = () => setMounted(!mounted)
  // if (!mounted) return null

  return(
    <button
      onClick = { e => {
        let col = getRandomColor()
        setColor(col)
        const nextPlayer = newState(id) // /Board.newState() is returning nextPlayer
        setStatus(nextPlayer)   // update Square with newPlayer info
        e.target.style.background = col   // setColor is async, so we directly update color in DOM
        // setTik(takeTurn(id))  // call board for player, and set it here
        // setFilled(true)
        // toggle()              // trigger on buttonClick!
      }}
    >
      <h1>{XorO[status]}</h1>
    </button>
  )
}

const Board = () => {
  const [player, setPlayer]  = React.useState(1);  // 1st player is 1 (X)
  const [state,  setState]   = React.useState(Array(9).fill(null));
  const [random, setRandom]  = React.useState(0)
  const OorX = ['O', 'X']
  let status = `Player ${player}`   // continually updated during the game
  let winner = checkWinner(state)
  if (winner != null)   status = `Player ${OorX[winner]} wins!`
  else                  status = 'No Winner Yet'

  const newState = squareId => {
    let playerCur = player
    state[squareId] = player    // present player
    setState(state)   // state is array[9] of 0, 1, null
    let nextPlayer = (player + 1) % 2
    setPlayer(nextPlayer)
    return playerCur
  }

  const reRender = () => {
    console.log('In reRender()')
    setRandom(Math.random())
  }

  const takeTurn = (id) => {
    setGameState([...gameState, { id: id, player: player }]);
    setPlayer((player + 1) % 2)
    return player
  }

  const renderSquare = (i) => {
    // use props to pass callback  function to child (Square)
    return <Square id={i} takeTurn={takeTurn} newState={newState}></Square>;
  }

  function checkWinner(state){
    // following 8 states are winners
    const win = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 2, 6],
    ]
    for (let i = 0; i < win.length; i++){   // search for a winning row/col
      const [j, k, l] = win[i]
      // make sure we have a winning row and there is no null present
      if ((state[j] == state[k]) && (state[k] == state[l]) && state[j] != null)
        return state[j]   // we found a winner!
    }
    return null
  }

  return (
    <div className="game-board">
      <div className="grid-row">
        { renderSquare(0) } { renderSquare(1) } { renderSquare(2) }
      </div>
      <div className="grid-row">
        { renderSquare(3) } { renderSquare(4) } { renderSquare(5) }
      </div>
      <div className="grid-row">
        { renderSquare(6) } { renderSquare(7) } { renderSquare(8) }
      </div>
      <div id="info">
        <button>Show/Hide Row</button>
        <button onClick={reRender}>Re-render</button>
        <h1>Next Player: {OorX[player]}</h1>
        <h1>{status}</h1>
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
