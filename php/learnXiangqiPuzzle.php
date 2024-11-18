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
    <link rel="stylesheet" type="text/css" href="../css/xiangqi.css" />
    <link rel="stylesheet" href="../css/general.css">
    <script src="../js/general.js"></script>
    <script src="../js/learnXiangqiPuzzle.js" defer></script>
    <title>Xiang Qi Puzzle</title>
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
        <source src="../sound/music2.mp3" type="audio/mpeg">
        Your browser does not support the audio tag.
    </audio>

    <!-- Page Content -->
    <div id="xiangqiBoard"></div>
    <div id="playerDisplay"></div>
    <div id="infoDisplay"></div>
    <div>
      <button id="previousPuzzle"> <span>&lt</span> </button>
      <button id="nextPuzzle"><span>&gt</span></button>
    </div>
    <div><button onclick="window.location.href='../php/learnChessPuzzle.php'"><span>Chess Puzzle</span></button></div>
  </body>
</html>
