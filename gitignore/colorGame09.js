const Board = () => {
  const [player, setPlayer] = React.useState(1);
  let status = `Player ${player}`;
  return (    // onClick onFocus onChange can be captured/responded
    <div className="game-board" onClick={e => {
        setPlayer((player+1)%2);
        status = `Player ${player}`;
        // e.target.style.width = 400
        player ? e.target.style.background = 'lightblue' : e.target.style.background = 'lightpink'
      }}>
      <div id="info"><h1>{status}</h1>
      </div>
    </div>
  );
};

ReactDOM.render(<Board />, document.getElementById("root"));
