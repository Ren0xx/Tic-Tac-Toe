let currentSign = "o";
let currentPlayer = "";


const Gameboard = (() => {
  const gameboard = ["", "", "", "", "", "", "", "", ""];

  function changeValue(idx, value) {
    if (
      (idx >= 0 &&
        idx < 9 &&
        gameboard[idx] === "" &&
        (value === "X" || value === "x")) ||
      value === "O" ||
      value === "o"
    ) {
      gameboard[idx] = value.toUpperCase();
    }
  }
  function getGameboard() {
    return gameboard;
  }

  return { getGameboard, changeValue };
})();

const Player = (name, sign) => {
  let score = 0;
  const getName = () => name || "anonymous";
  const getScore = () => score;
  const getSign = () => sign;
  const addPoints = (points) => {
    score += points;
  };
  return { getName, getScore, getSign, addPoints };
};

const displayController = (() => {
  const players = [];
  const gameboard = Gameboard;

  //Players
  function addPlayer(player) {
    players.push(player);
  }
  function getPlayers() {
    return players;
  }
  function renderPlayers() {
    const playerDiv = document.querySelectorAll(".player1, .player2");
    for (let [index, player] of playerDiv.entries()) {
      const name = player.querySelector(".name");
      name.textContent = players[index].getName();
	  
      const score = player.querySelector(".score");
	    score.textContent = players[index].getScore();
    }
    
  }

  //Gameboard
  function renderGameboard() {
    const fields = document.querySelectorAll(".gameboard-field");

    for (let [index, field] of fields.entries()) {
      field.textContent = gameboard.getGameboard()[index];
      field.addEventListener("click", () => {
        gameboard.changeValue(index, currentSign); //changing the value of the array
        field.textContent = gameboard.getGameboard()[index];//changing the value in the display (on the page)
        // renderPlayers();
      });
    }
    
  }
  function checkIfWon(){
    if ((gameboard.getGameboard().slice(0, 3).every(el => el === "X" || el === "O"))){
        console.log('you have won');
      }
    // if (!(gameboard.getGameboard().slice(0, 3).includes(""))){
    //     console.log('you have won');
    //   }
    // if (!(gameboard.getGameboard().slice(0, 3).includes(""))){
    //     console.log('you have won');
    //   }
    // if (!(gameboard.getGameboard().slice(0, 3).includes(""))){
    //     console.log('you have won');
    //   }
    // if (!(gameboard.getGameboard().slice(0, 3).includes(""))){
    //     console.log('you have won');
    //   }
    // if (!(gameboard.getGameboard().slice(0, 3).includes(""))){
    //     console.log('you have won');
    //   }
    // if (!(gameboard.getGameboard().slice(0, 3).includes(""))){
    //     console.log('you have won');
    // }
  }

  return { addPlayer, getPlayers, renderGameboard, renderPlayers , checkIfWon };
})();

function initializeGame() {
  const player1 = Player("player1", "X");
  const player2 = Player("player2", "O");
  displayController.addPlayer(player1);
  displayController.addPlayer(player2);
  displayController.renderGameboard();
  displayController.renderPlayers();
  
}
function playGame() {
  const game = document.querySelector(".gameboard");
  game.addEventListener("click", (event) => {
  displayController.renderGameboard();
  displayController.renderPlayers();
  displayController.checkIfWon();
    })
}

initializeGame();
playGame();

