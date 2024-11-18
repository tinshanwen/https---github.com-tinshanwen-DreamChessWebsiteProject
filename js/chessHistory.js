//-----------------------------------------------------------------------
// 1) Initialise Variable
// 1.1 Define Pieces Image
// White Pieces
const K =
  '<div class="white piece" id="king"> <img src="../image/chess/whiteKing.png" alt="K"> </div>';
const Q =
  '<div class="white piece" id="queen"> <img src="../image/chess/whiteQueen.png" alt="Q"> </div>';
const R =
  '<div class="white piece" id="rook"> <img src="../image/chess/whiteRook.png" alt="R"> </div>';
const N =
  '<div class="white piece" id="knight"> <img src="../image/chess/whiteKnight.png" alt="N"> </div>';
const B =
  '<div class="white piece" id="bishop"> <img src="../image/chess/whiteBishop.png" alt="B"> </div>';
const P =
  '<div class="white piece" id="pawn"> <img src="../image/chess/whitePawn.png" alt="P"> </div>';
//Black Pieces
const k =
  '<div class="black piece" id="king"> <img src="../image/chess/blackKing.png" alt="k"> </div>';
const q =
  '<div class="black piece" id="queen"> <img src="../image/chess/blackQueen.png" alt="q"> </div>';
const r =
  '<div class="black piece" id="rook"> <img src="../image/chess/blackRook.png" alt="r"> </div>';
const n =
  '<div class="black piece" id="knight"> <img src="../image/chess/blackKnight.png" alt="n"> </div>';
const b =
  '<div class="black piece" id="bishop"> <img src="../image/chess/blackBishop.png" alt="b"> </div>';
const p =
  '<div class="black piece" id="pawn"> <img src="../image/chess/blackPawn.png" alt="p"> </div>';

// 1.2 Board Setting
const chessBoard = document.querySelector("#chessBoard");
const length = 8;

// 1.3 History Setting 
let game_id = getGameIdFromUrl();  // Retrieve the game_id from the URL
let move_number = 0;

// Function to get the game_id from the URL
function getGameIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('game_id');
}

// 1.4 Create array of Pieces
// [Row:8-1][Column:A-H]
// Use to define starting posiyion for board creation
const startPosition = [
    [r, n, b, q, k, b, n, r],
    [p, p, p, p, p, p, p, p],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    [P, P, P, P, P, P, P, P],
    [R, N, B, Q, K, B, N, R],
];
  
//-----------------------------------------------------------------------
// 2.1) Create Board
function createBoard() {
    chessBoard.innerHTML = ''; // Clear existing board
  
    startPosition.forEach((row, rowIndex) => {
      row.forEach((arrayValue, columnIndex) => {
        const square = document.createElement("div");
        square.classList.add("square");
        square.innerHTML = arrayValue;
  
        if (square.firstChild) {
          square.firstChild.setAttribute("draggable", true);
        }
  
        square.setAttribute("row-id", length - rowIndex);
        square.setAttribute("col-id", columnIndex + 1);
  
        if (rowIndex % 2 === 0) {
          square.classList.add(columnIndex % 2 === 0 ? "light" : "dark");
        } else {
          square.classList.add(columnIndex % 2 === 0 ? "dark" : "light");
        }

        chessBoard.appendChild(square);
      });
    });
  }
  
createBoard();
  
// 2.2 Flip Board
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
    square.setAttribute("row-id", 9 - rowId);
    square.setAttribute("col-id", 9 - colId);
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
// 4.1 FEN to Board (Loading Game)
function updateBoardFromFEN(fen) {
  if (!fen) {
      console.error("Invalid FEN: FEN string is empty or undefined.");
      return;
  }

  const parts = fen.split(" ");
  if (parts.length < 6) {
      console.error("Invalid FEN: FEN string does not have the correct format.");
      return;
  }

  const rows = parts[0].split("/");


  if (rows.length !== 8) {
      console.error("Invalid FEN: Board rows do not equal 8.");
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
  for (let row = 8; row >= 1; row--) {
      let fenRow = rows[8 - row];
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
                  case 'k':
                      pieceType = 'king';
                      img.src = char === 'k' ? '../image/chess/blackKing.png' : '../image/chess/whiteKing.png';
                      break;
                  case 'q':
                      pieceType = 'queen';
                      img.src = char === 'q' ? '../image/chess/blackQueen.png' : '../image/chess/whiteQueen.png';
                      break;
                  case 'r':
                      pieceType = 'rook';
                      img.src = char === 'r' ? '../image/chess/blackRook.png' : '../image/chess/whiteRook.png';
                      break;
                  case 'b':
                      pieceType = 'bishop';
                      img.src = char === 'b' ? '../image/chess/blackBishop.png' : '../image/chess/whiteBishop.png';
                      break;
                  case 'n':
                      pieceType = 'knight';
                      img.src = char === 'n' ? '../image/chess/blackKnight.png' : '../image/chess/whiteKnight.png';
                      break;
                  case 'p':
                      pieceType = 'pawn';
                      img.src = char === 'p' ? '../image/chess/blackPawn.png' : '../image/chess/whitePawn.png';
                      break;
                  default:
                      console.error("Invalid FEN: Unrecognized piece type.", char);
                      continue;
              }

              piece.className = (char === char.toUpperCase() ? 'white' : 'black') + ' piece';
              piece.id = pieceType;
              piece.draggable = true;
              piece.appendChild(img);
              square.appendChild(piece);

              col++;
          }
      }
  }
}
