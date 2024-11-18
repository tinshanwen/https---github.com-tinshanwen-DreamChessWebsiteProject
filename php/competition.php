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
    <title>Competition</title>
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
            <div class="section-name">Competition</div>
            <div class="section-name-go"><a id="contentBlock" href="../php/contact_us.php">I want to add a competition</a></div>
        </div>
        <h2 class="heading"></h2>
            
        <!--Container-->
        <div class="games-container">
            <!--1-->
            <div class="games-box" onclick="location.href='../php/explore.php?type=competition&id=1'">
                <div class="games-box-img">
                    <img src="../image/competition/1.avif" alt="">
                </div>                
            <h3>19th IGB Malaysia Chess Festival 2024</h3>
            <span>Malaysia | Kuala Lumpur</span>
            </div>

            <!--2-->
            <div class="games-box" onclick="location.href='../php/explore.php?type=competition&id=2'">
                <div class="games-box-img">
                    <img src="../image/competition/2.avif" alt="">
                </div>                
            <h3>HK-DB Monthly International Open</h3>
            <span>Hong Kong | Discovery Bay</span>
            </div>

            <!--3-->
            <div class="games-box" onclick="location.href='../php/explore.php?type=competition&id=3'">
                <div class="games-box-img">
                    <img src="../image/competition/3.avif" alt="">
                </div>                
            <h3>The Rooky</h3>
            <span>Bangkok | Hollywood</span>
            </div>

            <!--4-->
            <div class="games-box" onclick="location.href='../php/explore.php?type=competition&id=4'">
                <div class="games-box-img">
                    <img src="../image/competition/4.avif" alt="">
                </div>                
            <h3>Merdeka Fide Rated</h3>
            <span>Malaysia | Aeon Hall</span>
            </div>

            <!--5-->
            <div class="games-box" onclick="location.href='../php/explore.php?type=competition&id=5'">
                <div class="games-box-img">
                    <img src="../image/competition/5.avif" alt="">
                </div>                
            <h3>WP Kuala Lumpur Open Circuit</h3>
            <span>Malaysia | Kuala Lumpur</span>
            </div>

            <!--6-->
            <div class="games-box" onclick="location.href='../php/explore.php?type=competition&id=6'">
                <div class="games-box-img">
                    <img src="../image/competition/6.avif" alt="">
                </div>                
            <h3>16th KCM Master</h3>
            <span>Malaysia | Hotel Nexus</span>
            </div>

            <!--7-->
            <div class="games-box" onclick="location.href='../php/explore.php?type=competition&id=7'">
                <div class="games-box-img">
                    <img src="../image/competition/7.avif" alt="">
                </div>                
            <h3>Merdeka Chess</h3>
            <span>Malaysia | U Sentral</span>
            </div>

            <!--8-->
            <div class="games-box" onclick="location.href='../php/explore.php?type=competition&id=8'">
                <div class="games-box-img">
                    <img src="../image/competition/8.avif" alt="">
                </div>                
            <h3>1st Charity Chess Championship 2024</h3>
            <span>Malaysia | MesaMall Nilai</span>
            </div>

            <!--9-->
            <div class="games-box" onclick="location.href='../php/explore.php?type=competition&id=9'">
                <div class="games-box-img">
                    <img src="../image/competition/9.avif" alt="">
                </div>                
            <h3>2024 3rd Mytown KL</h3>
            <span>Malaysia | My Town Mall</span>
            </div>

            <div class="games-box">
                <div class="games-box-img">
                    <img src="../image/competition/coming.jpg" alt="">
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
                contentBlock.textContent = 'Add';
            } else if (window.innerWidth < 600) {
                contentBlock.textContent = 'Add Competition';
            } else {
                contentBlock.textContent = 'I want to add a competition';
            }
        }

        // Run the function when the page loads
        updateContentBasedOnScreenSize();

        // Add an event listener to update the content when the screen is resized
        window.addEventListener('resize', updateContentBasedOnScreenSize);
    </script>
  </body>
</html>


