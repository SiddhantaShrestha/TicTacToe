import "./App.css";
import { useState, useEffect } from "react";
import Square from "./Components/Square";
import { Patterns } from "./Components/Patterns";

function App() {
  //state to handle the 9 squares of the game
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);

  //state to handle the turns of the players
  const [player, setPlayer] = useState("O");

  const [result, setResult] = useState({ winner: "none", state: "none" });

  //call the useEffect each time board has been updated
  useEffect(() => {
    checkWin();
    checkTie();
    //Switching turns
    if (player == "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
  }, [board]);

  useEffect(() => {
    //when the winning pattern is found
    if (result.state != "none") {
      alert(`Game Finished! Winner : ${result.winner}`);
      restartGame();
    }
  }, [result]);

  const chooseSquare = (square) => {
    setBoard(
      board.map((val, index) => {
        if (index == square && val == "") {
          //val == "" in order to not allow overwriting an already selected square
          return player;
        }
        return val;
      })
    );
  };

  const checkWin = () => {
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer == "") return;

      //assigning a boolean value to confirm winning pattern
      let foundWinningPattern = true;
      currPattern.forEach((index) => {
        if (board[index] != firstPlayer) {
          // setting the boolean to false if the pattern isnt achieved by the same player
          foundWinningPattern = false;
        }
      });

      if (foundWinningPattern) {
        setResult({ winner: player, state: "won" });
      }
    });
  };

  const checkTie = () => {
    let filled = true;
    board.forEach((square) => {
      if (square == "") {
        filled = false;
      }
    });

    if (filled == true) {
      setResult({ winner: "No one", state: "Draw" });
    }
  };

  //Restarting the game by setting the board to its initial state
  const restartGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("X");
  };
  return (
    <div className="App">
      <div className="board">
        <div className="row">
          <Square
            val={board[0]}
            chooseSquare={() => {
              chooseSquare(0);
            }}
          />
          <Square
            val={board[1]}
            chooseSquare={() => {
              chooseSquare(1);
            }}
          />
          <Square
            val={board[2]}
            chooseSquare={() => {
              chooseSquare(2);
            }}
          />
        </div>
        <div className="row">
          <Square
            val={board[3]}
            chooseSquare={() => {
              chooseSquare(3);
            }}
          />
          <Square
            val={board[4]}
            chooseSquare={() => {
              chooseSquare(4);
            }}
          />
          <Square
            val={board[5]}
            chooseSquare={() => {
              chooseSquare(5);
            }}
          />
        </div>
        <div className="row">
          <Square
            val={board[6]}
            chooseSquare={() => {
              chooseSquare(6);
            }}
          />
          <Square
            val={board[7]}
            chooseSquare={() => {
              chooseSquare(7);
            }}
          />
          <Square
            val={board[8]}
            chooseSquare={() => {
              chooseSquare(8);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
