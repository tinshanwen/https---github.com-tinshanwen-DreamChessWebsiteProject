<?php
// For Checking Whether user has login or not
session_start();

if (isset($_SESSION["user_id"])) {
    
    $mysqli = require __DIR__ . "/database.php";
    
    $sql = "SELECT * FROM user
            WHERE id = {$_SESSION["user_id"]}";
            
    $result = $mysqli->query($sql);
    
    $user = $result->fetch_assoc();
}
?> 

<!DOCTYPE html>
<html>

    <head>
        <meta charset="utf-8">
        <title>Login Signup</title>
        <link rel="stylesheet" href="../css/index.css">
        <script src="https://unpkg.com/just-validate@latest/dist/just-validate.production.min.js" defer></script>
        <script src="../js/validation.js" defer></script>
    </head>

    <body>
            
            <?php 
            
            if (isset($user)): 
                
            header("Location: ../php/home.php");
                
            else: 

            ?>
                
                <section>
                    <h1>Dream Chess Website</h1>

                    <input type="radio" id="selectlogin" name="form" checked> 
                    <label for="selectlogin"> 
                        <img src="../image/login.jpg" style="background-color: white;">
                    </label>
                    <input type="radio" id="selectsignup" name="form" >
                    <label for="selectsignup">
                        <img src="../image/signup.png">
                    </label>

                    <div id="filling_part">

                        <form action="../php/process-login.php" method="post" if="login" class="login">
                            <label for="email">email</label><br>
                            <input type="email" name="email" id="email"
                                value="<?= htmlspecialchars($_POST["email"] ?? "") ?>"><br>
                            
                            <label for="password">Password</label><br>
                            <input type="password" name="password" id="password"><br>

                            <?php if (isset($_GET['user']) && $_GET['user'] === 'failed'): ?>
                                <em>Email Not Found</em><br>
                            <?php endif; ?>
                            <?php if (isset($_GET['password']) && $_GET['password'] === 'failed'): ?>
                                <em>Password Is Incorrect</em><br>
                            <?php endif; ?>
                            
                            <input type="submit" value="Log in"><br>
                        </form>


                        <form action="../php/process-signup.php" method="post" id="signup" novalidate class="signup">
                            <div>
                                <label for="name">Name</label><br>
                                <input type="text" id="name" name="name">
                            </div>
                            
                            <div>
                                <label for="email">email</label><br>
                                <input type="email" id="email" name="email">
                            </div>
                            
                            <div>
                                <label for="password">Password</label><br>
                                <input type="password" id="password" name="password">
                            </div>
                            
                            <div>
                                <label for="password_confirmation">Repeat password</label><br>
                                <input type="password" id="password_confirmation" name="password_confirmation">
                            </div>
                            
                            <input type="submit" value="Sign up"><br>
                        </form>

                    </div>
                    
                </section>
                
            <?php endif; ?>

        <script src="../js/general.js"></script>
        
        <audio autoplay loop>
            <source src="../sound/music4.mp3" type="audio/mpeg">
            Your browser does not support the audio tag.
        </audio>
        
    </body>

</html>