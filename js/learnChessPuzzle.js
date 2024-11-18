//-----------------------------------------------------------------------
// Index
// 1) Initialise Variable
// 2) Create Board
// 3) Dragable
// 4) Additional Function
// 5) Pieces and Rule Function

// Additional Info - File path
//  Board <div> id:chessBoard
//  Square <div> class:square+light/dark row-id: col-id:
//  Piece <div> class:pieces+white/black ID:(type) dragable:true
//  Image <img>

//Additional Info - Coordinates
// Real Coordinates of Chess
// startPositionId[row][col]
//                  8
//                  7
//                  6
//                  5 [Row]
//                  4
//                  3
//                  2
//                  1
// 1 2 3 4 5 6 7 8
//     [Column]

// TODO Change the code square.html= into square.append.()
// TODO Finally: change all the pieces checking using the 2D array

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

// 1.3 Player and info Display
const playerDisplay = document.querySelector("#playerDisplay");
const infoDisplay = document.querySelector("#infoDisplay");
const testDisplay = document.querySelector("#testDisplay");
let playerTurn = "white"; //Player Starting Color
playerDisplay.textContent = "White Turn"; // Displayed Text

// 1.4 Drag and Drop Element
let draggedElement; // Piece u drag
let startRowId; // RowID of piece u drag
let startColId; // ColID of piece u drag

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
//Make a copy of board for UNDO purposes
let temporaryBoard = [];

// 1.5 Variable for Special Moves
const promotionSelector = document.querySelector("#promotionSelector");
let finishPromotion = true; // Stop every action before a pawn promotion is done
let whiteCastleShort = true;
let whiteCastleLong = true;
let blackCastleShort = true;
let blackCastleLong = true;
let enPassantSquare;
let enPassantPiece;
let enPassantColor;

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

//-----------------------------------------------------------------------
// Puzzle Function
let puzzleNumber = 1;
let move = 1;
let puzzle = [];
let puzzle1 =   [   "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - - -",
                    "r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - - -"
                ];
let puzzle2 =   [   "rnbqkbnr/pppp1ppp/8/4p3/5PP1/8/PPPPP2P/RNBQKBNR b KQkq - - -",
                    "rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR b KQkq - - -"
                ];
let puzzle3 =   [   "r1bqkbnr/ppppp1pp/2n5/8/8/3B4/PPP2PPP/RNBQK1NR w KQkq - - -",
                    "r1bqkbnr/ppppp1pp/2n5/7Q/8/3B4/PPP2PPP/RNB1K1NR w KQkq - - -",
                    "r1bqkbnr/ppppp2p/2n3p1/7Q/8/3B4/PPP2PPP/RNB1K1NR w KQkq - - -",
                    "r1bqkbnr/ppppp2p/2n3B1/7Q/8/8/PPP2PPP/RNB1K1NR w KQkq - - -",
                    "r1bqkbnr/ppppp3/2n3p1/7Q/8/8/PPP2PPP/RNB1K1NR w KQkq - - -",
                    "r1bqkbnr/ppppp3/2n3Q1/8/8/8/PPP2PPP/RNB1K1NR w KQkq - - -"
                ];                

changePuzzle();

function changePuzzle() {
  move = 1;
  enableDragEvents();
    infoDisplay.textContent = ""
    if (puzzleNumber == 1) {
        loadBoardFromFEN(puzzle1[0]);
        puzzle = puzzle1;
    } else if (puzzleNumber == 2){
        loadBoardFromFEN(puzzle2[0]);
        puzzle = puzzle2;
    } else if (puzzleNumber == 3){
      loadBoardFromFEN(puzzle3[0]);
      puzzle = puzzle3;
    }
}

function changePlayer() {
  if (boardToFEN() == puzzle[move]) {
    move++;
    if (puzzle[move]) {
      // There is still Puzzle
      infoDisplay.textContent = "Correct";
      setTimeout(() => (infoDisplay.textContent = ""), 1000);
      setTimeout(() => (loadBoardFromFEN(puzzle[move])), 1000);
      setTimeout(() => (move++), 1000);
      

    } else {
      // The End of Puzzle
      infoDisplay.textContent = "Correct"; 
      disableDragEvents();
    }

  } else {
      infoDisplay.textContent = "Incorrect";
      setTimeout(() => (infoDisplay.textContent = ""), 2000);
      loadBoard();
  }
}

async function previousPuzzle() {
    // To Prevent Puzzle Number smaller than 1
    if (puzzleNumber > 1) { 
        puzzleNumber--;
        changePuzzle()
    }
}
  
async function nextPuzzle() {
    // To Prevent Puzzle Number bigger than 3 (Total Puzzle)
    if (puzzleNumber < 3) {
        puzzleNumber++;
        changePuzzle()
    }
}

document.getElementById('previousPuzzle').addEventListener('click', previousPuzzle);
document.getElementById('nextPuzzle').addEventListener('click', nextPuzzle);

//-----------------------------------------------------------------------
// 3) Dragable
// 3.1 Event Listener for drag action
const allSquare = document.querySelectorAll(".square"); // Select All Square
allSquare.forEach((square) => {
  square.addEventListener("dragstart", dragStart); // Start position
  square.addEventListener("dragover", dragOver); // Square Passing by
  square.addEventListener("drop", dragDrop); // End position
});
// Square is dragable for us to get the value of it
// The square ID won't change after it is drag
// The Piece will be the one been drop to

// 3.2 Dragstart - Location u drag
function dragStart(e) {
  clearSelection(); // Only select one
  draggedElement = e.target; // e.target = pieces
  startRowId = Number(e.target.parentNode.getAttribute("row-id")); // pieces.parent = sqr
  startColId = Number(e.target.parentNode.getAttribute("col-id")); // pieces.parent = sqr
}

// 3.3 Clear Selection
// Prevent Accidentally Highlighted more than 1 element
function clearSelection() {
  // Check for highlight
  if (window.getSelection) {
    window.getSelection().removeAllRanges(); // Remove highlight
  }
  // Check for highlight
  if (document.selection) {
    document.selection.empty(); // Remove highlight
  }
}

// 3.4 DragOver
// Location u hover over
function dragOver(e) {
  e.preventDefault(); //Cancel the event to prevent error
}

// 3.6 DragDrop
// This is Main Function
// Location u drop
function dragDrop(e) {
  e.stopPropagation(); // Make sure dragDrop only calls once

  const playerColor = playerTurn; // Player Colour
  const opponentColor = playerTurn === "white" ? "black" : "white"; // Set Opponent to be opposite player
  const correctGo = draggedElement.classList.contains(playerColor); // Check whether we select correct color (piece color = playerTurn)
  const takenByOpponent = e.target.firstChild?.parentNode.classList.contains(opponentColor); // Check whether target has opponent pieces
  const valid = checkIfValid(e.target); // Check the move validity using Chess Rule

  if (!finishPromotion) {
    return; // Stop any action before a pawn move promotion is done
  }

  checkForCastling(); // Check whether each castling is still valid

  if (correctGo) {
    saveBoard(); // Save the board state before making a move

    // Moving your piece
    if(valid)checkForEnPassant(e.target); // Perform En Passant if the move is valid

    if (takenByOpponent && valid) {
      // Capture opponent piece
      e.target.parentNode.append(draggedElement); // Add the piece to that square
      e.target.remove(); // Remove the existing piece of opponent

      // Check whether the king will be in check
      if (checkForCheck(playerColor)) {
        loadBoard(); // Undo because that is an invalid move
        infoDisplay.textContent = "Invalid Move";
        setTimeout(() => (infoDisplay.textContent = ""), 2000);
      } else {
        changePlayer(); // Proceed because that is a valid move
      }
    } else if (valid) {
      // Move to an empty square
      e.target.append(draggedElement); // Add the piece to that square

      // Check whether the king will be in check
      if (checkForCheck(playerColor)) {
        loadBoard(); // Undo because that is an invalid move
        infoDisplay.textContent = "Invalid Move";
        setTimeout(() => (infoDisplay.textContent = ""), 2000);
      } else {
        changePlayer(); // Proceed because that is a valid move
      }
    } else {
      loadBoard(); // Undo the move if it's invalid
      infoDisplay.textContent = "Invalid Move";
      setTimeout(() => (infoDisplay.textContent = ""), 2000);
    }
  } else {
    // Moving opponent piece
    infoDisplay.textContent = "Not your turn";
    setTimeout(() => (infoDisplay.textContent = ""), 2000);
  }

  checkForPromotion(playerColor); // Check whether any pawn at last rank
  rookShiftForCastling(); // Shift the position of rook if any side castles

  // After a player makes a move, we will check whether opponent king is checkmated or stalemated
  if (checkForCheckmate(opponentColor)) {
    // Check whether opponent is checkmated
    playerDisplay.textContent = "Checkmate";
  }

  if (checkForStalemate(opponentColor)) {
    // Check whether opponent is stalemated
    playerDisplay.textContent = "Stalemate";
  }
}

// 3.7 Disable drag events
function disableDragEvents() {
  const allSquares = document.querySelectorAll(".square");
  allSquares.forEach(square => {
      square.removeEventListener("dragstart", dragStart);
      square.removeEventListener("dragover", dragOver);
      square.removeEventListener("drop", dragDrop);
  });
}

// 3.8 Enable drag events
function enableDragEvents() {
  const allSquares = document.querySelectorAll(".square");
  allSquares.forEach(square => {
      square.addEventListener("dragstart", dragStart);
      square.addEventListener("dragover", dragOver);
      square.addEventListener("drop", dragDrop);
  });
}


//-----------------------------------------------------------------------
// 4) Additional Function
// 4.1 Change Player after a move was made
// function changePlayer() {
//   if (playerTurn == "black") {
//     playerTurn = "white";
//     playerDisplay.textContent = "White Turn";
//   } else {
//     playerTurn = "black";
//     playerDisplay.textContent = "Black Turn";
//   }
// }

// 4.2 Check Validity when a move was made
function checkIfValid(target) {
  // Variable needed for Chess Rule
  let targetRowId;
  let targetColId;
  if (target.classList.contains("square")) {
    targetRowId = Number(target.getAttribute("row-id"));
    targetColId = Number(target.getAttribute("col-id"));
  } else {
    targetRowId = Number(target.parentNode.getAttribute("row-id"));
    targetColId = Number(target.parentNode.getAttribute("col-id"));
  }

  const pieceType = draggedElement.id;
  const pieceColor = draggedElement.classList.contains("white")
    ? "white"
    : "black";
  let valid = false; // Validity

  // Validate Possible Moves
  let validMoves = pieceMoves(pieceType, startRowId, startColId, pieceColor); // Store valid Moves into array
  validMoves.forEach((validMove) => {
    if (validMove[0] == targetRowId && validMove[1] == targetColId) {
      //Check valid moves
      valid = true;
    }
  });

  return valid;
}

// 4.3 Stimulate a moves (For Undo and Checking)
function simulateMove(startRowId, startColId, targetRowId, targetColId) {
  const startSquare = document.querySelector(`[row-id="${startRowId}"][col-id="${startColId}"]`);
  const targetSquare = document.querySelector(`[row-id="${targetRowId}"][col-id="${targetColId}"]`);

  // Check if the start square has a first child (piece to move)
  if (startSquare && startSquare.firstChild) {
    // If the target square already has a piece, remove it (simulate capture)
    if (targetSquare.firstChild) {
      targetSquare.removeChild(targetSquare.firstChild);
    }
    // Move the piece from the start square to the target square
    targetSquare.appendChild(startSquare.firstChild);
  }
}

// 4.4 Save Board Function (For Undo and Checking)
function saveBoard() {
    temporaryBoard = []; // Reset the board state
  
    for (let rowIndex = 1; rowIndex <= 8; rowIndex++) {
      let boardRow = [];
      for (let colIndex = 1; colIndex <= 8; colIndex++) {
        // Get the Real Board Square in HTML
        const square = document.querySelector(
          `[row-id="${rowIndex}"][col-id="${colIndex}"]`
        );
        // Store the piece element directly or null if there is no piece
        const piece = square ? square.firstChild : null;
  
        boardRow.push(piece); //Push the piece into the array
      }
      temporaryBoard.push(boardRow); //Push the row into the array
    }
  }
  
  // 4.5 Load Board Function (For Undo and Checking)
  function loadBoard() {
    temporaryBoard.forEach((row, rowIndex) => {
      row.forEach((piece, colIndex) => {
        // Get value from Saved Temporary Board
        const square = document.querySelector(
          `[row-id="${rowIndex + 1}"][col-id="${colIndex + 1}"]`
        );
        if (piece) {
          square.appendChild(piece); //Append the piece into the HTML DIV
        }
      });
    });
  }

// 4.6 Check Piece at a specific location
function checkPieceAt(row, col) {
  const square = document.querySelector(`[row-id="${row}"][col-id="${col}"]`);
  return square && square.firstChild ? square.firstChild.id : "";
}

// 4.7 Is Square Attacked by opponent Piece
function isSquareAttacked(row1, col1, row2, col2, row3, col3, playerColor) {
  const opponentColor = playerColor === "white" ? "black" : "white";
  const opponentPiece = document.querySelectorAll(`.${opponentColor}.piece`);
  let isAttacked = false;

  opponentPiece.forEach((piece) => {
    const startRowId = Number(piece.parentNode.getAttribute("row-id"));
    const startColId = Number(piece.parentNode.getAttribute("col-id"));
    const type = piece.id;

    if (type !== "king") { // Skip king to avoid runtime errors
      let validMoves = pieceMoves(type, startRowId, startColId, opponentColor);
      validMoves.forEach((validMove) => {
        if (
          (validMove[0] == row1 && validMove[1] == col1) ||
          (validMove[0] == row2 && validMove[1] == col2) ||
          (validMove[0] == row3 && validMove[1] == col3)
        ) {
          isAttacked = true;
        }
      });
    }
  });

  return isAttacked;
}


// 4.8 Convert board to FEN String (For saving games)
function boardToFEN() {
  let fen = "";
  for (let row = 8; row >= 1; row--) {
    let emptySquares = 0;
    for (let col = 1; col <= 8; col++) {
      const square = document.querySelector(`[row-id="${row}"][col-id="${col}"]`);
      if (square.hasChildNodes()) {
        if (emptySquares > 0) {
          fen += emptySquares;
          emptySquares = 0;
        }
        const piece = square.firstChild;
        const pieceType = piece.id;
        const pieceColor = piece.classList.contains("white") ? "w" : "b";
        let pieceFEN;

        switch(pieceType) {
          case "king":
            pieceFEN = "k";
            break;
          case "queen":
            pieceFEN = "q";
            break;
          case "rook":
            pieceFEN = "r";
            break;
          case "bishop":
            pieceFEN = "b";
            break;
          case "knight":
            pieceFEN = "n";
            break;
          case "pawn":
            pieceFEN = "p";
            break;
          default:
            pieceFEN = "";
        }

        fen += pieceColor === "w" ? pieceFEN.toUpperCase() : pieceFEN;
      } else {
        emptySquares++;
      }
    }
    if (emptySquares > 0) {
      fen += emptySquares;
    }
    if (row > 1) {
      fen += "/";
    }
  }

  // Add the active color
  fen += " " + (playerTurn === "white" ? "w" : "b");

  // Add castling availability
  let castlingAvailability = "";
  if (whiteCastleShort) castlingAvailability += "K";
  if (whiteCastleLong) castlingAvailability += "Q";
  if (blackCastleShort) castlingAvailability += "k";
  if (blackCastleLong) castlingAvailability += "q";
  fen += " " + (castlingAvailability || "-");

  // Add en passant target square
  fen += " " + (enPassantSquare ? String.fromCharCode(96 + enPassantSquare[1]) + enPassantSquare[0] : "-");

  // Add halfmove clock and fullmove number
  fen += " - -"; // Assuming no halfmove clock and the first move

  return fen;
}

// 4.9 Convert FEN to Board
function loadBoardFromFEN(fen) {
  const parts = fen.split(" ");
  const piecePlacement = parts[0];
  const rows = piecePlacement.split("/");

  // Clear the board
  for (let row = 1; row <= 8; row++) {
      for (let col = 1; col <= 8; col++) {
          const square = document.querySelector(`[row-id="${row}"][col-id="${col}"]`);
          square.innerHTML = ""; // Remove all pieces
      }
  }

  // Place the pieces according to the FEN string
  rows.forEach((row, rowIndex) => {
      let colIndex = 0;
      for (const char of row) {
          if (!isNaN(char)) {
              colIndex += parseInt(char, 10);
          } else {
              const rowId = 8 - rowIndex;
              const colId = colIndex + 1;
              const square = document.querySelector(`[row-id="${rowId}"][col-id="${colId}"]`);
              let piece;
              switch (char.toLowerCase()) {
                  case 'p':
                      piece = (char === 'p') ? p : P;
                      break;
                  case 'r':
                      piece = (char === 'r') ? r : R;
                      break;
                  case 'n':
                      piece = (char === 'n') ? n : N;
                      break;
                  case 'b':
                      piece = (char === 'b') ? b : B;
                      break;
                  case 'q':
                      piece = (char === 'q') ? q : Q;
                      break;
                  case 'k':
                      piece = (char === 'k') ? k : K;
                      break;
              }
              square.innerHTML = piece;
              if (square.firstChild) {
                  square.firstChild.setAttribute("draggable", true);
              }
              colIndex++;
          }
      }
  });

  // Update player turn
  playerTurn = parts[1] === "w" ? "white" : "black";
  playerDisplay.textContent = playerTurn.charAt(0).toUpperCase() + playerTurn.slice(1) + " Turn";

  // Update castling rights
  const castlingRights = parts[2];
  whiteCastleShort = castlingRights.includes("K");
  whiteCastleLong = castlingRights.includes("Q");
  blackCastleShort = castlingRights.includes("k");
  blackCastleLong = castlingRights.includes("q");

  // Update en passant square
  const enPassantTarget = parts[3];
  if (enPassantTarget !== "-") {
      const enPassantCol = enPassantTarget.charCodeAt(0) - 96;
      const enPassantRow = parseInt(enPassantTarget[1], 10);
      enPassantSquare = [enPassantRow, enPassantCol];
  } else {
      enPassantSquare = null;
  }
}


//-----------------------------------------------------------------------
// 5) Pieces and Rule Function
// TODO bug in get Attribute
// TODO bug when a move is not made but return null
function checkForEnPassant(target) {
  let targetRowId;
  let targetColId;
  if (target.classList.contains("square")) {
    targetRowId = Number(target.getAttribute("row-id"));
    targetColId = Number(target.getAttribute("col-id"));
  } else {
    targetRowId = Number(target.parentNode.getAttribute("row-id"));
    targetColId = Number(target.parentNode.getAttribute("col-id"));
  }

  const pieceType = draggedElement.id;
  const pieceColor = draggedElement.classList.contains("white") ? "white" : "black";
  const increment = pieceColor == "white" ? 1 : -1;

  if (
    // Check for Pawn Move two squares
    pieceType == "pawn" &&
    Math.abs(startRowId - targetRowId) == 2 &&
    startColId == targetColId
  ) {
    // Save the En Passant square
    enPassantSquare = [startRowId + increment, startColId];
    enPassantPiece = [startRowId + 2 * increment, startColId];
    enPassantColor = pieceColor;
  } else if (
    // Check if capturing on an En Passant square
    pieceType == "pawn" &&
    enPassantSquare &&
    targetRowId == enPassantSquare[0] &&
    targetColId == enPassantSquare[1]
  ) {
    // Capture the En Passant pawn
    const capturedPawnSquare = document.querySelector(
      `[row-id="${enPassantPiece[0]}"][col-id="${enPassantPiece[1]}"]`
    );
    if (capturedPawnSquare && capturedPawnSquare.firstChild) {
      capturedPawnSquare.removeChild(capturedPawnSquare.firstChild);
    }
    enPassantSquare = null;
    enPassantPiece = null;
    enPassantColor = null;
  } else {
    // Reset En Passant if not valid
    enPassantSquare = null;
    enPassantPiece = null;
    enPassantColor = null;
  }
}

function rookShiftForCastling() {
  if (whiteCastleLong && checkPieceAt(1, 3) == "king") {
    simulateMove(1, 1, 1, 4);
  }
  if (whiteCastleShort && checkPieceAt(1, 7) == "king") {
    simulateMove(1, 8, 1, 6);
  }

  if (blackCastleLong && checkPieceAt(8, 3) == "king") {
    simulateMove(8, 1, 8, 4);
  }
  if (blackCastleShort && checkPieceAt(8, 7) == "king") {
    simulateMove(8, 8, 8, 6);
  }
}

function checkForCastling() {
  // White Castling
  if (checkPieceAt(1, 5) !== "king") {
    whiteCastleShort = false;
    whiteCastleLong = false;
  }
  if (checkPieceAt(1, 1) !== "rook") {
    whiteCastleLong = false;
  }
  if (checkPieceAt(1, 8) !== "rook") {
    whiteCastleShort = false;
  }

  // Black Castling
  if (checkPieceAt(8, 5) !== "king") {
    blackCastleShort = false;
    blackCastleLong = false;
  }
  if (checkPieceAt(8, 1) !== "rook") {
    blackCastleLong = false;
  }
  if (checkPieceAt(8, 8) !== "rook") {
    blackCastleShort = false;
  }
}

function checkForPromotion(playerColor) {
  let lastRow = playerColor == "white" ? Number(8) : Number(1); // White last Rank=8 / Black=1
  document.querySelectorAll(".piece").forEach((piece) => {
    const rowId = Number(piece.parentNode.getAttribute("row-id")); // Check for the row of piece
    const pieceType = piece.id; // Check for piece type

    // Check if the piece is a pawn and has reached the last rank
    if (pieceType == "pawn" && rowId == lastRow) {
      promotePawn(piece, playerColor); // Promote the pawn
    }
  });
}

function promotePawn(pawn, color) {
  finishPromotion = false; // Disable all piece movement
  promotionSelector.style.display = "flex"; // Show promotion options
  const opponentColor = color === "white" ? "black" : "white";
  const square = pawn.parentNode; // Get Square

  const handlePromotion = function(event) {
    const button = event.target;
    const value = button.getAttribute("value"); // Get button Value
    let promotionPiece; // Pieces promoted

    switch (value) {
      case "queen":
        promotionPiece = color == "white" ? Q : q;
        break;
      case "rook":
        promotionPiece = color == "white" ? R : r;
        break;
      case "bishop":
        promotionPiece = color == "white" ? B : b;
        break;
      case "knight":
        promotionPiece = color == "white" ? N : n;
        break;
    }

    square.innerHTML = promotionPiece; // Place the piece promoted into square
    square.firstChild.setAttribute("draggable", true); // Make the piece draggable

    promotionSelector.style.display = "none"; // Hide promotion options after selection
    finishPromotion = true; // Enable other pieces movement

    if (checkForCheckmate(opponentColor)) {
      // Check whether opponent is checkmated
      playerDisplay.textContent = "Checkmate";
    }

    if (checkForStalemate(opponentColor)) {
      // Check whether opponent is stalemated
      playerDisplay.textContent = "Stalemate";
    }

    // Remove event listeners from all buttons
    promotionSelector.querySelectorAll("button").forEach((btn) => {
      btn.removeEventListener("click", handlePromotion);
    });
  };

  promotionSelector.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", handlePromotion);
  });
}

// 5.1 Check for Check
function checkForCheck(playerColor) {
  let check = false; // Is there pieces being checking
  const opponentColor = playerColor === "white" ? "black" : "white";
  const opponentPiece = document.querySelectorAll(`.${opponentColor}.piece`); // Opponent Piece

  const king = document.querySelector(`.${playerColor}#king`); // Our King
  const kingRow = Number(king.parentNode.getAttribute("row-id"));
  const kingCol = Number(king.parentNode.getAttribute("col-id"));

  opponentPiece.forEach((piece) => {
    const startRowId = Number(piece.parentNode.getAttribute("row-id"));
    const startColId = Number(piece.parentNode.getAttribute("col-id"));
    const type = piece.id; // Type of Pieces (ex:Pawn)

    // Check for all opponent valid moves
    let validMoves = pieceMoves(type, startRowId, startColId, opponentColor);
    validMoves.forEach((validMove) => {
      // Check whether the king stay on that square
      if (validMove[0] == kingRow && validMove[1] == kingCol) {
        check = true; // Then the king is in check
      }
    });
  });

  return check;
}

// 5.2 Check for Checkmate
function checkForCheckmate(playerColor) {
  let inCheck = checkForCheck(playerColor);
  let validMove = checkForNextValidMove(playerColor);

  return !validMove && inCheck; // No Valid Moves and Being Check = Checkmate
}

// 5.3 Check for Stalemate
function checkForStalemate(playerColor) {
  let inCheck = checkForCheck(playerColor);
  let validMove = checkForNextValidMove(playerColor);

  return !validMove && !inCheck; // No Valid Moves and Not Being Check = Stalemate
}

// 5.4 Check for next valid Move (For Stalemate and Checkmate Function)
function checkForNextValidMove(playerColor) {
  let validMove = false;
  const oppPieces = document.querySelectorAll(`.${playerColor}.piece`);
  oppPieces.forEach((piece) => {
    const startRowId = Number(piece.parentNode.getAttribute("row-id"));
    const startColId = Number(piece.parentNode.getAttribute("col-id"));
    const type = piece.id;

    let validMoves = pieceMoves(type, startRowId, startColId, playerColor);

    validMoves.forEach(([targetRowId, targetColId]) => {
      saveBoard();
      simulateMove(startRowId, startColId, targetRowId, targetColId);

      // If a valid move makes the player not in check, it's not a Checkmate or Stalemate
      if (!checkForCheck(playerColor)) {
        validMove = true; // There is a valid Move
      }

      loadBoard(); // Always revert to original state after each simulation
    });
  });

  return validMove; // There are no valid Move
}

// 5.5 Search for possible move for each type of piece
// The reason we pass in opponent color is for checking opponent Pieces in our ways
function pieceMoves(pieceType, startRowId, startColId, playerColor) {
  const opponentColor = playerColor === "white" ? "black" : "white";
  switch (pieceType) {
    case "pawn":
      return pawnMoves(startRowId, startColId, opponentColor);
    case "rook":
      return rookMoves(startRowId, startColId, opponentColor);
    case "knight":
      return knightMoves(startRowId, startColId, opponentColor);
    case "bishop":
      return bishopMoves(startRowId, startColId, opponentColor);
    case "queen":
      return queenMoves(startRowId, startColId, opponentColor);
    case "king":
      return kingMoves(startRowId, startColId, playerColor, opponentColor); //Player color for castling
  }
}

// 5.6 Details Function for all Pieces
// Pawn Moves
function pawnMoves(startRowId, startColId, opponentColor) {
  let validMoves = [];
  let increament;
  let startRow;
  let lastRow;

  if (opponentColor == "black") {
    increament = 1;
    startRow = 2;
    lastRow = 8;
  } else if (opponentColor == "white") {
    increament = -1;
    startRow = 7;
    lastRow = 1;
  }

  // No Need to check for moves if the pawn (NOW) is promoting
  if (startRowId == lastRow) {
    return validMoves;
  }

  // Move forward 1 square
  if (
    !document
      .querySelector(
        `[row-id="${startRowId + increament}"][col-id="${startColId}"]`
      )
      .hasChildNodes()
  ) {
    // Nothing Blocking
    validMoves.push([startRowId + increament, startColId]);
  }

  // Move forward 2 squares from the starting position
  if (
    startRowId === startRow &&
    !document
      .querySelector(
        `[row-id="${startRowId + increament}"][col-id="${startColId}"]`
      )
      .hasChildNodes() && // Nothing Blocking
    !document
      .querySelector(
        `[row-id="${
          startRowId + increament + increament
        }"][col-id="${startColId}"]`
      )
      .hasChildNodes() // Nothing Blocking
  ) {
    validMoves.push([startRowId + increament + increament, startColId]);
  }

  // Capture diagonally to the left if there is an opponent piece
  let leftDiagonal = document.querySelector(
    `[row-id="${startRowId + increament}"][col-id="${startColId - increament}"]`
  ); //leftDiagonal
  if (
    leftDiagonal &&
    leftDiagonal.hasChildNodes() &&
    leftDiagonal.firstChild.classList.contains(opponentColor)
  ) {
    //Contains black pieces
    validMoves.push([startRowId + increament, startColId - increament]);
  }

  // Capture diagonally to the right if there is an opponent piece
  let rightDiagonal = document.querySelector(
    `[row-id="${startRowId + increament}"][col-id="${startColId + increament}"]`
  ); //rightDiagonal
  if (
    rightDiagonal &&
    rightDiagonal.hasChildNodes() &&
    rightDiagonal.firstChild.classList.contains(opponentColor) //Contains black pieces
  ) {
    validMoves.push([startRowId + increament, startColId + increament]);
  }

  // Check for Enphassant
  if (enPassantSquare != null) {
    if (
      enPassantSquare[0] == startRowId + increament &&
      (enPassantSquare[1] == startColId + increament ||
        enPassantSquare[1] == startColId - increament)
    ) {
      validMoves.push([enPassantSquare[0], enPassantSquare[1]]);
    }
  }
  Number;

  return validMoves;
}

// Rook Move
function rookMoves(startRowId, startColId, opponentColor) {
  // 4 Directions of Rook Movement
  const directions = [
    [1, 0], // Up
    [-1, 0], // Down
    [0, 1], // Right
    [0, -1], // Left
  ];

  return longRangeChecking(directions, startRowId, startColId, opponentColor);
}

// Knight Move
function knightMoves(startRowId, startColId, opponentColor) {
  // 8 Directions of Knight Movement
  const directions = [
    [2, 1], // Up-Right
    [2, -1], // Up-Left
    [-2, 1], // Down-Right
    [-2, -1], // Down-Left
    [1, 2], // Right-Up
    [-1, 2], // Right-Down
    [1, -2], // Left-Up
    [-1, -2], // Left-Down
  ];

  return shortRangeChecking(directions, startRowId, startColId, opponentColor);
}

//Bishop Move
function bishopMoves(startRowId, startColId, opponentColor) {
  // 4 Directions of Bishop Movement
  const directions = [
    [1, 1], // Up-right
    [1, -1], // Up-left
    [-1, 1], // Down-right
    [-1, -1], // Down-left
  ];

  return longRangeChecking(directions, startRowId, startColId, opponentColor);
}

// Queen Move
function queenMoves(startRowId, startColId, opponentColor) {
  // 8 Directions of Queen Movement
  const directions = [
    [1, 0], // Up
    [-1, 0], // Down
    [0, 1], // Right
    [0, -1], // Left
    [1, 1], // Up-right
    [1, -1], // Up-left
    [-1, 1], // Down-right
    [-1, -1], // Down-left
  ];

  return longRangeChecking(directions, startRowId, startColId, opponentColor);
}

// King Move
function kingMoves(startRowId, startColId, playerColor, opponentColor) {
  const directions = [
    [1, 0], // Up
    [-1, 0], // Down
    [0, 1], // Right
    [0, -1], // Left
    [1, 1], // Up-right
    [1, -1], // Up-left
    [-1, 1], // Down-right
    [-1, -1], // Down-left
  ];

  if (playerColor === "white") {
    if (whiteCastleLong && checkPieceAt(1, 4) === "" && checkPieceAt(1, 3) === "" && checkPieceAt(1, 2) === "") {
      if (!isSquareAttacked(1, 5, 1, 4, 1, 3, playerColor)) {
        directions.push([0, -2]);
      }
    }
    if (whiteCastleShort && checkPieceAt(1, 6) === "" && checkPieceAt(1, 7) === "") {
      if (!isSquareAttacked(1, 5, 1, 6, 1, 7, playerColor)) {
        directions.push([0, 2]);
      }
    }
  } else if (playerColor === "black") {
    if (blackCastleLong && checkPieceAt(8, 4) === "" && checkPieceAt(8, 3) === "" && checkPieceAt(8, 2) === "") {
      if (!isSquareAttacked(8, 5, 8, 4, 8, 3, playerColor)) {
        directions.push([0, -2]);
      }
    }
    if (blackCastleShort && checkPieceAt(8, 6) === "" && checkPieceAt(8, 7) === "") {
      if (!isSquareAttacked(8, 5, 8, 6, 8, 7, playerColor)) {
        directions.push([0, 2]);
      }
    }
  }

  return shortRangeChecking(directions, startRowId, startColId, opponentColor);
}

// Function use to loop all move for long ranged piece
function longRangeChecking(directions, startRowId, startColId, opponentColor) {
  let validMoves = [];

  // Check each direction for possible moves (Function for Q R and B)
  directions.forEach((direction) => {
    let currentRow = startRowId + direction[0]; // Add row
    let currentCol = startColId + direction[1]; // Add col

    // Check directions until hit the edge of board
    while (
      currentRow >= 1 &&
      currentRow <= 8 &&
      currentCol >= 1 &&
      currentCol <= 8
    ) {
      const targetSquare = document.querySelector(
        `[row-id="${currentRow}"][col-id="${currentCol}"]`
      );

      if (targetSquare.hasChildNodes()) {
        //There is pieces blocking
        if (targetSquare.firstChild.classList.contains(opponentColor)) {
          //Blocking pieces is opponentColor
          validMoves.push([currentRow, currentCol]); // Capture
        }
        break; // Stop
      }

      validMoves.push([currentRow, currentCol]); // Add the square if it's empty

      // Check Next Square
      currentRow += direction[0]; // Add row
      currentCol += direction[1]; // Add col
    }
  });

  return validMoves;
}

// Function use to find all move for short ranged piece
function shortRangeChecking(directions, startRowId, startColId, opponentColor) {
  let validMoves = [];

  // Check each direction for possible moves (Function for K and N)
  directions.forEach((direction) => {
    let currentRow = startRowId + direction[0]; // Add row
    let currentCol = startColId + direction[1]; // Add col

    // Check direction for one time and make sure it doesn't hit the edge of the board
    if (
      currentRow >= 1 &&
      currentRow <= 8 &&
      currentCol >= 1 &&
      currentCol <= 8
    ) {
      const targetSquare = document.querySelector(
        `[row-id="${currentRow}"][col-id="${currentCol}"]`
      );

      if (targetSquare.hasChildNodes()) {
        //There is pieces blocking
        if (targetSquare.firstChild.classList.contains(opponentColor)) {
          //Blocking pieces opponentColor
          validMoves.push([currentRow, currentCol]); // Capture
        }
      } else {
        validMoves.push([currentRow, currentCol]); // Add the square if it's empty
      }
    }
  });

  return validMoves;
}

//-----------------------------------------------------------------------


