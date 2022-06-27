
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
  const addPoints = () => {
    score ++;
  };
  const resetScore = () => score = 0;
  return { getName, getScore, getSign, addPoints, resetScore };
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
let currentSign = null;
const fields = document.querySelectorAll(".gameboard-field");
const playAgainButton = document.querySelector("#playAgainButton");
const resetButton = document.querySelector("#resetButton");


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
  getUserInput();//1

  fields.forEach(field => {
    field.addEventListener("click", () =>{
        checkResult(field);
    });

  });
  playAgainButton.addEventListener("click", () =>{
    PlayAgain();
});
  resetButton.addEventListener("click", () =>{
    PlayAgain(true);
  })

}
function Game(){
  initializeGame();
  playGame();

}
Game();

function getUserInput() {

  
}
function enableOrDisableChildren(parent, disable){
  let childNodes = document.querySelector(parent).querySelectorAll('*');
  for (let node of childNodes) {
      node.disabled = disable;
  }
}

function PlayAgain(scoreReset) {
  enableOrDisableChildren('.gameboard', false);
  Gameboard.resetGameboard();
  displayController.renderGameboard();
  if (scoreReset) {
    displayController.getPlayers()[0].resetScore();
    displayController.getPlayers()[1].resetScore();
    displayController.renderPlayers();
  }
}

function checkResult(field){
  if(Gameboard.changeValue(field.id, currentSign)){
    displayController.renderGameboard();
    //win
    if(displayController.checkIfWon()){
      currentPlayer.addPoints();
      enableOrDisableChildren('.gameboard', true);
      playAgainButton.hidden = false;
      resetButton.hidden = false;
    }
    //tie
    else if(!Gameboard.getGameboard().includes("")){
      enableOrDisableChildren('.gameboard', true);
      playAgainButton.hidden = false;
      resetButton.hidden = false;
    }
    // Gameboard.resetGameboard();
    displayController.renderPlayers();
    currentPlayer = (currentPlayer === displayController.getPlayers()[0]) ? displayController.getPlayers()[1] : displayController.getPlayers()[0];
    currentSign = currentPlayer.getSign();
  };
}

// const container = document.querySelector(".container");
  // const button = document.createElement('button');
  // button.textContent = "Play";
  // button.addEventListener('click', () =>{
  // Gameboard.resetGameboard();
  //  console.log(Gameboard.getGameboard());
  // })
  // container.appendChild(button);