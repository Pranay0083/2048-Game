const gridDisplay = document.querySelector('.grid')
 const resultDisplay = document.getElementById('result')
  let squares = []
  const width = 4
// const total_score = parseInt(document.querySelector('#score').textContent)



// Part 1: Create the Board
function createBoard() {
  for (let i = 0; i < 16; i++) {
    let square = document.createElement('div');
    square.innerHTML = 0;
    gridDisplay.appendChild(square);
    squares.push(square);
  }
  generate(); // Part 2: Call generate function to add initial numbers
  generate();
}
createBoard();
// Part 2: Generate a New Number
function generate() {
  let emptySquares = squares.filter(square => square.innerHTML == '0');
  if (emptySquares.length > 0) {
    let randomSquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    randomSquare.innerHTML = Math.random() < 0.9 ? '2' : '4';
  }
}

  function shiftRight() {
    for (let i=0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML
        let totalTwo = squares[i+1].innerHTML
        let totalThree = squares[i+2].innerHTML
        let totalFour = squares[i+3].innerHTML
        let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

        let filteredRow = row.filter(num => num)
        let missing = 4 - filteredRow.length
        let zeros = Array(missing).fill(0)
        let newRow = zeros.concat(filteredRow)

        squares[i].innerHTML = newRow[0]
        squares[i +1].innerHTML = newRow[1]
        squares[i +2].innerHTML = newRow[2]
        squares[i +3].innerHTML = newRow[3]
      }
    }
  }

  function shiftLeft() {
    for (let i=0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML
        let totalTwo = squares[i+1].innerHTML
        let totalThree = squares[i+2].innerHTML
        let totalFour = squares[i+3].innerHTML
        let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

        let filteredRow = row.filter(num => num)
        let missing = 4 - filteredRow.length
        let zeros = Array(missing).fill(0)
        let newRow = filteredRow.concat(zeros)

        squares[i].innerHTML = newRow[0]
        squares[i +1].innerHTML = newRow[1]
        squares[i +2].innerHTML = newRow[2]
        squares[i +3].innerHTML = newRow[3]
      }
    }
  }

// Part 5: Movement - Up
  function shiftUp() {
    for (let i=0; i < 4; i++) {
      let totalOne = squares[i].innerHTML
      let totalTwo = squares[i+width].innerHTML
      let totalThree = squares[i+(width*2)].innerHTML
      let totalFour = squares[i+(width*3)].innerHTML
      let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

      let filteredColumn = column.filter(num => num)
      let missing = 4 - filteredColumn.length
      let zeros = Array(missing).fill(0)
      let newColumn = filteredColumn.concat(zeros)

      squares[i].innerHTML = newColumn[0]
      squares[i +width].innerHTML = newColumn[1]
      squares[i+(width*2)].innerHTML = newColumn[2]
      squares[i+(width*3)].innerHTML = newColumn[3]
    }
  }

//Part 6 moveDown
 function shiftDown() {
    for (let i=0; i < 4; i++) {
      let totalOne = squares[i].innerHTML
      let totalTwo = squares[i+width].innerHTML
      let totalThree = squares[i+(width*2)].innerHTML
      let totalFour = squares[i+(width*3)].innerHTML
      let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

      let filteredColumn = column.filter(num => num)
      let missing = 4 - filteredColumn.length
      let zeros = Array(missing).fill(0)
      let newColumn = zeros.concat(filteredColumn)

      squares[i].innerHTML = newColumn[0]
      squares[i +width].innerHTML = newColumn[1]
      squares[i+(width*2)].innerHTML = newColumn[2]
      squares[i+(width*3)].innerHTML = newColumn[3]
    }
  }

// Part 7: Combining Tiles Row
let score=0;
function combineRow() {
  for (let i = 0; i < 15; i++) {
    if (i % 4 !== 3 && squares[i].innerHTML === squares[i + 1].innerHTML && squares[i].innerHTML !== '0') {
      let combinedTotal = parseInt(squares[i].innerHTML) * 2;
      squares[i].innerHTML = combinedTotal;
      squares[i + 1].innerHTML = 0;
      score += combinedTotal;
      document.querySelector('#score').textContent = score;
    }
  }
}

// Part 8: Combining Tiles Column
function combineColumn() {
  for (let i = 0; i < 4; i++) { // Iterate Over each column
    for (let j = 0; j < 12; j += 4) { // Iterate through tiles in a column
      if (squares[j + i].innerHTML === squares[j + i + 4].innerHTML && squares[j + i].innerHTML !== '0') {
        let combinedTotal = parseInt(squares[j + i].innerHTML) * 2;
        squares[j + i].innerHTML = combinedTotal; // Combine current and next tile
        squares[j + i + 4].innerHTML = '0'; // Set next tile to 0
        if (combinedTotal==0){
            document.querySelector("#result").innerText="Game Over!";
        }
        score += combinedTotal;
        document.querySelector('#score').textContent = score;
        
      }
    }
  }
}



  //assign functions to keyCodes
  function control(e) {
    if(e.keyCode === 37) {
      keyLeft()
    } else if (e.keyCode === 38) {
      keyUp()
    } else if (e.keyCode === 39) {
      keyRight()
    } else if (e.keyCode === 40) {
      keyDown()
    }
  }
   document.addEventListener('keyup', control);

  function keyRight() {
    shiftRight()
    combineRow()
    shiftRight()
    checkForWin(squares)
    generate()
    if (gameOver(squares)){
      document.querySelector("#result").textContent = "Game Over";
    }
  }

  function keyLeft() {
    shiftLeft()
    combineRow()
    shiftLeft()
    checkForWin(squares)
    generate()
    if (gameOver(squares)){
      document.querySelector("#result").textContent = "Game Over";
      
    }
  }

  function keyUp() {
    shiftUp()
    combineColumn()
    shiftUp()
    checkForWin(squares)
    generate()
    if (gameOver(squares)){
      document.querySelector("#result").textContent = "Game Over";
    }
  }

  function keyDown() {
    shiftDown()
    combineColumn()
    shiftDown()
    checkForWin(squares)
    generate()
    if (gameOver(squares)){
      document.querySelector("#result").textContent = "Game Over";
    }
  }

//Game Over Detection
function gameOver(squares){
    let flag1 = true;
    for (let key of squares){
        if (key.textContent == 0){
            return false
        }
    }
    if (flag1){
        for (let i = 0; i < 4; i++){
            let row = [];
            for (let j = 0; j < 4; j++){
                row.push(squares[4*i+j].textContent)
            }
            let col = [];
            for (let j = 0; j < 4; j++){
                col.push(squares[4*j+i].textContent)
            }

            for (let a = 0; a < 3; a++){
                if (row[a] == row[a+1]){
                    return false
                }
                if (col[a] == col[a+1]){
                    return false
                }
            }
        }
    }
    return true
}

function checkForWin(squares){
  for (let i of squares){
    if (i.textContent == 2048){
      document.querySelector("#result").textContent = "YOU WIN";
      document.removeEventListener('keyup', control);
    }
  }
}



function restartGame(){
  for (let i of squares){
    i.textContent = 0
  }
  generate();
  generate();
  document.querySelector('#score').textContent = 0;
  document.querySelector("#result").innerHTML = "Join the numbers and get to the <b>2048</b> tile!";
}

const btn = document.querySelector("#restart-button")
btn.addEventListener('click', restartGame)