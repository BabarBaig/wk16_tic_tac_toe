const Square = ({id, player}) => {
  const [color, setColor] = React.useState("lightblue")
  const pallette = ['pink', 'lightgreen', 'lightblue', 'black']

  const getRandomColor = () => pallette[Math.floor(Math.random()*pallette.length)]

  React.useEffect (() => {
    console.log(`Render ${id}`)
    return () => console.log(`unmounting Square ${id}`)
  })

  return(
    <button onClick = { e => {
      console.log(`I'm square ${id}`)
      setColor(getRandomColor())
      e.target.style.background = color}
    }>
      {/* <h1>{id}</h1> */}
      <h1>{player}</h1>
    </button>)
}

const Board = () => {
  const [player,  setPlayer]  = React.useState(1);
  const [mounted, setMounted] = React.useState(true);
  let status = `Player ${player}`;

  const toggle = () => {setMounted(!mounted)}
  const renderSquare = (i) => {return <Square id={i} player={player}></Square>}

  return (    // onClick onFocus onChange can be captured/responded
    <div className="game-board">
      <div className="grid-row">
        { mounted && renderSquare(0) }
        { mounted && renderSquare(1) }
        { mounted && renderSquare(2) }
      </div>
      <div id="info">
        <button onClick={toggle}>Show/Hide Row</button>
        <h1>Turn of player {player}</h1>
      </div>
    </div>
  );
};

ReactDOM.render(<Board />, document.getElementById("root"));
