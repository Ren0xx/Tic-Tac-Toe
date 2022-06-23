const Gameboard = (() => {
  const gameboard = ["X", "", "X", "O", "X", "", "X", "O", "X"];

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
  let currentSign = "o";
  let currentPlayer = "";
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
    const playerDiv = document.querySelectorAll(".player");
    for (let [index,player] of playerDiv.entries()) {
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
        field.textContent = gameboard.getGameboard()[index]; //changing the value in the display (on the page)
      });
    }
  }

  return { addPlayer, getPlayers, renderGameboard, renderPlayers };
})();

function initializeGame() {
  const player1 = Player("player1", "X");
  const player2 = Player("player2", "O");
  displayController.addPlayer(player1);
  displayController.addPlayer(player2);
  displayController.renderGameboard();
  displayController.renderPlayers();
  let [p1, p2] = displayController.getPlayers();
  // Gameboard.changeValue(5, 'o');
  // Gameboard.changeValue(6, 'X');
  // Gameboard.changeValue(7, 'X');
}

initializeGame();

// console.log(player1.getScore());
// player1.addPoints(2);
// // console.log(player1.getScore());

// function PlayGame(){
// }
