
const Gameboard = (() => {
  const gameboard = ["", "", "", "", "", "", "", "", ""];

  function changeValue(idx, value) {
    if (
      (idx >= 0 && idx < 9 &&  (gameboard[idx] === "") &&
        (value === "X" || value === "x" ||  value === "O" || value === "o"))
    ) {
      gameboard[idx] = value.toUpperCase();
      return true;
    }
  }
  function getGameboard() {
    return gameboard;
  }
  function resetGameboard() {
    gameboard.forEach((_, idx) => {
      gameboard[idx] = "";
    })
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
    for (let [index, field] of fields.entries()) {
      field.textContent = gameboard.getGameboard()[index];
    }
    
  }
  function checkIfWon(){
    const allEqual = arr => arr.every(val => val === arr[0] && val !== "");
    const gameboardFields = gameboard.getGameboard();
    //rows
    if ((allEqual(gameboardFields.slice(0, 3)))){
        return true;
      }
    if ((allEqual(gameboardFields.slice(3, 6)))){
        return true;
      }
    if ((allEqual(gameboardFields.slice(6, 9)))){
        return true;
      }
    //columns
    for (let i = 0; i < 3; i++) {
      const column = [gameboardFields[i], gameboardFields[i+3], gameboardFields[i+6]];
      if (allEqual(column)){
        return true;
      }
    }
    //crosses
    const crossLeft = [gameboardFields[0], gameboardFields[4], gameboardFields[8]];
    const crossRight = [gameboardFields[2], gameboardFields[4], gameboardFields[6]];
    if ((allEqual(crossLeft)) || allEqual(crossRight)){
      return true;
    }

  }
  return { addPlayer, getPlayers, renderGameboard, renderPlayers , checkIfWon };
})();

let currentPlayer = null;
let currentSign = "X";
const fields = document.querySelectorAll(".gameboard-field");


function initializeGame() {
  const player1 = Player("player1", "X");
  const player2 = Player("player2", "O");
  currentPlayer = player1;
  currentSign = currentPlayer.getSign();
  displayController.addPlayer(player1);
  displayController.addPlayer(player2);
  displayController.renderGameboard();
  displayController.renderPlayers();
}
function playGame() {
  getInput();//1

  fields.forEach(field => {
    field.addEventListener("click", () =>{
      if(Gameboard.changeValue(field.id, currentSign)){
        displayController.renderGameboard();
        if(displayController.checkIfWon()){
          currentPlayer.addPoints(1);
          enableOrDisableChildren('.gameboard', true);
        }
        else if( !Gameboard.getGameboard().includes("")){
          console.log('its a tie');
          enableOrDisableChildren('.gameboard', true);
          const resetButton = document.querySelector("#reset");
          resetButton.hidden = false;
        }
        // Gameboard.resetGameboard();
        displayController.renderPlayers();
        currentPlayer = (currentPlayer === displayController.getPlayers()[0]) ? displayController.getPlayers()[1] : displayController.getPlayers()[0];
        currentSign = currentPlayer.getSign();
      };

    });

  });
  // const container = document.querySelector(".container");
  // const button = document.createElement('button');
  // button.textContent = "Play";
  // button.addEventListener('click', () =>{
  // Gameboard.resetGameboard();
  //  console.log(Gameboard.getGameboard());
  // })
  // container.appendChild(button);

}
function Game(){
  initializeGame();
  playGame();

}
Game();

function getInput() {

  
}
function enableOrDisableChildren(parent, disable){
  let childNodes = document.querySelector(parent).querySelectorAll('*');
  for (let node of childNodes) {
      node.disabled = disable;
  }
}
