<?php
if (isset($_POST)) {

    $mysqli = require __DIR__ . "/database.php";

    $data = file_get_contents("php://input");
    $user = json_decode($data, true); // return a PHP array

    $game_id = $user["game_id"];
    $current_position = $user["current_position"];

    // Fetch current move number
    $sql = "SELECT COUNT(*) as move_count FROM game_history WHERE game_id = '$game_id'";
    $result = $mysqli->query($sql);
    $row = $result->fetch_assoc();
    $move_number = $row['move_count'] + 1;

    // Update the current position in the game table
    $sql = "UPDATE game SET current_position = '$current_position', player_turn = IF(player_turn = 'white', 'black', 'white') WHERE game_id = '$game_id'";

    if ($mysqli->query($sql) === TRUE) {
        // Insert the new move into game_history
        $sql = "INSERT INTO game_history (game_id, move_number, current_position) VALUES ('$game_id', '$move_number', '$current_position')";
        if ($mysqli->query($sql) === TRUE) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['error' => 'Error inserting game history: ' . $mysqli->error]);
        }
    } else {
        echo json_encode(['error' => 'Error updating game: ' . $mysqli->error]);
    }

    $mysqli->close();
}

