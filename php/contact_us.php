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
        <meta charset = "utf-8">
        <title>Contact Us</title>
        <link rel="stylesheet" href="../css/contact_us.css">
        <link rel="stylesheet" href="../css/general.css">
    </head>

    <body>
        <header>
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
        </header>

        <audio autoplay loop>
            <source src="../sound/music4.mp3" type="audio/mpeg">
            Your browser does not support the audio tag.
        </audio>

        <section>

            <div class = "content">
                <h1>Contact Us</h1>
                <div class="phone">
                    <img src="../image/phone.png">
                    <p>Phone </p>
                    <a href="tel:0126589098">012-6589098</a>
                </div>
                <div class="address">
                    <img src="../image/address.png">
                    <p>Address</p>
                    <a href="https://goo.gl/maps/Xqf4CS3mbVy17ogV6">
                        11-1, PV 128, <br/> Jalan Genting Kelang,<br/> Setapak, 53300 Kuala Lumpur </a>
                </div>
                <div class="email">
                    <img src="../image/email.png">
                    <p>Email</p>
                    <a href="mailto:someone@example.com">dreamchess@gmail.com</a>
                </div>
            </div>

            <div class="hospot">
                <img src="../image/hospot.png" id="hospot" alt="location map" usemap="#workmap">
                <map name="workmap">
                    <area target="_blank" alt="Our Company" title="Our Company" href="https://goo.gl/maps/yQgHDoWbnVvTGMLm9" coords="255,207,309,255" shape="rect">
                    <area target="_blank" alt="PV 128 building" title="PV 128 building" href="https://goo.gl/maps/5JKnvWh3ubpJuLqp8" coords="68,346,178,365,380,207,323,129,248,202,313,203,311,259,251,259,251,193,84,313" shape="poly">
                    <area target="_blank" alt="PV 15/16 Area" title="PV 15/16 Area" href="https://goo.gl/maps/AYWmjaX1bvF9nt2q6" coords="1,3,435,0,2,375" shape="poly">
                    <area target="_blank" alt="Columbia Hospital" title="Columbia Hospital" href="https://goo.gl/maps/te421EwxthU1i24PA" coords="344,99,418,195,479,147,428,36" shape="poly">
                    <area target="_blank" alt="PV 21 Area" title="PV 21 Area" href="https://goo.gl/maps/phrzay98pZNZTbBQ8" coords="141,490,764,36,770,494" shape="poly">
                </map>
                <a id="arrow_1"  href="https://goo.gl/maps/nyfQPq1kLiC8RJ5h6"><img src="images/arrow.png" ></a>
                <a id="arrow_2"  href="https://goo.gl/maps/1LvgxWowGbAEGdRf6"><img src="images/arrow.png" ></a>
            </div>
        </section>

        <script src="../js/general.js"></script>
                                                         
    </body>

</html>
