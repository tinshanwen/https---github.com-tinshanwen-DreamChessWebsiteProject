<?php
session_start();
$mysqli = require __DIR__ . "/database.php";

header('Content-Type: application/json');

// Get the raw POST data and decode the JSON
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Assume you have user IDs stored in session after login
$user_id = $_SESSION['user_id'];
$start_color;

// Check if the type is provided and set the initial FEN based on the game type
if (isset($data['type']) && $data['type'] === 'xiangqi') {
    $initial_fen = 'rheagaehr/9/1c5c1/s1s1s1s1s/9/9/S1S1S1S1S/1C5C1/9/RHEAGAEHR r'; // Xiang Qi
    $start_color = 'red';
} else if (isset($data['type']) && $data['type'] === 'chess') {
    $initial_fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'; // Chess
    $start_color = 'white';
}else {
    echo json_encode(['error' => 'Error initialise type ' . $mysqli->error]);
}

// Check if there is an existing game waiting for a second player
$sql = "SELECT game_id, white_id, black_id FROM game WHERE (black_id IS NULL OR white_id IS NULL) AND status = 'pending' AND type = '{$data['type']}' LIMIT 1";
$result = $mysqli->query($sql);

if ($result->num_rows > 0) {
    // Join the existing game
    $row = $result->fetch_assoc();
    if ($row['white_id'] == NULL) {
        $sql = "UPDATE game SET white_id = '$user_id', status = 'started' WHERE game_id = {$row['game_id']}";
        $player_color = 'white';
    } else {
        $sql = "UPDATE game SET black_id = '$user_id', status = 'started' WHERE game_id = {$row['game_id']}";
        $player_color = 'black';
    }

    if ($mysqli->query($sql) === TRUE) {
        echo json_encode(['game_id' => $row['game_id'], 'player_color' => $player_color]);
    } else {
        echo json_encode(['error' => 'Error joining game: ' . $mysqli->error]);
    }
} else {
    // Create a new game
    $sql = "INSERT INTO game (white_id, current_position, white_time, black_time, status, type) VALUES ('$user_id', '$initial_fen', 300, 300, 'pending', '{$data['type']}')";

    if ($mysqli->query($sql) === TRUE) {
        $game_id = $mysqli->insert_id;
        echo json_encode(['game_id' => $game_id, 'player_color' => $start_color]);
    } else {
        echo json_encode(['error' => 'Error creating game: ' . $mysqli->error]);
    }
}

$mysqli->close();




