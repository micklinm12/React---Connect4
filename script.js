class App extends React.Component {

    constructor(props) {
        super(props);
        this.boardWidth = 7,
        this.boardHeight = 6,
        this.state = {
            game_running: false,
            board: [],
            player_turn: "BLACK",
            winner: false,
        };
    }
    
    render () {
        return (
            <div>
              <button onClick={this.initializeRows}>Start Game</button>
              <h2>{this.renderStatus()}</h2>
              <p></p>
              <table>
                <tbody>
                  {this.state.board.map((col, i) => {
                    return (
                      <tr key={i}>
                        {col.map((cell, j) => {
                          return (
                            <td key={j} data-index1={i} data-index2={j} onClick = {() => {this.updateBoard(j)}}>
                              {this.renderToken(this.state.board[i][j])}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>

            </div>
        );
    }


    initializeRows = () => {
        const rows = [];
        for (let i = 0; i < this.boardHeight; i++) {
            const col = [];
            for (let j = 0; j < this.boardWidth; j++) {
                col.push("");
            }
        rows.push(col);
        }
        this.setState ({
            board: rows,
            player_turn: "BLACK",
            game_running: true,
            winner: false
        });
    }

    updateBoard = (col) => {
      if (this.state.game_running === true) {
        this.setState((state) => {
          for (let row=this.boardHeight-1; row>=0; row--) {
            if (state.board[row][col] === "") {
              if (this.state.player_turn === "BLACK") {
                state.board[row][col] = 1;
                this.switchPlayer();
                return {board: state.board};
              } else if (this.state.player_turn === "RED") {
                state.board[row][col] = 2;
                this.switchPlayer()
                return {board: state.board};
              }
            }
          }
          return;
        });
      }
    } 

    renderToken = (x) => {
      if (x === 1) {
        return (
          <svg>
            <circle className="circle-black" />
          </svg>
        );
      } else if (x===2) {
        return (
          <svg>
            <circle className="circle-red" />
          </svg>
        );
      } else {
        return;
      }
    }

    renderStatus = () => {
      if (this.state.winner === true) {
        return(
          this.displayWinner(this.state.player_turn)
        );
      } else if (this.state.game_running === true) {
        return (
          <div>
            Player Turn: <span className={this.state.player_turn === "BLACK"? "black" : "red"}>{this.state.player_turn}</span>
          </div>
        );
      } else{
        return;
      }
    }

    switchPlayer = () => {
      this.setState ((state) => {
        if (state.player_turn === "BLACK") {
          return {player_turn: "RED"};
        }
        else {
          return {player_turn: "BLACK"};
        }
      }
      , this.isWinner);
    }


    isWinner = () => {
      this.setState((state) => {
        
        for (let i = 0; i < this.boardHeight-3; i++) {
          for (let j = 0; j < this.boardWidth; j++) {
            const square = this.state.board[i][j];
            if (square != "") {
              if (state.board[i+1][j] === square && state.board[i+2][j] === square && state.board[i+3][j] === square) {
                return {winner: true, game_running: false}
              }
            }
          }
        }

        for (let i = 0; i < this.boardHeight; i++) {
          for (let j = 0; j < this.boardWidth-3; j++) {
            const square = this.state.board[i][j];
            if (square != "") {
              if (state.board[i][j+1] === square && state.board[i][j+2] === square && state.board[i][j+3] === square) {
                return {winner: true, game_running: false}
              }
            }
          }
        }

        for (let i = 0; i < this.boardHeight-3; i++) {
          for (let j = 0; j < this.boardWidth-3; j++) {
            const square = this.state.board[i][j];
            if (square != "") {
              if (state.board[i+1][j+1] === square && state.board[i+2][j+2] === square && state.board[i+3][j+3] === square) {
                return {winner: true, game_running: false}
              }
            }
          }
        }
        
        for (let i = 0; i < this.boardHeight-3; i++) {
          for (let j = 3; j < this.boardWidth; j++) {
            const square = this.state.board[i][j];
            if (square != "") {
              if (state.board[i+1][j-1] === square && state.board[i+2][j-2] === square && state.board[i+3][j-3] === square) {
                return {winner: true, game_running: false}
              }
            }
          }
        }

        return;
      });
    }

  displayWinner = (player) => {
    let player_went = "";
    if (player === "BLACK") {
      player_went = "RED";
    } else if (player === "RED") {
      player_went = "BLACK";
    }
    return (
      <div>
        PLAYER: <span className={player_went === "BLACK" ? "black" : "red"}>{player_went}</span> HAS WON!
      </div>
    )    
  }

}

ReactDOM.render(<App />, document.querySelector("#app"));

