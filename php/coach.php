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
    <link rel="stylesheet" type="text/css" href="../css/explore.css" />
    <link rel="stylesheet" href="../css/general.css">
    <script src="../js/general.js"></script>
    <title>Coach</title>
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
        <source src="../sound/music4.mp3" type="audio/mpeg">
        Your browser does not support the audio tag.
    </audio>

    <!-- Page Content -->
    <section class="games" id="games">
        <div class="heading-container">
            <div class="section-name">Coaches</div>
            <div class="section-name-go"><a id="contentBlock" href="../php/contact_us.php">I want to be a Coach</a></div>
        </div>
        <h2 class="heading"></h2>
            
        <!--Container-->
        <div class="games-container">
            <!--1-->
            <div class="games-box" onclick="location.href='../php/explore.php?type=coach&id=1'">
                <div class="games-box-img">
                    <img src="../image/coach/avetik.jpeg" alt="">
                </div>                
            <h3>GM Avetik Grigoryan</h3>
            <span>United States | English</span>
            </div>

            <!--2-->
            <div class="games-box" onclick="location.href='../php/explore.php?type=coach&id=2'">
                <div class="games-box-img">
                    <img src="../image/coach/matyas.jpeg" alt="">
                </div>                
            <h3>IM Matyas Marek</h3>
            <span>United States | English</span>
            </div>

            <!--3-->
            <div class="games-box" onclick="location.href='../php/explore.php?type=coach&id=3'">
                <div class="games-box-img">
                    <img src="../image/coach/maryana.jpeg" alt="">
                </div>                
            <h3>WGM Maryana Huda</h3>
            <span>Ukraine | Spanish</span>
            </div>

            <!--4-->
            <div class="games-box" onclick="location.href='../php/explore.php?type=coach&id=4'">
                <div class="games-box-img">
                    <img src="../image/coach/roman.jpeg" alt="">
                </div>                
            <h3>FM Roman Aukhatov</h3>
            <span>Russia | Russian</span>
            </div>

            <!--5-->
            <div class="games-box" onclick="location.href='../php/explore.php?type=coach&id=5'">
                <div class="games-box-img">
                    <img src="../image/coach/shahin.jpeg" alt="">
                </div>                
            <h3>GM Shahin Lorparizangeneh</h3>
            <span>Iran | Persian</span>
            </div>

            <!--6-->
            <div class="games-box" onclick="location.href='../php/explore.php?type=coach&id=6'">
                <div class="games-box-img">
                    <img src="../image/coach/walter.jpeg" alt="">
                </div>                
            <h3>FM Walter Cuevas</h3>
            <span>Chile | Spanish</span>
            </div>

            <!--7-->
            <div class="games-box" onclick="location.href='../php/explore.php?type=coach&id=7'">
                <div class="games-box-img">
                    <img src="../image/coach/armin.jpeg" alt="">
                </div>                
            <h3>IM Armin Juhasz</h3>
            <span>Hungary | Hungarian</span>
            </div>

            <!--8-->
            <div class="games-box" onclick="location.href='../php/explore.php?type=coach&id=8'">
                <div class="games-box-img">
                    <img src="../image/coach/marin.jpeg" alt="">
                </div>                
            <h3>GM Marin Bosiocic</h3>
            <span>Croatia | Croatian</span>
            </div>

            <!--9-->
            <div class="games-box" onclick="location.href='../php/explore.php?type=coach&id=9'">
                <div class="games-box-img">
                    <img src="../image/coach/daniel.jpeg" alt="">
                </div>                
            <h3>FM Daniel Kozusek</h3>
            <span>United Kingdom | English</span>
            </div>

            <div class="games-box">
                <div class="games-box-img">
                    <img src="../image/coach/coming.jpg" alt="">
                </div>                
            <h3>Coming Soon</h3>
            <span></span>
            </div>

        </div>
                 
    </section>

    <script>
        function updateContentBasedOnScreenSize() {
            const contentBlock = document.getElementById('contentBlock');
            
            if (window.innerWidth < 480) {
                contentBlock.textContent = 'Apply';
            } else if (window.innerWidth < 600) {
                contentBlock.textContent = 'Be a Coach';
            } else {
                contentBlock.textContent = 'I want to be a Coach';
            }
        }

        // Run the function when the page loads
        updateContentBasedOnScreenSize();

        // Add an event listener to update the content when the screen is resized
        window.addEventListener('resize', updateContentBasedOnScreenSize);
    </script>
  </body>
</html>


