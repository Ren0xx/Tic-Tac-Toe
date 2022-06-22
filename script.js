const Gameboard = (() => {
  const gameboard = ["", "", "", "", "", "", "", "", ""];

  function changeValue(idx, value) {
    if (idx >= 1 && idx < 9 
        && (value === "X" || value === "x") || (value === "O" || value === "o")
        && gameboard[idx] === ''){
        gameboard[idx] = value.toUpperCase();
    }
  }
  function display() {
    return gameboard;
  }
  return { display, changeValue };
})();

const displayController = (() => {
    const players = [];
    function addPlayer(player) {
        players.push(player);
    }
  return {addPlayer}
})();

const Player = (name) => {
  let score = 0;
  const getName = () => name;
  const getScore = () => score;
  const addPoints = (points) => {
    score += points;
  };
  return { getName, getScore, addPoints };
};

const player1 = Player("player1");
Gameboard.changeValue(6, 'o');
console.log(Gameboard.display());


// console.log(player1.getScore());
// player1.addPoints(2);
// console.log(player1.getScore());

// function PlayGame(){
//     initializeGameboard();
// }