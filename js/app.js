$(document).foundation()

//1. Add image on click.
    //1a. Alternate between X and O.
    //1b. Only add image if space is empty.
//2. Check for winner.
    //2a. 3 horizontal, 3 vertical, 2 diagonal
    //2b. Output Player # Wins if there is a winner and stop game from playing
    //2c. If turn 9 is reached with no winner, output that there is a draw
//3. New game functionality
//4. Generate random color each game for Xs and Os to make it more fun!!
//5. Show current player's turn


var turnOdd, gamePlaying, turnNumber, color1, color2;

init();

function init() {
  turnOdd = false;
  gamePlaying = true;
  turnNumber = 0;
  document.getElementById('winner1').textContent = 'Winner!';
  document.getElementById('winner2').textContent = 'Winner!';
  document.getElementById('winner1').style.display = 'none';
  document.getElementById('winner2').style.display = 'none';
  emptyRow(11, 12, 13);
  emptyRow(21, 22, 23);
  emptyRow(31, 32, 33);
  color1 = getRandomColor();
  color2 = getRandomColor();
  document.getElementById('player1-panel').style.color = color1;
  document.getElementById('player2-panel').style.color = color2;
}

function makeMove(space){
  if(gamePlaying){
    if(checkEmpty(space) === true) {
      turnNumber++;
      if(turnOdd === false) {
        document.getElementById('space_' + space).style.color = color1;
        document.getElementById('space_' + space).innerHTML = "X";
      }
      else {
        document.getElementById('space_' + space).style.color = color2;
        document.getElementById('space_' + space).innerHTML="O";
      }
      //toggleActivePlayer();

      //Check if the player wins
      //Check rows
      checkWin(11, 12, 13);
      checkWin(21, 22, 23);
      checkWin(31, 32, 33);
      //Check columns
      checkWin(11, 21, 31);
      checkWin(12, 22, 32);
      checkWin(13, 23, 33);
      //Check diagonals
      checkWin(11, 22, 33);
      checkWin(13, 22, 31);

      turnOdd === false ? turnOdd = true : turnOdd = false;
    }
  }

  if(gamePlaying && turnNumber === 9) {
    document.getElementById('winner1').textContent = 'Draw!';
    document.getElementById('winner2').textContent = 'Draw!';
    document.getElementById('winner1').style.display = 'block';
    document.getElementById('winner2').style.display = 'block';
  }
}

function checkWin(a, b, c) {
  //Check if spaces are Xs or Os. Each X adds 1, each O subtracts 1.
  //3 means Player 1 wins. -3 means Player 2 wins.

  var winScore = 0;
  
  winScore += checkValue(a);
  winScore += checkValue(b);
  winScore += checkValue(c);

  if(winScore === 3) {
    document.getElementById('winner1').style.display = 'block';
    gamePlaying = false;
  }
  else if(winScore === -3) {
    document.getElementById('winner2').style.display = 'block';
    gamePlaying = false;
  }

  function checkValue(space) {
    if(document.getElementById('space_' + space).innerHTML === "X"){
     return 1;
    }
    else if(document.getElementById('space_' + space).innerHTML === "O"){
      return -1;
    }
    else{
      return 0;
    }
  }
}

function checkEmpty(space) {
  if(document.getElementById('space_' + space).innerHTML === "X") {
    console.log('Not empty');
    return false;
  } 
  else if (document.getElementById('space_' + space).innerHTML === "O"){
    console.log('Not empty');
    return false;
  }
  else {
    console.log('Empty');
    return true;
  }
}

function emptyRow(a, b, c) {
  document.getElementById('space_' + a).innerHTML = '';
  document.getElementById('space_' + b).innerHTML = '';
  document.getElementById('space_' + c).innerHTML = '';
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// function toggleActivePlayer() {
//   document.querySelector('.player1-panel').classList.toggle('active');
//   document.querySelector('.player2-panel').classList.toggle('active');
// }