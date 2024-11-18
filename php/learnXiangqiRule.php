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
    <title>Xiang Qi Rule</title>
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
        <h2>General</h2>
        <img class="xiangqi" src="../image/rule/general.png">
        <p>The general can move one square horizontally or vertically.</p>
        <p>The general can only move inside the 9 square box.</p>

        <h2>Advisor</h2>
        <img class="xiangqi" src="../image/rule/advisor.png">
        <p>The advisor can move one square or diagonally.</p>
        <p>The advisor can only move inside the 9 square box.</p>

        <h2>Elephant</h2>
        <img class="xiangqi" src="../image/rule/elephant.png">
        <p>The elephant can move one two squares horizontally and two squares vertically, when there is no pieces blocking in between it.</p>
        <p>The elephant cannot move across to the other side of river</p>

        <h2>Chariot</h2>
        <img class="xiangqi" src="../image/rule/chariot.png">
        <p>The charoit can move any squares horizontally or vertically.</p>
        <p>Similar to chess</p>

        <h2>Horse</h2>
        <img class="xiangqi" src="../image/rule/horse.png">
        <p>A knight can move in "Y" pattern (moving one square horizontally or vertically, then one squares diagonally).</p>
        <p>However, when there is anything blocking in front of it, it couldn't pass through it.</p>

        <h2>Cannon</h2>
        <img class="xiangqi" src="../image/rule/cannon.png">
        <p>The cannon can move like a rook vertically or horizontally.</p>
        <p>The cannon can only capture if there is a pieces between it and the captured piece.</p>

        <h1>Special Rule</h1>
        <h2>The General War</h2>
        <img class="xiangqi" src="../image/rule/generalWar.png">
        <p>In Xiang Qi, the general can never meet each other directly without any piece in between.</p>

        <h1>How can the game end?</h1>
        <h2>Checkmate</h2>
        <img class="xiangqi" src="../image/rule/shaqi.png">
        <p>When the king is unable to escapte for checks, it is considered checkmate.</p>
        <img class="xiangqi" src="../image/rule/kunbi.png">
        <p>In Xiang Qi, there is no stalemate. The king that cannot move is considered lost.</p>

        <button onclick="window.location.href='../php/learnChessRule.php'">Chess Rule</button>
    </div>

    
  </body>
</html>


