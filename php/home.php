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
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Home Page on Fishe Games</title>
        <link rel="stylesheet" href="../css/home.css">
        <link rel="stylesheet" href="../css/general.css">

        <!--Javascript for animation effect when sliding for navigation bar-->
        <script src="../js/general.js"></script>
        <script src="../js/home.js" defer></script>

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

        <!--Video Banner section-->
        <!--With the javascript, the 'video-slide' 'contentv' and nav-btn' class will change to 'active' when click on the button-->
        <section class="home">
            <video id="video1" class="video-slide active" src="../video/play.mp4" autoplay muted loop></video>
            <video id="video2" class="video-slide" src="../video/learn.mp4" autoplay muted loop></video>
            <video id="video3" class="video-slide" src="../video/coach.mp4" autoplay muted loop></video>
           
            <div class="contentv active">
                <h1>Dream Chess<br><span>Multiplayer</span></h1>
                <p>Dream Chess Website is a website for board game lover to learn and play Chess and Xiang Qi. We support interaction like connect with friends and find a coach online.</p>
                <button onclick="window.location.href='../php/playGame.php'">Start Playing</button> 
                <button id="muteButton1">Unmute</button> 
            </div>
            <div class="contentv">
                <h1>Learning Chess<br><span>Together</span></h1>
                <p>Dream Chess provides place to learn Chess and Xiang Qi, including the rule to play, puzzle of winning and even the code for this website.</p>
                <button onclick="window.location.href='../php/learnChessRule.php'">Chess Rule</button> 
                <button id="muteButton2">Unmute</button>
            </div>
            <div class="contentv">
                <h1>Magnus Carlsen<br><span>World Champion</span></h1>
                <p>Learning Chess is fun especially when you can find a good coach in your jouyney of learning, Dream Chess provide a way for you to get one.</p>
                <button onclick="window.location.href='../php/coach.php'">Find a Coach</button> 
                <button id="muteButton3">Unmute</button>
            </div>

            <div class="media-icons">
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
            </div>
            
            <div class="slider-navigation">
                <div class="nav-btn active"></div>
                <div class="nav-btn"></div>
                <div class="nav-btn"></div>
            </div>
        </section>
      

</html>