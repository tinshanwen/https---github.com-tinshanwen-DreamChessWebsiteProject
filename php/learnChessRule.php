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
    <title>Chess Rule</title>
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
    <div id="ruleContainer">
        <h1>The Pieces</h1>
        <h2>King</h2>
        <img class="chess" src="../image/rule/king.png">
        <p>The king can move one square horizontally, vertically, or diagonally.</p>


        <h2>Rook</h2>
        <img class="chess" src="../image/rule/rook.png">
        <p>A rook can move any number of squares horizontally or vertically.</p>


        <h2>Bishop</h2>
        <img class="chess" src="../image/rule/bishop.png">
        <p>A bishop can move any number of squares diagonally.</p>


        <h2>Queen</h2>
        <img class="chess" src="../image/rule/queen.png">
        <p>The queen can move any number of squares horizontally, vertically, or diagonally.</p>


        <h2>Knight</h2>
        <img class="chess" src="../image/rule/knight.png">
        <p>A knight can move in "L" pattern (Two squares horizontally then one square vertically, or moving one square horizontally then two squares vertically).</p>
        <img class="chess" src="../image/rule/knight2.png">
        <p>The Knight can jump over other pieces.</p>


        <h2>Pawn</h2>
        <img class="chess" src="../image/rule/pawn.png">
        <p>A pawn moves straight forward one square, if that square is vacant. If it has not yet moved, a pawn also has the option of moving two squares straight forward, provided both squares are vacant. Pawns cannot move backwards.</p>
        <img class="chess" src="../image/rule/pawn2.png">
        <p>A pawn, unlike other pieces, captures differently from how it moves. A pawn can capture an enemy piece on either of the two squares diagonally in front of the pawn. It cannot move to those squares when vacant except when capturing en passant.</p>

        <h1>Special Moves</h1>
        <h2>Promotion</h2>
        <img class="chess" src="../image/rule/promotion1.png">
        <p>When Pawn Reaches the last rank, it can be promoted to a Queen, Knight, Bishop or Rook.</p>
        <img class="chess" src="../image/rule/promotion2.png">
        <p>Example: Promotion to a Queen.</p>

        <h2>En Passant</h2>
        <img class="chess" src="../image/rule/enPassant1.png">
        <p>When a pawn pass through enemy pawn and land beside him, En Passant can be made.</p>
        <img class="chess" src="../image/rule/enPassant2.png">
        <p>En Passant can be done like a normal pawn capture by removing enemy pawn beside it after the capture happends.</p>

        <h2>Castling</h2>
        <img class="chess" src="../image/rule/castling1.png">
        <p>When the king and rook haven't make any moves yet in the game. Castling is possible.</p>
        <img class="chess" src="../image/rule/castling2.png">
        <p>Example: Castling Long Side.</p>
        <img class="chess" src="../image/rule/castling3.png">
        <p>Example: Castling Short Side.</p>

        <h1>How can the game end?</h1>
        <h2>Checkmate</h2>
        <img class="chess" src="../image/rule/checkmate.png">
        <p>1-0</p>
        <p>When the king of a side is undercheck and there is no valid moves, then it is checkmated</p>

        <h2>Checkmate</h2>
        <img class="chess" src="../image/rule/stalemate.png">
        <p>0.5-0.5</p>
        <p>When the king of a side has no valid moves but it is not under check, then it is stalemated</p>

        <button onclick="window.location.href='../php/learnXiangqiRule.php'">Xiang Qi Rule</button>
    </div>

    
  </body>
</html>


