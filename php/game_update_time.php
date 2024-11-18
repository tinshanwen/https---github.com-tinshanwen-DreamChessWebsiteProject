<?php
if (isset($_POST)) {

    $mysqli = require __DIR__ . "/database.php";

    $data = file_get_contents("php://input");
    $user = json_decode($data, true); // return a PHP array

    $game_id = $user["game_id"];
    $white_time = $user["white_time"];
    $black_time = $user["black_time"];

    // Update the current time in the game table
    $sql = "UPDATE game SET white_time = '$white_time', black_time = '$black_time' WHERE game_id = '$game_id'";

    if ($mysqli->query($sql) === FALSE) {
        echo json_encode(['error' => 'Error updating game: ' . $mysqli->error]);
    } 

    $mysqli->close();
}