//Additional Info - Coordinates
// Real Coordinates of Chess
// startPositionId[row][col]
//                  10
//                  9
//                  8
//                  7
//                  6
//                  5 [Row]
//                  4   
//                  3
//                  2
//                  1
// 9 8 7 6 5 4 3 2 1
//     [Column]

// 1) Initialise Variable
// Pieces for Red and Black
const pieces = {
  R: '<div class="red piece" id="chariot"> <img src="../image/xiangqi/redChariot.png" alt="R"> </div>',
  H: '<div class="red piece" id="horse"> <img src="../image/xiangqi/redHorse.png" alt="H"> </div>',
  E: '<div class="red piece" id="elephant"> <img src="../image/xiangqi/redElephant.png" alt="E"> </div>',
  A: '<div class="red piece" id="advisor"> <img src="../image/xiangqi/redAdvisor.png" alt="A"> </div>',
  G: '<div class="red piece" id="general"> <img src="../image/xiangqi/redGeneral.png" alt="G"> </div>',
  C: '<div class="red piece" id="cannon"> <img src="../image/xiangqi/redCannon.png" alt="C"> </div>',
  S: '<div class="red piece" id="soldier"> <img src="../image/xiangqi/redSoldier.png" alt="S"> </div>',
  
  r: '<div class="black piece" id="chariot"> <img src="../image/xiangqi/blackChariot.png" alt="r"> </div>',
  h: '<div class="black piece" id="horse"> <img src="../image/xiangqi/blackHorse.png" alt="h"> </div>',
  e: '<div class="black piece" id="elephant"> <img src="../image/xiangqi/blackElephant.png" alt="e"> </div>',
  a: '<div class="black piece" id="advisor"> <img src="../image/xiangqi/blackAdvisor.png" alt="a"> </div>',
  g: '<div class="black piece" id="general"> <img src="../image/xiangqi/blackGeneral.png" alt="g"> </div>',
  c: '<div class="black piece" id="cannon"> <img src="../image/xiangqi/blackCannon.png" alt="c"> </div>',
  s: '<div class="black piece" id="soldier"> <img src="../image/xiangqi/blackSoldier.png" alt="s"> </div>',
};
  
// 1.2 Board Setting
const xiangqiBoard = document.querySelector("#xiangqiBoard");
const rows = 10;
const cols = 9;

// 1.3 History Setting 
let game_id = getGameIdFromUrl();  // Retrieve the game_id from the URL
let move_number = 0;

// Function to get the game_id from the URL
function getGameIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('game_id');
}

// 1.4 Create Starting Position
// Use 2D array to define starting positions
const startPosition = [
    ['r', 'h', 'e', 'a', 'g', 'a', 'e', 'h', 'r'], // Black back row
    ['', '', '', '', '', '', '', '', ''],          // Empty row
    ['', 'c', '', '', '', '', '', 'c', ''],        // Black Cannons
    ['s', '', 's', '', 's', '', 's', '', 's'],     // Black Soldiers
    ['', '', '', '', '', '', '', '', ''],          // Empty row 
    ['', '', '', '', '', '', '', '', ''],          // Empty row 
    ['S', '', 'S', '', 'S', '', 'S', '', 'S'],     // Red Soldiers
    ['', 'C', '', '', '', '', '', 'C', ''],        // Red Cannons
    ['', '', '', '', '', '', '', '', ''],          // Empty row
    ['R', 'H', 'E', 'A', 'G', 'A', 'E', 'H', 'R'], // Red back row
];

  

//-----------------------------------------------------------------------  
// 2) Create Board Function
function createBoard() {
xiangqiBoard.innerHTML = ''; // Clear existing board

startPosition.forEach((row, rowIndex) => {
    row.forEach((piece, columnIndex) => {
    const square = document.createElement("div");
    square.classList.add("square");

    if (piece) {
        square.innerHTML = pieces[piece];
        square.firstChild.setAttribute("draggable", true);
    }

    square.setAttribute("row-id", rows - rowIndex);
    square.setAttribute("col-id", cols - columnIndex);
    
    xiangqiBoard.appendChild(square);
    });
});
}

createBoard();

// 2.1 Flip Board
function flipBoard() {
  const squares = document.querySelectorAll(".square");

  const boardArray = [];

  // Collect all pieces and their positions
  squares.forEach(square => {
    const piece = square.firstChild;
    const rowId = Number(square.getAttribute("row-id"));
    const colId = Number(square.getAttribute("col-id"));
    if (piece) {
      boardArray.push({ piece, rowId, colId });
    }
  });

  // Clear all squares
  squares.forEach(square => {
    while (square.firstChild) {
      square.removeChild(square.firstChild);
    }
  });

  // Swap the row and column IDs of each square
  squares.forEach(square => {
    const rowId = Number(square.getAttribute("row-id"));
    const colId = Number(square.getAttribute("col-id"));
    square.setAttribute("row-id", rows + 1 - rowId);
    square.setAttribute("col-id", cols + 1 - colId);
  });

  // Place pieces back to their original IDs
  boardArray.forEach(({ piece, rowId, colId }) => {
    const newSquare = document.querySelector(`[row-id="${rowId}"][col-id="${colId}"]`);
    newSquare.appendChild(piece);
  });
}

document.getElementById('flipButton').addEventListener('click', flipBoard);

//-----------------------------------------------------------------------
// 3) History Function
async function fetchHistory() {
    fetch('../php/history_fetch_move.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            game_id: game_id, 
            move_number: move_number
        })
    })
    .then(response => response.json())
        .then(data => {
          if (data.current_position) {
            updateBoardFromFEN(data.current_position);
          } else if (data.original_position) {
            createBoard();
          } else if (data.status) {
            move_number--;
          }
    })
    .catch(error => console.error('Fetch error:', error));
  }
  
  
  fetchHistory();
  
  async function previousMove() {
    // To Prevent Move Number smaller than 0
    if (move_number > 0) { 
      move_number--;
      fetchHistory();
    }
  }
  
  async function nextMove() {
    move_number++;
    fetchHistory();
  }
  
  document.getElementById('previousMove').addEventListener('click', previousMove);
  document.getElementById('nextMove').addEventListener('click', nextMove);

//-----------------------------------------------------------------------
// 4.1 FEN to Board
function updateBoardFromFEN(fen) {
    console.log(fen)
    if (!fen) {
        console.error("Invalid FEN: FEN string is empty or undefined.");
        return;
    }
  
    const parts = fen.split(" ");
    if (parts.length < 2) {
        console.error("Invalid FEN: FEN string does not have the correct format.");
        return;
    }
  
    const rows = parts[0].split("/");
  
    if (rows.length !== 10) {
        console.error("Invalid FEN: Board rows do not equal 10.");
        return;
    }
  
    // Clear the board
    const allSquares = document.querySelectorAll('.square');
    allSquares.forEach(square => {
        while (square.firstChild) {
            square.removeChild(square.firstChild);
        }
    });
  
    // Place pieces on the board
    for (let row = 10; row >= 1; row--) {
        let fenRow = rows[10 - row];
        let col = 1;
  
        for (let i = 0; i < fenRow.length; i++) {
            const char = fenRow[i];
  
            if (!isNaN(char)) {
                col += parseInt(char);
            } else {
                const square = document.querySelector(`[row-id="${row}"][col-id="${col}"]`);
                if (!square) continue;
  
                const piece = document.createElement('div');
                const img = document.createElement('img');
                let pieceType;
  
                switch (char.toLowerCase()) {
                    case 'g':
                        pieceType = 'general';
                        img.src = char === 'g' ? '../image/xiangqi/blackGeneral.png' : '../image/xiangqi/redGeneral.png';
                        break;
                    case 'a':
                        pieceType = 'advisor';
                        img.src = char === 'a' ? '../image/xiangqi/blackAdvisor.png' : '../image/xiangqi/redAdvisor.png';
                        break;
                    case 'e':
                        pieceType = 'elephant';
                        img.src = char === 'e' ? '../image/xiangqi/blackElephant.png' : '../image/xiangqi/redElephant.png';
                        break;
                    case 'h':
                        pieceType = 'horse';
                        img.src = char === 'h' ? '../image/xiangqi/blackHorse.png' : '../image/xiangqi/redHorse.png';
                        break;
                    case 'r':
                        pieceType = 'chariot';
                        img.src = char === 'r' ? '../image/xiangqi/blackChariot.png' : '../image/xiangqi/redChariot.png';
                        break;
                    case 'c':
                        pieceType = 'cannon';
                        img.src = char === 'c' ? '../image/xiangqi/blackCannon.png' : '../image/xiangqi/redCannon.png';
                        break;
                    case 's':
                        pieceType = 'soldier';
                        img.src = char === 's' ? '../image/xiangqi/blackSoldier.png' : '../image/xiangqi/redSoldier.png';
                        break;
                    default:
                        console.error("Invalid FEN: Unrecognized piece type.", char);
                        continue;
                }
  
                piece.className = (char === char.toUpperCase() ? 'red' : 'black') + ' piece';
                piece.id = pieceType;
                piece.draggable = true;
                piece.appendChild(img);
                square.appendChild(piece);
  
                col++;
            }
        }
    }
  
  }
  