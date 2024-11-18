<?php

session_start();

if (isset($_SESSION["user_id"])) {
    
    $mysqli = require __DIR__ . "/database.php";
    
    $sql = "SELECT * FROM user
            WHERE id = {$_SESSION["user_id"]}";
            
    $result = $mysqli->query($sql);
    
    $user = $result->fetch_assoc();
}else{
    header("Location: ../php/index.php");
    exit();
}

?>

<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="../css/rule.css" />
    <link rel="stylesheet" href="../css/general.css">
    <script src="../js/general.js"></script>
    <title>Code</title>
  </head>
  <body>
    <!-- Navigation Bar -->
    <nav>
        <div class="logo">
            <a href="home.php"><img src="../image/logo1.webp"></a>                   
        </div>
        <ul>
            <li class="dropdown"> 
                <a>Play</a>
                <ul class="dropdown-content">
                    <li><a href="../php/chess.php">Analysis Board</a></li>
                    <li><a href="../php/playGame.php">Play Human</a></li>
                    <li><a href="../php/chessAI.php">Play AI</a></li>
                </ul>
            </li>
            <li class="dropdown">
                <a>Learn</a>
                <ul class="dropdown-content">
                    <li><a href="../php/learnChessRule.php">Rule</a></li>
                    <li><a href="../php/learnChessPuzzle.php">Puzzle</a></li>
                    <li><a href="../php/code.php">Code</a></li>
                </ul>
            </li>
            <li class="dropdown">
                <a>Explore</a>
                <ul class="dropdown-content">
                    <li><a href="../php/competition.php">Competition</a></li>
                    <li><a href="../php/coach.php">Coaches</a></li>
                </ul>
            </li>
            <li class="dropdown">
                <a>Connect</a>
                <ul class="dropdown-content">
                    <li><a href="../php/friend.php">Add Friends</a></li>
                    <li><a href="../php/playFriend.php">Play Friends</a></li>
                </ul>
            </li>
            <li class="dropdown">
                <a><?= htmlspecialchars($user["name"]) ?></a>
                <ul class="dropdown-content">
                    <li><a href="../php/history.php">Game History</a></li>
                    <li><a href="../php/process-logout.php">Logout</a></li>
                </ul>
            </li>
        </ul>
    </nav>

    <audio autoplay loop>
        <source src="../sound/music5.mp3" type="audio/mpeg">
        Your browser does not support the audio tag.
    </audio>

    <!-- Page Content -->
    <div id="codeContainer">

    <h1>Dream Chess Game Engine Development</h1>
    <img src="../image/code/logo.webp" alt="">
    <p>
        One of the missions of Dream Chess Website is to educate the public on how to create a Chess Website with HTML, CSS, and JS. 
        Hence, I am going to be showing you what the elements in our Chess Board are and how our team develops it step by step.
    </p>

    <hr>

    <h2>The Element in Chess Board</h2>
    <img src="../image/code/board.png" alt="">
    <p>
        The Chess Board consists of three things: the board, the square, the piece, and the image. 
        They are arranged in the hierarchy below:
    </p>
    
    <ul>
        <li>Board <code>&lt;div&gt; id: chessBoard</code></li>
        <li>Square <code>&lt;div&gt; class: square, class: light/dark, row-id: 1-8, col-id: 1-8</code></li>
        <li>Piece <code>&lt;div&gt; class: piece, class: white/black, id: (type), draggable: true</code></li>
        <li>Image <code>&lt;img&gt;</code></li>
    </ul>

    <h3>Board <code>&lt;div&gt;</code></h3>
    <p>The main container that holds the entire chessboard. All squares and pieces are placed within this div.</p>
    
    <h3>Square <code>&lt;div&gt;</code></h3>
    <ul>
        <li>class: square - Identifies the element as a square on the chessboard.</li>
        <li>class: light/dark - Specifies the color of the square (light or dark) to create the alternating pattern on the board.</li>
        <li>row-id: 1-8 - A custom attribute that specifies the row number of the square on the board, ranging from 1 to 8.</li>
        <li>col-id: 1-8 - A custom attribute that specifies the column number of the square on the board, ranging from 1 to 8.</li>
    </ul>

    <h3>Piece <code>&lt;div&gt;</code></h3>
    <ul>
        <li>class: piece - Identifies the element as a chess piece.</li>
        <li>class: white/black - Specifies the color of the piece (white or black), used to differentiate between the two players.</li>
        <li>id: (type) - Identifies the type of chess piece (e.g., "king", "queen", "rook", "knight", "bishop", "pawn").</li>
        <li>draggable: true - Allows the chess piece to be moved by dragging it across the board.</li>
    </ul>

    <h3>Image <code>&lt;img&gt;</code></h3>
    <p>The image element used to visually represent the chess piece within the piece <code>&lt;div&gt;</code>.</p>
    
    <hr>

    <h2>The Chess Board Representation</h2>
    <img src="../image/code/coordinate.png" alt="">
    <p>startPositionId[row][col]</p>
    <p>[Row:8-1][Column:A-H]</p>

    <hr>

    <h2>1. Initialise Global Variable</h2>
    <ul>
        <img src="../image/code/1.png" alt="">
        <li><strong>Pieces Image Variable</strong> - Contains images for each chess piece. Capital letters represent white and small letters represent black.</li>
        <br>
        <img src="../image/code/2.png" alt="">
        <li><strong>Chess Board and Setting Variable</strong> - Variable needed to set up the Chess Board.</li>
        <br>
        <img src="../image/code/3.png" alt="">
        <li><strong>Player turn and info Display variable</strong> - For displaying info and player turn.</li>
        <br>
        <img src="../image/code/4.png" alt="">
        <li><strong>Variable Drag and Drop Element</strong> - About the piece being dragged.</li>
        <br>
        <img src="../image/code/5.png" alt="">
        <li><strong>Variable for Special Moves</strong> - Tracks special chess moves such as castling and en passant.</li>
    </ul>

    <hr>

    <h2>2. Display Functions</h2>
    <ul>
        <img src="../image/code/6.png" alt="">
        <li><strong>createBoard</strong> - Generates the chessboard in the HTML document and populates it with pieces based on the initial position.</li>
        <br>
        <img src="../image/code/7.png" alt="">
        <li><strong>flipBoard</strong> - Flips the chessboard, swapping the positions of the pieces to provide a different perspective.</li>
    </ul>

    <hr>

    <h2>3. Drag and Drop Functions</h2>
    <ul>
        <img src="../image/code/8.png" alt="">
        <li><strong>eventListener</strong> - Calls the event listener for drag and drop action.</li>
        <br>
        <img src="../image/code/9.png" alt="">
        <li><strong>dragStart</strong> - Handles the starting point when a piece is picked up for dragging, capturing the piece and its initial position.</li>
        <br>
        <img src="../image/code/10.png" alt="">
        <li><strong>clearSelection</strong> - Clears any text or element selection on the page to avoid interference with the drag-and-drop functionality.</li>
        <br>
        <img src="../image/code/11.png" alt="">
        <li><strong>dragOver</strong> - Manages the action when a piece is dragged over another square, preventing unwanted behavior such as duplicating the piece.</li>
        <br>
        <img src="../image/code/12.png" alt="">
        <img src="../image/code/13.png" alt="">
        <li><strong>dragDrop</strong> - Handles the dropping of a piece on a new square, including move validation, capturing opponent pieces, and managing special moves like castling and en passant.</li>
    </ul>

    <hr>

    <h2>4. Game Logic Functions</h2>
    <ul>
        <img src="../image/code/14.png" alt="">
        <li><strong>changePlayer</strong> - Switches the turn between white and black after each move.</li>
        <br>
        <img src="../image/code/15.png" alt="">
        <li><strong>checkIfValid</strong> - Validates whether a move is legal based on chess rules and the current board state.</li>
        <br>
        <img src="../image/code/16.png" alt="">
        <li><strong>simulateMove</strong> - Temporarily stimulates a move on the chessboard for checking purposes, such as verifying if a move would result in checkmate.</li>
        <br>
        <img src="../image/code/17.png" alt="">
        <li><strong>saveBoard</strong> - Saves the current state of the chessboard, allowing the game to undo moves if necessary.</li>
        <br>
        <img src="../image/code/18.png" alt="">
        <li><strong>loadBoard</strong> - Restores the chessboard to a previously saved state, useful for undoing moves or checking move legality.</li>
        <br>
        <img src="../image/code/19.png" alt="">
        <li><strong>checkPieceAt</strong> - Checks the type of piece (if any) located at a specific position on the chessboard.</li>
        <br>
        <img src="../image/code/20.png" alt="">
        <li><strong>isSquareAttacked</strong> - Determines whether a specific square is under attack by any opponent piece.</li>
        <br>
        <img src="../image/code/21.png" alt="">
        <img src="../image/code/22.png" alt="">
        <li><strong>boardToFEN</strong> - Converts the current board state to a FEN string, a standardized notation for describing a chess position.</li>
        <br>
        <img src="../image/code/23.png" alt="">
        <img src="../image/code/24.png" alt="">
        <li><strong>loadBoardFromFEN</strong> - Loads a chessboard position from a FEN string, placing pieces accordingly and updating game variables like turn and castling rights.</li>
    </ul>

    <hr>

    <h2>5. Chess Rule Functions</h2>
    <ul>
        <img src="../image/code/25.png" alt="">
        <li><strong>checkForEnPassant</strong> - Handles en passant captures, updating the board state and removing the captured pawn if the move is valid.</li>
        <br>
        <img src="../image/code/26.png" alt="">
        <li><strong>rookShiftForCastling</strong> - Shifts the rook to its correct position during a castling move.</li>
        <br>
        <img src="../image/code/27.png" alt="">
        <li><strong>checkForCastling</strong> - Checks and updates the availability of castling moves based on the current board state and previous moves.</li>
        <br>
        <img src="../image/code/28.png" alt="">
        <li><strong>checkForPromotion</strong> - Checks if a pawn has reached the last rank and needs to be promoted, initiating the promotion process.</li>
        <br>
        <img src="../image/code/29.png" alt="">
        <li><strong>promotePawn</strong> - Promotes a pawn to another piece (Queen, Rook, Bishop, Knight) and updates the board accordingly.</li>
        <br>
        <img src="../image/code/30.png" alt="">
        <li><strong>checkForCheck</strong> - Determines if the player's king is in check, meaning it is threatened by an opponent's piece.</li>
        <br>
        <img src="../image/code/31.png" alt="">
        <li><strong>checkForCheckmate</strong> - Checks if the player is checkmated, meaning the king is in check and there are no valid moves to escape.</li>
        <br>
        <img src="../image/code/32.png" alt="">
        <li><strong>checkForStalemate</strong> - Checks if the player is stalemated, meaning there are no valid moves left but the king is not in check.</li>
        <br>
        <img src="../image/code/33.png" alt="">
        <li><strong>checkForNextValidMove</strong> - Determines if the player has any valid moves left, used for checking conditions like stalemate and checkmate.</li>
    </ul>

    <hr>

    <h2>6. Piece Move Functions</h2>
    <ul>
        <img src="../image/code/34.png" alt="">
        <li><strong>pieceMoves</strong> - Determines all possible moves for a given piece based on its type (Pawn, Rook, Knight, Bishop, Queen, King) and the current board state.</li>
        <br>
        <img src="../image/code/35.png" alt="">
        <img src="../image/code/36.png" alt="">
        <li><strong>pawnMoves</strong> - Handles the movement rules for pawns, including standard forward moves, captures, and en passant.</li>
        <br>
        <img src="../image/code/37.png" alt="">
        <li><strong>rookMoves</strong> - Handles the movement rules for rooks, including horizontal and vertical moves.</li>
        <br>
        <img src="../image/code/38.png" alt="">
        <li><strong>knightMoves</strong> - Handles the movement rules for knights, which move in an L-shaped pattern.</li>
        <br>
        <img src="../image/code/39.png" alt="">
        <li><strong>bishopMoves</strong> - Handles the movement rules for bishops, which move diagonally.</li>
        <br>
        <img src="../image/code/40.png" alt="">
        <li><strong>queenMoves</strong> - Handles the movement rules for queens, combining the movements of both rooks and bishops.</li>
        <br>
        <img src="../image/code/41.png" alt="">
        <li><strong>kingMoves</strong> - Handles the movement rules for kings, including castling and standard one-square moves in any direction.</li>
        <br>
        <img src="../image/code/42.png" alt="">
        <li><strong>longRangeChecking</strong> - Checks possible moves for long-range pieces like the Rook, Bishop, and Queen, continuing until an obstacle or the edge of the board is reached.</li>
        <br>
        <img src="../image/code/43.png" alt="">
        <li><strong>shortRangeChecking</strong> - Checks possible moves for short-range pieces like the King and Knight, which only move to adjacent squares.</li>
    </ul>

    <hr>

    <h1>Dream Chess Website Development Timeline</h1>

    <h2>1 - Display Board</h2>
    <p>Implemented the initial rendering of the chessboard on the screen, ensuring each square and piece is correctly positioned according to standard chess setup.</p>

    <h2>2 - 1D array</h2>
    <p>Set up basic data structures using a 1-dimensional array to represent the chessboard, showing all the pieces in this array format.</p>

    <h2>3 - Piece Movement</h2>
    <p>Developed the logic to handle the movement of each chess piece according to the rules of chess, including pawns, rooks, knights, bishops, queens, and kings.</p>

    <h2>4 - Change Player</h2>
    <p>Added functionality to alternate turns between players, updating the displayed text to show whose turn it is, and ensuring that each move is correctly tracked.</p>

    <h2>5 - 2D array</h2>
    <p>Change the array to 2D structure. This structure simplify the implementation of future function like Castling and En Passant.</p>

    <h2>6 - Show Valid Moves</h2>
    <p>Implemented logic to display valid moves for the pieces, enhancing game interactivity.</p>

    <h2>7 - Simplify piece rule</h2>
    <p>Simplified the rules governing each piece's movement to streamline code or improve functionality.</p>

    <h2>8 - Detect and Prevent Check</h2>
    <p>Ensured the game correctly handles checks, preventing illegal moves that would leave the king in check.</p>

    <h2>9 - Modularise and Commenting</h2>
    <p>Modularized the code and added comments for better clarity and maintenance.</p>

    <h2>10 - Checkmate and Stalemate</h2>
    <p>Implemented logic for detecting checkmate and stalemate conditions, crucial for game-ending scenarios.</p>

    <h2>11 - Minor Edit</h2>
    <p>Minor tweaks and corrections based on initial testing or feedback.</p>

    <h2>12 - Castling</h2>
    <p>Added the complex rule of castling, which involves moving both the king and a rook under specific conditions.</p>

    <h2>13 - En Passant</h2>
    <p>Implemented the en passant rule, a special pawn capture move.</p>

    <h2>14 - Login Signup</h2>
    <p>Added user authentication features, allowing players to sign up and log in.</p>

    <h2>15 - Combined</h2>
    <p>Combined multiple features or modules to ensure seamless integration.</p>

    <h2>16 - All Page Setup</h2>
    <p>Set up various pages of the website, ensuring consistent layout and navigation.</p>

    <h2>17 - Solve All The Bug</h2>
    <p>Ddebug and solve any issues encountered.</p>

    <h2>18 - Intergration Done</h2>
    <p>Finalized all functionality, ensuring it works correctly with all required features.</p>

    <h2>19 - Real Time</h2>
    <p>Started implementing real-time features like live game updates or multiplayer functionality.</p>

    <h2>20 - 2P Structure</h2>
    <p>Set up the structure for a two-player game, ensuring it handles inputs from two different users.</p>

    <h2>21 - Real Time 2P</h2>
    <p>Integrated real-time multiplayer features, allowing two players to play against each other in real-time.</p>

    <h2>22 - Timer</h2>
    <p>Added a timer feature, essential for timed matches.</p>

    <h2>23 - PVP</h2>
    <p>Finalized the player versus player (PVP) mode, ensuring all game mechanics work in a competitive setting.</p>

    <h2>24 - Add Friend</h2>
    <p>Added social features like the ability to add friends and possibly challenge them to games.</p>

    <h2>25 - Flip Board</h2>
    <p>Implemented a feature to flip the board, allowing each player to view the game from their perspective.</p>

    <h2>26 - Random AI</h2>
    <p>Introduced a basic AI that makes random moves, providing an opponent for single-player games.</p>

    <h2>27 - Min Max</h2>
    <p>Enhanced the AI with a smarter decision-making algorithm, likely using the Minimax strategy.</p>

    <h2>28 - Alpha Beta</h2>
    <p>Further refined the AI with Alpha-Beta pruning to optimize the Minimax algorithm.</p>

    <h2>29 - Create Xiang Qi from Chess</h2>
    <p>Started working on integrating Xiang Qi (Chinese Chess), adapting the existing chess logic to this variant.</p>

    <h2>30 - Xiang Qi Board</h2>
    <p>Completed the board setup and initial rules for Xiang Qi.</p>

    <h2>31 - Xiang Qi Real Time</h2>
    <p>Added real-time multiplayer features for Xiang Qi, similar to the earlier chess features.</p>

    <h2>32 - Xiang Qi AI</h2>
    <p>Developed an AI for Xiang Qi, applying similar strategies used for the chess AI.</p>

    <h2>33 - Play Friend</h2>
    <p>Finalized the feature allowing players to play against their friends, ensuring all functionalities are working.</p>

    <h2>34 - Connect</h2>
    <p>Related to connecting players or ensuring stable connections for multiplayer games.</p>

    <h2>35 - History</h2>
    <p>Implemented a feature to track and display game history, allowing players to review their past games.</p>

    <h2>36 - Complete</h2>
    <p>Completed all the web pages, ensuring everything from navigation to game features is fully implemented and functioning.</p>

    <h2>37 - Responsive</h2>
    <p>Made the website responsive, ensuring it works well on different devices and screen sizes.</p>

    </div>



  </body>
</html>


