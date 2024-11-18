<?php

session_start();

if (isset($_SESSION["user_id"])) {
    $mysqli = require __DIR__ . "/database.php";
    
    $sql = "SELECT * FROM user WHERE id = {$_SESSION["user_id"]}";
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
    <title>Play Game</title>
    <link rel="stylesheet" href="../css/general.css">
    <link rel="stylesheet" href="../css/playGame.css">
    <script src="../js/general.js"></script>
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

    <div class="button-container">
        <button id="startChessGameButton">Play Chess</button>
        <button id="startXiangQiGameButton">Play XiangQi</button>
        <p id="loadingMessage" style="display:none;">Waiting for another player to join
            <div id="dots" class="dots" style="display:none;">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </p>
    </div>

    <audio autoplay loop>
        <source src="../sound/music3.mp3" type="audio/mpeg">
        Your browser does not support the audio tag.
    </audio>

    <script>
        // Chess Button
        document.getElementById('startChessGameButton').addEventListener('click', function() {
            fetch('game_create_new.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: "chess" // Sending the type variable
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                if (data.game_id) {
                    document.getElementById('startChessGameButton').style.display = 'none';
                    document.getElementById('startXiangQiGameButton').style.display = 'none';
                    document.getElementById('loadingMessage').style.display = 'block';
                    document.getElementById('dots').style.display = 'flex';
                    checkGameStateChess(data.game_id, data.player_color);
                } else {
                    console.error('Error creating/joining game:', data.error);
                }
            })
            .catch(error => console.error('Error:', error));
        });

        // Xiang Qi Button
        document.getElementById('startXiangQiGameButton').addEventListener('click', function() {
            fetch('game_create_new.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    type: "xiangqi" // Sending the type variable
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                if (data.game_id) {
                    document.getElementById('startChessGameButton').style.display = 'none';
                    document.getElementById('startXiangQiGameButton').style.display = 'none';
                    document.getElementById('loadingMessage').style.display = 'block';
                    document.getElementById('dots').style.display = 'flex';
                    checkGameStateXiangqi(data.game_id, data.player_color);
                } else {
                    console.error('Error creating/joining game:', data.error);
                }
            })
            .catch(error => console.error('Error:', error));
        });

        // Checking whether we found an opponent (Chess)
        function checkGameStateChess(gameId, playerColor) {
            const intervalId = setInterval(() => {
                fetch('game_fetch_state.php?game_id=' + gameId + '&player_color=' + playerColor)
                    .then(response => response.json())
                    .then(data => {
                        if (data.status=="started") {
                            clearInterval(intervalId);
                            window.location.href = `chessPlay.php?game_id=${gameId}&player_color=${playerColor}`;
                        } else {
                            console.log('Waiting for another player...');
                        }
                    })
                    .catch(error => console.error('Fetch error:', error));
            }, 1000);
        }

        // Checking whether we found an opponent (Xiang Qi)
        function checkGameStateXiangqi(gameId, playerColor) {
            const intervalId = setInterval(() => {
                fetch('game_fetch_state.php?game_id=' + gameId + '&player_color=' + playerColor)
                    .then(response => response.json())
                    .then(data => {
                        if (data.status=="started") {
                            clearInterval(intervalId);
                            window.location.href = `xiangqiPlay.php?game_id=${gameId}&player_color=${playerColor}`;
                        } else {
                            console.log('Waiting for another player...');
                        }
                    })
                    .catch(error => console.error('Fetch error:', error));
            }, 1000);
        }
    </script>
</body>
</html>
