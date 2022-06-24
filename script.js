let currentSign = "X";
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
      // currentSign = "O";
      return true;
    }
  }
  function getGameboard() {
    return gameboard;
  }
  function resetGameboard() {
    return gameboard.map(value => "");
  }

  return { getGameboard, changeValue, resetGameboard };
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
        if(gameboard.changeValue(index, currentSign))
        {
          field.textContent = gameboard.getGameboard()[index];//changing the value in the display (on the page)
          
        }; 
      });
    }
    
  }
  function checkIfWon(){
    const gameboardFields = gameboard.getGameboard();
    if ((gameboardFields.slice(0, 3).every(el => el === "X" || el === "O"))){
        console.log('you have won1');
      }
    if ((gameboardFields.slice(3, 6).every(el => el === "X" || el === "O"))){
        console.log('you have won2');
      }
    if ((gameboardFields.slice(6, 9).every(el => el === "X" || el === "O"))){
        console.log('you have won3');
      }
      
    for (let i = 0; i < 3; i++) {
      const column = [gameboardFields[i], gameboardFields[i+3], gameboardFields[i+6]];
      if (column.every(el => el === "X" || el === "O")){
        console.log('hi2');
      }
    }
    const crossLeft = [gameboardFields[0], gameboardFields[4], gameboardFields[8]];
    const crossRight = [gameboardFields[2], gameboardFields[4], gameboardFields[6]];
    if (crossLeft.every(el => el === "X" || el === "O") || crossRight.every(el => el === "X" || el === "O")){
      console.log('win win win');
    }
  }
  return { addPlayer, getPlayers, renderGameboard, renderPlayers , checkIfWon };
})();

function initializeGame() {
 
  const player1 = Player("player1", "X");
  const player2 = Player("player2", "O");//2
  currentPlayer = player1;
  currentSign = currentPlayer.getSign();
  displayController.addPlayer(player1);
  displayController.addPlayer(player2);

  displayController.renderGameboard();
  displayController.renderPlayers();//3
  
}
function playGame() {
  getInput();//1
  const game = document.querySelector(".gameboard");
  game.addEventListener("click", () => {
    displayController.checkIfWon();
    })
}

initializeGame();
playGame();

function getInput() {

  
}
