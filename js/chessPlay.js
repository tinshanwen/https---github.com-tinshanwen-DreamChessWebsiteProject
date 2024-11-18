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
const colorDisplay = document.querySelector("#colorDisplay");
const timeDisplay = document.querySelector("#timeDisplay");
const playerDisplay = document.querySelector("#playerDisplay");
const infoDisplay = document.querySelector("#infoDisplay");
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

// 1.6 Real Time Game Element
let gameId = 0; 
let currentFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 2'; // MUST Initialise
let thisPlayerColor = "";
let whiteTime = 0;
let blackTime = 0;
let result = ""
let timerStartCount = false;
let isGameEnded = false;

//-----------------------------------------------------------------------
// 2) Main Function

// 2.1 Create Board 
function createBoard() {
  startPosition.forEach((row, rowIndex) => {
    // Select Each Row
    row.forEach((arrayValue, columnIndex) => {
      // Select Each Cell
      const square = document.createElement("div"); //Create a Container Div
      square.classList.add("square"); // Add a class sqr
      square.innerHTML = arrayValue; // Put Value in Array to a newly created square

      if (square.firstChild) {
        //If There is a first child
        square.firstChild.setAttribute("draggable", true); //Then Dragable
      }

      square.setAttribute("row-id", length - rowIndex); // Row ID From 8 to 1
      square.setAttribute("col-id", columnIndex + 1); // Column ID From 1 to 8

      if (rowIndex % 2 === 0) {
        //Even Row
        square.classList.add(columnIndex % 2 === 0 ? "light" : "dark"); //Color of Sqr
      } else {
        //Odd Row
        square.classList.add(columnIndex % 2 === 0 ? "dark" : "light"); //Color of Sqr
      }

      chessBoard.appendChild(square); //Add the square to be child of Chess Board
    });
  });
}

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

// 2.3 Fetch the Game State (from DB)
function fetchGameState(gameId) {
  fetch(`../php/game_fetch_state.php?game_id=${gameId}`)
    .then(response => response.json())
    .then(data => {
      if (data.current_position) {
        const newFEN = data.current_position;
        if (newFEN !== currentFEN) { // Must do to Prevent Duplicate Entry
          disableDragEvents();  // Disable drag events before updating the board
          updateBoardFromFEN(newFEN);
          enableDragEvents();  // Re-enable drag events after updating the board
          currentFEN = newFEN;  // Update the current FEN string
        }
      } else {
        console.error('Error fetching game state:', data.error);
      }
      if (data.status === 'ended') {
        result = data.result;
        gameEnded();
      }
    })
    .catch(error => console.error('Fetch error:', error));
  
}

// 2.4 Update the Game State (to DB)
function updateGameState(gameId, currentPosition) {
  fetch('../php/game_update_state.php', {
      'method': 'POST',
      'headers': {
          'Content-Type': 'application/json; charset=utf-8'
      },
      'body': JSON.stringify({
          'game_id': gameId,
          'current_position': currentPosition
      })
  }).then(function(response) {
      return response.text();
  }).then(function(data) {
  });
}

// 2.5 Invoke Update Game
function sendGameState(gameId) {
  const currentPosition = boardToFEN(); // Function to convert board state to FEN string
  updateGameState(gameId, currentPosition);
}

// 2.6 Invoke Fetch Game every 0.02 second
// If FPS too high there might be some issue
let gameStateManager;
function startFetchingGameState(gameId, interval = 50) {
  gameStateManager = setInterval(() => {
    fetchGameState(gameId);
  }, interval);
}

// 2.7 Check for the new Game ID
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  gameId = params.get('game_id');
  thisPlayerColor = params.get('player_color').toString();
  colorDisplay.textContent += " you are " + thisPlayerColor;
  if (thisPlayerColor == "black") flipBoard(); // Flip Board only for black

  if (gameId) {
    startFetchingGameState(gameId);
    startTimer();
  } else {
    console.error('No game ID found in URL');
  }
});

// 2.8 Draw out the Chess board
createBoard();
enableDragEvents();  // Enable drag events after creating the board



// 2.9 Fetch Database Time
function fetchTime() { 
  fetch(`../php/game_fetch_state.php?game_id=${gameId}`)
    .then(response => response.json())
    .then(data => {
      if (data.white_time && data.black_time) {
        whiteTime = data.white_time;
        blackTime = data.black_time;
      } else {
        console.error('Error fetching game state:', data.error);
      }
  })
    .catch(error => console.error('Fetch error:', error));
}

// 2.10 Update Database Time
function updateTime() { 
  if (whiteTime > 0 && blackTime > 0) {
    fetch('../php/game_update_time.php', {
      'method': 'POST',
      'headers': {
        'Content-Type': 'application/json; charset=utf-8'
      },
      'body': JSON.stringify({
        'game_id': gameId,
        'white_time': whiteTime,
        'black_time': blackTime
      })
    }).then(function (response) {
      return response.text();
    }).then(function (data) {
    });
  } else {
    if (whiteTime < 0) whiteTime = 0;
    if (blackTime < 0) blackTime = 0;
  }
}

// 2.11 Start Timer
let timer; // Define the timer variable
function startTimer() {
  timer = setInterval(updateTimer, 50); // Update the timer every 0.01 second (10/1000)
}

// 2.12 Update Timer 
function updateTimer() { 

  fetchTime();

  if(playerTurn == "white") whiteTime-=0.05;
  if (playerTurn == "black") blackTime -= 0.05;

  if (whiteTime < 0) whiteTime = 0;
  if (blackTime < 0) blackTime = 0;
  
  const whiteMinutes = Math.floor(whiteTime / 60);
  const whiteSeconds = parseInt(whiteTime % 60);
  const blackMinutes = Math.floor(blackTime / 60);
  const blackSeconds = parseInt(blackTime % 60);

  // const whiteSeconds = (whiteTime % 60);
  // const blackSeconds = (blackTime % 60);

  timeDisplay.textContent = `White: ${whiteMinutes.toString().padStart(2, '0')}:${whiteSeconds.toString().padStart(2, '0')} - Black: ${blackMinutes.toString().padStart(2, '0')}:${blackSeconds.toString().padStart(2, '0')}`;

  if (whiteTime > 0 && blackTime > 0) timerStartCount = true;
  
  timeDrop();
  updateTime(); 
}

// 2.13 Checked if it is timedrop
function timeDrop() { 
  if (timerStartCount == true) {
    if (whiteTime <= 0) { 
      result = "black"
      gameEnded();
    } else if (blackTime <= 0) { 
      result = "white"
      gameEnded();
    } else {
      // Continue Playing
    }
  }
}

// 2.14 Resign Function
const resignButton = document.querySelector("#resignButton");
resignButton.onclick = function() {
  const userConfirmed = confirm("Are you sure you want to resign?");
  if (userConfirmed) {
    document.getElementById('resignButton').style.display = 'none';
    result = (thisPlayerColor == "white") ? "black" : "white";
    gameEnded(); 
  }
};

// 2.15 Disable all function and end the game
function gameEnded() {
  isGameEnded = true;
  disableDragEvents();
  clearInterval(timer);
  clearInterval(gameStateManager);

  if (result == "draw") {
    playerDisplay.textContent = "";
    infoDisplay.textContent = "The Game is Draw";
  } else if (result == "white") {
    playerDisplay.textContent = "";
    infoDisplay.textContent = "White win";
  } else if (result == "black") {
    playerDisplay.textContent = "";
    infoDisplay.textContent = "Black Win";
  } else {
    console.error("This Programmer made a silly mistake");
    return; // Exit the function as there's an error
  }

  // Send the result to the server
  updateGameResult(gameId, result);
}

// 2.16 Update the game result to the database
function updateGameResult(gameId, result) {
  fetch('../php/game_update_result.php', {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json; charset=utf-8'
    },
    'body': JSON.stringify({
      'game_id': gameId,
      'status': 'ended',
      'result': result
    })
  }).then(function (response) {
    return response.text();
  }).then(function (data) {
  });
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

  // Ensure only the current player can drag their pieces
  const pieceColor = draggedElement.classList.contains("white") ? "white" : "black";
  if (pieceColor !== thisPlayerColor) {
    e.preventDefault(); // Prevent dragging if it's not the player's turn
    infoDisplay.textContent = "Not your turn";
    setTimeout(() => (infoDisplay.textContent = ""), 2000);
  }
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

  if (correctGo) {
      saveBoard(); // Save the board state before making a move

      // Moving your piece
      if(valid)checkForEnPassant(e.target);

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
              rookShiftForCastling(); // Shift the position of rook if any side castles
              checkForCastling(); // Check whether each castling is still valid
              changePlayer(); // Proceed because that is a valid move
              sendGameState(gameId); // Send game state after a valid move
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
              rookShiftForCastling(); // Shift the position of rook if any side castles
              checkForCastling(); // Check whether each castling is still valid
              changePlayer(); // Proceed because that is a valid move
              sendGameState(gameId); // Send game state after a valid move
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

  // After a player makes a move, we will check whether opponent king is checkmated or stalemated
  if (checkForCheckmate(opponentColor)) {
    // Check whether opponent is checkmated
    result = playerColor; // If it's a checkmate, the current player wins
    gameEnded();
  }

  if (checkForStalemate(opponentColor)) {
    // Check whether opponent is stalemated
    result = "draw";
    gameEnded();
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
function changePlayer() {
  if (playerTurn == "black") {
    playerTurn = "white";
    playerDisplay.textContent = "White Turn";
  } else {
    playerTurn = "black";
    playerDisplay.textContent = "Black Turn";
  }
}

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
          if (square && square.hasChildNodes()) {
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
  fen += " 0 1"; // Assuming no halfmove clock and the first move

  return fen;
}


// 4.9 FEN to Board (Loading Game)
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
  const activeColor = parts[1];
  const castlingAvailability = parts[2];
  const enPassantTarget = parts[3];
  const halfmoveClock = parts[4];
  const fullmoveNumber = parts[5];

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

  // Set player turn
  playerTurn = activeColor === 'w' ? 'white' : 'black';
  playerDisplay.textContent = `${playerTurn.charAt(0).toUpperCase() + playerTurn.slice(1)} Turn`;

  // Set castling rights
  whiteCastleShort = castlingAvailability.includes('K');
  whiteCastleLong = castlingAvailability.includes('Q');
  blackCastleShort = castlingAvailability.includes('k');
  blackCastleLong = castlingAvailability.includes('q');

  // Set en passant target
  enPassantSquare = enPassantTarget === '-' ? null : [parseInt(enPassantTarget[1]), enPassantTarget.charCodeAt(0) - 96];

  // Update halfmove clock and fullmove number (if needed)
  // This is for potential further use in game logic
  const halfmoveClockValue = parseInt(halfmoveClock);
  const fullmoveNumberValue = parseInt(fullmoveNumber);
}


//-----------------------------------------------------------------------
// 5) Pieces and Rule Function
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
    sendGameState(gameId);

    if (checkForCheckmate(opponentColor)) {
      // Check whether opponent is checkmated
      result = color; // If it's a checkmate, the current player wins
      gameEnded();
    }

    if (checkForStalemate(opponentColor)) {
      // Check whether opponent is stalemated
      result = 'draw';
      gameEnded();
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

//-----------------------------------------------------------------------
// 6 Details Function for all Pieces
// 6.1 Pawn Moves
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

// 6.2 Rook Move
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

// 6.3 Knight Move
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

// 6.4 Bishop Move
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

// 6.5 Queen Move
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

// 6.6 King Move
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

// 6.8 Function use to loop all move for long ranged piece
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

// 6.9 Function use to find all move for short ranged piece
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


