const Square = ({id, player}) => {
  const [color, setColor] = React.useState("lightblue")
  const pallette = ['pink', 'lightgreen', 'lightblue', 'black']

  const getRandomColor = () => pallette[Math.floor(Math.random()*pallette.length)]

  return(
    <button onClick = { e => {
      setColor(getRandomColor())
      e.target.style.background = color}
    }>
      {/* <h1>{id}</h1> */}
      <h1>{player}</h1>
    </button>)
}

const Board = () => {
  const [player, setPlayer] = React.useState(1);
  let status = `Player ${player}`;

  const renderSquare = (i) => {return <Square id={i} player={player}></Square>}

  return (    // onClick onFocus onChange can be captured/responded
    <div className="game-board">
      <div className="grid-row">
        { renderSquare(0) }{ renderSquare(1) }{ renderSquare(2) }
      </div>
      <div id="info"><h1>{status}</h1>
      </div>
    </div>
  );
};

ReactDOM.render(<Board />, document.getElementById("root"));
