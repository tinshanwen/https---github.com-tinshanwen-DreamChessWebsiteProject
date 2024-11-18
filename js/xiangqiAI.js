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

// 1.3 Player and info Display
const playerDisplay = document.querySelector("#playerDisplay");
const infoDisplay = document.querySelector("#infoDisplay");
let playerTurn = "red"; //Player Starting Color
playerDisplay.textContent = "Red Turn"; // Displayed Text

// 1.4 Drag and Drop Element
let draggedElement; // Piece u drag
let startRowId; // RowID of piece u drag
let startColId; // ColID of piece u drag

// 1.3 Create Starting Position
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
//Make a copy of board for UNDO purposes
let temporaryBoard = [];


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

//-----------------------------------------------------------------------
// Xiang Qi AI Here

let boardStack = []; // For AI 

// Evaluate the board state using a FEN string
function evaluateFEN(fen) {
  const pieceValues = {
      's': 1, 'c': 4, 'r': 9, 'h': 4, 'e': 2, 'a': 2, 'g': 100,
      'S': 1, 'C': 4, 'R': 9, 'H': 4, 'E': 2, 'A': 2, 'G': 100
  };
  const [piecePlacement] = fen.split(" ");
  let whiteScore = 0;
  let blackScore = 0;

  for (const char of piecePlacement) {
      if (char in pieceValues) {
          if (char === char.toUpperCase()) {
              whiteScore += pieceValues[char];
          } else {
              blackScore += pieceValues[char];
          }
      }
  }

  return blackScore - whiteScore; // Positive if black is better, negative if white is better
}

// Minimax algorithm with alpha-beta pruning
function minimax(depth, alpha, beta, isMaximizingPlayer) {
  if (depth === 0) {
      return evaluateFEN(boardToFEN());
  }

  let moves = generateAllMoves(isMaximizingPlayer ? 'black' : 'red');

  if (isMaximizingPlayer) {
      let bestScore = -Infinity;
      for (let move of moves) {
          saveBoard();
          simulateMove(move.startRow, move.startCol, move.targetRow, move.targetCol);
          let score = minimax(depth - 1, alpha, beta, false);
          loadBoard();
          bestScore = Math.max(score, bestScore);
          alpha = Math.max(alpha, score);
          if (beta <= alpha) {
              break; // Beta cutoff
          }
      }
      return bestScore;
  } else {
      let bestScore = Infinity;
      for (let move of moves) {
          saveBoard();
          simulateMove(move.startRow, move.startCol, move.targetRow, move.targetCol);
          let score = minimax(depth - 1, alpha, beta, true);
          loadBoard();
          bestScore = Math.min(score, bestScore);
          beta = Math.min(beta, score);
          if (beta <= alpha) {
              break; // Alpha cutoff
          }
      }
      return bestScore;
  }
}

// Find the best move for the AI
function bestMove(depth, alpha, beta) {
  let bestMove;
  let bestScore = -Infinity;
  let moves = generateAllMoves('black');
  for (let move of moves) {
      saveBoard();
      simulateMove(move.startRow, move.startCol, move.targetRow, move.targetCol);
      let score = minimax(depth - 1, alpha, beta, false);
      loadBoard();
      if (score > bestScore) {
          bestScore = score;
          bestMove = move;
      }
      alpha = Math.max(alpha, score);
      if (beta <= alpha) {
          break; // Beta cutoff
      }
  }
  console.log(bestScore)
  return bestMove;
}

// Get User Level
let level = 1;
const lv1Button = document.querySelector("#lv1");
const lv2Button = document.querySelector("#lv2");
const lv3Button = document.querySelector("#lv3");
lv1Button.onclick = function () {
  lv1Button.classList.add("button-highlight");
  lv2Button.classList.remove("button-highlight");
  lv3Button.classList.remove("button-highlight");
  level = 1
};

lv2Button.onclick = function () {
  lv1Button.classList.remove("button-highlight");
  lv2Button.classList.add("button-highlight");
  lv3Button.classList.remove("button-highlight");
  level = 2
};

lv3Button.onclick = function () {
  lv1Button.classList.remove("button-highlight");
  lv2Button.classList.remove("button-highlight");
  lv3Button.classList.add("button-highlight");
  level = 3
};

// Make the AI move
function aiMove() {
  const move = bestMove(level, -Infinity, Infinity); // Depth of 3 for mean level 3
  simulateMove(move.startRow, move.startCol, move.targetRow, move.targetCol);
  changePlayer();
}

// Generate all possible moves for a given player color
function generateAllMoves(playerColor) {
  let moves = [];
  const pieces = document.querySelectorAll(`.${playerColor}.piece`);
  pieces.forEach(piece => {
      const startRow = Number(piece.parentNode.getAttribute('row-id'));
      const startCol = Number(piece.parentNode.getAttribute('col-id'));
      const type = piece.id;
      const validMoves = pieceMoves(type, startRow, startCol, playerColor);
      validMoves.forEach(move => {
          moves.push({
              piece: piece,
              startRow: startRow,
              startCol: startCol,
              targetRow: move[0],
              targetCol: move[1]
          });
      });
  });
  return moves;
}

function changePlayer() {
  if (playerTurn === "black") {
    playerTurn = "red";
    playerDisplay.textContent = "Red Turn";
  } else {
    playerTurn = "black";
    playerDisplay.textContent = "Black Turn";
    if (!(checkForCheckmate("red")||checkForCheckmate("black")) )setTimeout(aiMove, 500); // Delay AI move for better UX
  }
  // Help AI Detect Checkmate
  if (checkForCheckmate("red")) {
    playerDisplay.textContent = "Checkmate";
    infoDisplay.textContent = "AI Win";
  }
}

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
const opponentColor = playerTurn === "red" ? "black" : "red"; // Set Opponent to be opposite player
const correctGo = draggedElement.classList.contains(playerColor); // Check whether we select correct color (piece color = playerTurn)
const takenByOpponent = e.target.firstChild?.parentNode.classList.contains(opponentColor); // Check whether target has opponent pieces
const valid = checkIfValid(e.target); // Check the move validity using XiangQi Rule
//const valid = true; // Temporary
// function checkForCheck(anything) { return false; }
// function checkForCheckmate(anything) { return false; }
// function checkForStalemate(anything) { return false; }

  if (correctGo) {
      saveBoard(); // Save the board state before making a move

      if (takenByOpponent && valid) {

          // Capture opponent piece
          e.target.parentNode.append(draggedElement); // Add the piece to that square
          e.target.remove(); // Remove the existing piece of opponent

          //Check whether the king will be in check
            if (checkForCheck(playerColor)) {
              loadBoard(); // Undo because that is an invalid move
              infoDisplay.textContent = "Invalid Move"; 
              setTimeout(() => (infoDisplay.textContent = ""), 2000);
            } else if (checkGeneralsFacingEachOther()) {
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
          } else if (checkGeneralsFacingEachOther()) {
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

  // After a player makes a move, we will check whether opponent king is checkmated or stalemated
  if (checkForCheckmate(opponentColor)) {
    // Check whether opponent is checkmated
    playerDisplay.textContent = "Checkmate";
    infoDisplay.textContent = "You Win";
  }

  if (checkForStalemate(opponentColor)) {
    // Check whether opponent is stalemated
    playerDisplay.textContent = "Checkmate";
    infoDisplay.textContent = "You Win";
  }
}

//-----------------------------------------------------------------------
// 4) Additional Function
// 4.1 Change Player after a move was made
// function changePlayer() {
//   if (playerTurn == "black") {
//     playerTurn = "red";
//     playerDisplay.textContent = "Red Turn";
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
const pieceColor = draggedElement.classList.contains("red")
  ? "red"
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
const startSquare = document.querySelector(
  `[row-id="${startRowId}"][col-id="${startColId}"]`
);
const targetSquare = document.querySelector(
  `[row-id="${targetRowId}"][col-id="${targetColId}"]`
);

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
  let currentBoard = [];
  for (let rowIndex = 1; rowIndex <= rows; rowIndex++) {
    let boardRow = [];
    for (let colIndex = 1; colIndex <= cols; colIndex++) {
      const square = document.querySelector(`[row-id="${rowIndex}"][col-id="${colIndex}"]`);
      const piece = square ? square.firstChild : null;
      boardRow.push(piece); // Push the piece into the array
    }
    currentBoard.push(boardRow); // Push the row into the array
  }
  boardStack.push(currentBoard); // Save the current board state to the stack
}

// 4.5 Load Board Function (For Undo and Checking)
function loadBoard() {
  if (boardStack.length > 0) {
    let lastBoard = boardStack.pop(); // Get the last saved board state
    lastBoard.forEach((row, rowIndex) => {
      row.forEach((piece, colIndex) => {
        const square = document.querySelector(`[row-id="${rowIndex + 1}"][col-id="${colIndex + 1}"]`);
        square.innerHTML = ''; // Clear current square
        if (piece) {
          square.appendChild(piece); // Append the piece into the HTML div
        }
      });
    });
  }
}

// 4.6 Board to FEN
function boardToFEN() {
  let fen = "";
  for (let row = 10; row >= 1; row--) {
      let emptySquares = 0;
      for (let col = 1; col <= 9; col++) {
          const square = document.querySelector(`[row-id="${row}"][col-id="${col}"]`);
          if (square && square.hasChildNodes()) {
              if (emptySquares > 0) {
                  fen += emptySquares;
                  emptySquares = 0;
              }
              const piece = square.firstChild;
              const pieceType = piece.id;
              const pieceColor = piece.classList.contains("red") ? "R" : "B";
              let pieceFEN;

              switch(pieceType) {
                  case "general":
                      pieceFEN = "g";
                      break;
                  case "advisor":
                      pieceFEN = "a";
                      break;
                  case "elephant":
                      pieceFEN = "e";
                      break;
                  case "horse":
                      pieceFEN = "h";
                      break;
                  case "chariot":
                      pieceFEN = "r";
                      break;
                  case "cannon":
                      pieceFEN = "c";
                      break;
                  case "soldier":
                      pieceFEN = "s";
                      break;
                  default:
                      pieceFEN = "";
              }

              fen += pieceColor === "R" ? pieceFEN.toUpperCase() : pieceFEN;
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
  fen += " " + (playerTurn === "red" ? "r" : "b");

  return fen;
}

// 4.7 FEN to Board
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
  const activeColor = parts[1];

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

  // Set player turn
  playerTurn = activeColor === 'r' ? 'red' : 'black';
  playerDisplay.textContent = `${playerTurn.charAt(0).toUpperCase() + playerTurn.slice(1)} Turn`;
}

//-----------------------------------------------------------------------
// 5) Pieces and Rule Function
// 5.1 Check for Check
function checkForCheck(playerColor) {
let check = false; // Is there pieces being checking
const opponentColor = playerColor === "red" ? "black" : "red";
const opponentPiece = document.querySelectorAll(`.${opponentColor}.piece`); // Opponent Piece

const king = document.querySelector(`.${playerColor}#general`); // Our general
const kingRow = Number(king.parentNode.getAttribute("row-id"));
const kingCol = Number(king.parentNode.getAttribute("col-id"));

opponentPiece.forEach((piece) => {
  const startRowId = Number(piece.parentNode.getAttribute("row-id"));
  const startColId = Number(piece.parentNode.getAttribute("col-id"));
  const type = piece.id; // Type of Pieces (ex:Pawn)

  // Check for all opponent valid moves
  let validMoves = pieceMoves(type, startRowId, startColId, opponentColor);
  validMoves.forEach((validMove) => {
    // Check whether the General stay on that square
    if (validMove[0] == kingRow && validMove[1] == kingCol) {
      check = true; // Then the General is in check
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
    if (!checkForCheck(playerColor) && !checkGeneralsFacingEachOther()) {
      validMove = true; // There is a valid Move
    }

    loadBoard(); // Always revert to original state after each simulation
  });
});

return validMove; // There are no valid Move
}

// 5.5 General facing Each other (Xiang Qi Specific Rules) 
function checkGeneralsFacingEachOther() {
let redGeneralPos = null;
let blackGeneralPos = null;

// Find the positions of both generals
for (let row = 1; row <= rows; row++) {
  for (let col = 1; col <= cols; col++) {
    const square = document.querySelector(`[row-id="${row}"][col-id="${col}"]`);
    if (square.hasChildNodes()) {
      const piece = square.firstChild;
      if (piece.id === 'general' && piece.classList.contains('red')) {
        redGeneralPos = { row: row, col: col };
      }
      if (piece.id === 'general' && piece.classList.contains('black')) {
        blackGeneralPos = { row: row, col: col };
      }
    }
  }
}

// Check if they are in the same column
if (redGeneralPos && blackGeneralPos && redGeneralPos.col === blackGeneralPos.col) {
  let piecesBetween = 0;

  // Check for pieces between the two generals
  const startRow = Math.min(redGeneralPos.row, blackGeneralPos.row) + 1;
  const endRow = Math.max(redGeneralPos.row, blackGeneralPos.row);

  for (let row = startRow; row < endRow; row++) {
    const square = document.querySelector(`[row-id="${row}"][col-id="${redGeneralPos.col}"]`);
    if (square.hasChildNodes()) {
      piecesBetween++;
    }
  }

  // If there are no pieces between them, they are facing each other
  if (piecesBetween === 0) {
    return true; // Generals are facing each other
  }
}

return false; // Generals are not facing each other
}

// 5.6 Search for possible move for each type of piece
// The reason we pass in opponent color is for checking opponent Pieces in our ways
function pieceMoves(pieceType, startRowId, startColId, playerColor) {
const opponentColor = playerColor === "red" ? "black" : "red";
switch (pieceType) {
    case "soldier":
        return soldierMoves(startRowId, startColId, opponentColor);
    case "chariot":
        return chariotMoves(startRowId, startColId, opponentColor);
    case "horse":
        return horseMoves(startRowId, startColId, opponentColor);
    case "elephant":
        return elephantMoves(startRowId, startColId, opponentColor);
    case "advisor":
        return advisorMoves(startRowId, startColId, opponentColor);
    case "cannon":
        return cannonMoves(startRowId, startColId, opponentColor);
    case "general":
        return generalMoves(startRowId, startColId, opponentColor);
}
}



//-----------------------------------------------------------------------
// 6 Specific Piece Move

// 6.1 Soldier Moves
function soldierMoves(startRowId, startColId, opponentColor) { 
  let validMoves = [];

  if (opponentColor == "black") {
      if (startRowId + 1 <= rows) {
          validMoves.push([startRowId + 1, startColId]); // Move Foward by 1 square
      }
      if (startRowId != 4 && startRowId != 5 && startColId - 1 >= 1) {
          validMoves.push([startRowId, startColId - 1]); // Move Right by 1 square
      }
      if (startRowId != 4 && startRowId != 5 && startColId + 1 <= cols) {
          validMoves.push([startRowId, startColId + 1]); // Move Left by 1 square
      }
  } else if (opponentColor == "red") {
      if (startRowId - 1 >= 1 ) {
          validMoves.push([startRowId - 1, startColId]); // Move Foward by 1 square
      }
      if (startRowId != 6 && startRowId != 7 && startColId - 1 >= 1) {
          validMoves.push([startRowId, startColId - 1]); // Move Right by 1 square
      }
      if (startRowId != 6 && startRowId != 7 && startColId + 1 <= cols) {
          validMoves.push([startRowId, startColId + 1]); // Move Left by 1 square
      }
  }
  return validMoves
}

// 6.2 Chariot Moves
function chariotMoves(startRowId, startColId, opponentColor) { 
  // 4 Directions of Rook Movement
  const directions = [
      [1, 0], // Up
      [-1, 0], // Down
      [0, 1], // Right
      [0, -1], // Left
  ];

  return longRangeChecking(directions, startRowId, startColId, opponentColor);
}

// 6.3 Horse Moves
function horseMoves(startRowId, startColId, opponentColor) { 
  const directions = [];
  if (
      document.querySelector(`[row-id="${startRowId + 1}"][col-id="${startColId}"]`)
      &&
      !document.querySelector(`[row-id="${startRowId + 1}"][col-id="${startColId}"]`).hasChildNodes()
  ) {
      directions.push([2, 1]); // Up-Right
      directions.push([2, -1]); // Up-Left
  }
  if (
      document.querySelector(`[row-id="${startRowId - 1}"][col-id="${startColId}"]`)
      &&
      !document.querySelector(`[row-id="${startRowId - 1}"][col-id="${startColId}"]`).hasChildNodes()
  ) {
      directions.push([-2, 1]); // Down-Right
      directions.push([-2, -1]); // Down-Left
  }
  if (
      document.querySelector(`[row-id="${startRowId}"][col-id="${startColId + 1}"]`)
      &&
      !document.querySelector(`[row-id="${startRowId}"][col-id="${startColId + 1}"]`).hasChildNodes()
  ) {
      directions.push([1, 2]); // Right-Up
      directions.push([-1, 2]); // Right-Down
  }
  if (
      document.querySelector(`[row-id="${startRowId}"][col-id="${startColId - 1}"]`)
      &&
      !document.querySelector(`[row-id="${startRowId}"][col-id="${startColId - 1}"]`).hasChildNodes()
  ) {
      directions.push([1, -2]); // Left-Up
      directions.push([-1, -2]); // Left-Down
  }

  return shortRangeChecking(directions, startRowId, startColId, opponentColor);
}

// 6.4 Elephant Moves
function elephantMoves(startRowId, startColId, opponentColor) { 
  const directions = [];
  
  // Red
  if (
      opponentColor == "black"
      &&
      startRowId + 2 <= 5
      &&
      document.querySelector(`[row-id="${startRowId + 1}"][col-id="${startColId + 1}"]`)
      &&
      !document.querySelector(`[row-id="${startRowId + 1}"][col-id="${startColId + 1}"]`).hasChildNodes()
  ) {
      directions.push([2, 2]); // Up-Right 
  }
  if (
      opponentColor == "black"
      &&
      startRowId + 2 <= 5
      &&
      document.querySelector(`[row-id="${startRowId + 1}"][col-id="${startColId - 1}"]`)
      &&
      !document.querySelector(`[row-id="${startRowId + 1}"][col-id="${startColId - 1}"]`).hasChildNodes()
  ) {
      directions.push([2, -2]); // Up-Left
  }
  if (
      opponentColor == "black"
      &&
      document.querySelector(`[row-id="${startRowId - 1}"][col-id="${startColId + 1}"]`)
      &&
      !document.querySelector(`[row-id="${startRowId - 1}"][col-id="${startColId + 1}"]`).hasChildNodes()
  ) {
      directions.push([-2, 2]); // Down-Right
  }
  if (
      opponentColor == "black"
      &&
      document.querySelector(`[row-id="${startRowId - 1}"][col-id="${startColId - 1}"]`)
      &&
      !document.querySelector(`[row-id="${startRowId - 1}"][col-id="${startColId - 1}"]`).hasChildNodes()
  ) {
      directions.push([-2, -2]); // Down-Left
  }

  // Black
  if (
      opponentColor == "red"
      &&
      document.querySelector(`[row-id="${startRowId + 1}"][col-id="${startColId + 1}"]`)
      &&
      !document.querySelector(`[row-id="${startRowId + 1}"][col-id="${startColId + 1}"]`).hasChildNodes()
  ) {
      directions.push([2, 2]); // Up-Right
  }
  if (
      opponentColor == "red"
      &&
      document.querySelector(`[row-id="${startRowId + 1}"][col-id="${startColId - 1}"]`)
      &&
      !document.querySelector(`[row-id="${startRowId + 1}"][col-id="${startColId - 1}"]`).hasChildNodes()
  ) {
      directions.push([2, -2]); // Up-Left
  }
  if (
      opponentColor == "red"
      &&
      startRowId - 2 >= 6
      &&
      document.querySelector(`[row-id="${startRowId - 1}"][col-id="${startColId + 1}"]`)
      &&
      !document.querySelector(`[row-id="${startRowId - 1}"][col-id="${startColId + 1}"]`).hasChildNodes()
  ) {
      directions.push([-2, 2]); // Down-Right
  }
  if (
      opponentColor == "red"
      &&
      startRowId - 2 >= 6
      &&
      document.querySelector(`[row-id="${startRowId - 1}"][col-id="${startColId - 1}"]`)
      &&
      !document.querySelector(`[row-id="${startRowId - 1}"][col-id="${startColId - 1}"]`).hasChildNodes()
  ) {
      directions.push([-2, -2]); // Down-Left
  }

  return shortRangeChecking(directions, startRowId, startColId, opponentColor);
}

// 6.5 Advisor Moves
function advisorMoves(startRowId, startColId, opponentColor) { 
const directions = [];

// Red
if (
    opponentColor == "black"
    &&
    startRowId + 1 <= 3
    &&
    startColId + 1 <= 6
) {
    directions.push([1, 1]); // Up-Right
}
if (
  opponentColor == "black"
  &&
  startRowId + 1 <= 3
  &&
  startColId - 1 >= 4
) {
    directions.push([1, -1]); // Up-Left
}
if (
  opponentColor == "black"
  &&
  startColId + 1 <= 6
) {
    directions.push([-1, 1]); // Down-Right
}
if (
  opponentColor == "black"
  &&
  startColId - 1 >= 4
) {
    directions.push([-1, -1]); // Down-Left
}

// Black
if (
  opponentColor == "red"
  &&
  startColId + 1 <= 6
) {
    directions.push([1, 1]); // Up-Right
}
if (
  opponentColor == "red"
  &&
  startColId - 1 >= 4
) {
    directions.push([1, -1]); // Up-Left
}
if (
  opponentColor == "red"
  &&
  startRowId - 1 >= 8
  &&
  startColId + 1 <= 6
) {
    directions.push([-1, 1]); // Down-Right
}
if (
  opponentColor == "red"
  &&
  startRowId - 1 >= 8
  &&
  startColId - 1 >= 4
) {
    directions.push([-1, -1]); // Down-Left
}

return shortRangeChecking(directions, startRowId, startColId, opponentColor);
}

// 6.6 Cannon Moves
function cannonMoves(startRowId, startColId, opponentColor) { 
// 4 Directions of Cannon Movement
let validMoves = [];
  const directions = [
    [1, 0], // Up
    [-1, 0], // Down
    [0, 1], // Right
    [0, -1], // Left
];

return longRangeCheckingForCannon(directions, startRowId, startColId, opponentColor);
}

// 6.7 General Moves
function generalMoves(startRowId, startColId, opponentColor) {
const directions = [];

// Red
if (
    opponentColor == "black"
    &&
    startRowId + 1 <= 3
) {
    directions.push([1, 0]); // Up
}
if (
  opponentColor == "black"
  &&
  startRowId - 1 >= 1
) {
    directions.push([-1, 0]); // Down
}
if (
  opponentColor == "black"
  &&
  startColId + 1 <= 6
) {
    directions.push([0, 1]); // Right
}
if (
  opponentColor == "black"
  &&
  startColId - 1 >= 4
) {
    directions.push([0, -1]); // Left
}

// Black
if (
  opponentColor == "red"
  &&
  startRowId + 1 <= 10
) {
    directions.push([1, 0]); // Up
}
if (
  opponentColor == "red"
  &&
  startRowId - 1 >= 8
) {
    directions.push([-1, 0]); // Down
}
if (
  opponentColor == "red"
  &&
  startColId + 1 <= 6
) {
    directions.push([0, 1]); // Right
}
if (
  opponentColor == "red"
  &&
  startColId - 1 >= 4
) {
    directions.push([0, -1]); // Left
}

return shortRangeChecking(directions, startRowId, startColId, opponentColor);
}

// 6.8 
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
    currentRow <= rows &&
    currentCol >= 1 &&
    currentCol <= cols
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

// 6.9 
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
    currentRow <= rows &&
    currentCol >= 1 &&
    currentCol <= cols
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

// 6.9
// Function use to loop all move for cannon (Long Ranged Piece)
function longRangeCheckingForCannon(directions, startRowId, startColId, opponentColor) {
let validMoves = [];

// Check each direction for possible moves
directions.forEach((direction) => {
  let currentRow = startRowId + direction[0]; // Add row
  let currentCol = startColId + direction[1]; // Add col
  let hasJumped = false; // Track if the cannon has jumped over a piece

  // Check directions until hit the edge of board
  while (
    currentRow >= 1 &&
    currentRow <= rows &&
    currentCol >= 1 &&
    currentCol <= cols
  ) {
    const targetSquare = document.querySelector(
      `[row-id="${currentRow}"][col-id="${currentCol}"]`
    );

    if (targetSquare.hasChildNodes()) {
      if (!hasJumped) {
        // The cannon hasn't jumped over a piece yet
        hasJumped = true; // Mark that the cannon has now jumped
      } else {
        // The cannon has already jumped over a piece
        if (targetSquare.firstChild.classList.contains(opponentColor)) {
          // The target square has an opponent's piece
          validMoves.push([currentRow, currentCol]); // Cannon can capture this piece
        }
        break; // Stop after capturing or hitting a piece after a jump
      }
    } else {
      // The square is empty
      if (!hasJumped) {
        validMoves.push([currentRow, currentCol]); // Cannon can move to empty squares before jumping
      }
    }

    // Check Next Square
    currentRow += direction[0]; // Add row
    currentCol += direction[1]; // Add col
  }
});

return validMoves;
}
//-----------------------------------------------------------------------
