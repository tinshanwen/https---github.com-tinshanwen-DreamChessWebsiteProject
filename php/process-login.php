<?php

$mysqli = require __DIR__ . "/database.php";

$sql = sprintf("SELECT * FROM user WHERE email = '%s'", $mysqli->real_escape_string($_POST["email"]));

$result = $mysqli->query($sql);

$user = $result->fetch_assoc();

if ($user) {
    if (password_verify($_POST["password"], $user["password_hash"])) {
        session_start();
        session_regenerate_id();
        $_SESSION["user_id"] = $user["id"];
        header("Location: ../php/home.php");
        exit;
    } else {
        header("Location: index.php?password=failed");
        echo "Password verification failed.";
    }
} else {
    echo "User not found.";
    header("Location: index.php?user=failed");
}


