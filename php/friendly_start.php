<?php
session_start();
$mysqli = require __DIR__ . "/database.php";

header('Content-Type: application/json');

// Get the raw POST data and decode the JSON
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Assume you have user IDs stored in session after login
$user_id = $_SESSION['user_id'];
$friend_id = $data['friendId'];
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
    exit();
}

// This is For First User 
$checkSql_1 = "SELECT * FROM friendly_match WHERE (user_id = '$user_id' AND friend_id = '$friend_id') AND status = 'approved' ";
$result_1 = $mysqli->query($checkSql_1);
$checkSql_2 = "SELECT * FROM friendly_match WHERE (user_id = '$friend_id' AND friend_id = '$user_id') AND status = 'approved' ";
$result_2 = $mysqli->query($checkSql_2);

if ($result_1->num_rows == 1) {
    // Play White
    $sql = "UPDATE friendly_match SET status = 'done' WHERE (user_id = '$user_id' AND friend_id = '$friend_id') AND status = 'approved' ";
    $mysqli->query($sql);
    $sql = "INSERT INTO game (white_id, black_id, current_position, white_time, black_time, status, type) VALUES ('$user_id', '$friend_id', '$initial_fen', 300, 300, 'started', '{$data['type']}')";
    $mysqli->query($sql);
    $game_id = $mysqli->insert_id;
    echo json_encode(['gameId' => $game_id, 'playerColor' => $start_color]);
    exit();

} else if ($result_2->num_rows == 1) {
    // Play Black
    $sql = "UPDATE friendly_match SET status = 'done' WHERE (user_id = '$friend_id' AND friend_id = '$user_id') AND status = 'approved' ";
    $mysqli->query($sql);
    $sql = "INSERT INTO game (white_id, black_id, current_position, white_time, black_time, status, type) VALUES ('$friend_id', '$user_id', '$initial_fen', 300, 300, 'started', '{$data['type']}')";
    $mysqli->query($sql);
    $game_id = $mysqli->insert_id;
    echo json_encode(['gameId' => $game_id, 'playerColor' => 'black']);
    exit();
}



// This is for Second User
$checkSql_3 = "SELECT * FROM friendly_match WHERE (user_id = '$user_id' AND friend_id = '$friend_id') AND status = 'done' ";
$result_3 = $mysqli->query($checkSql_3);
$checkSql_4 = "SELECT * FROM friendly_match WHERE (user_id = '$friend_id' AND friend_id = '$user_id') AND status = 'done' ";
$result_4 = $mysqli->query($checkSql_4);

if ($result_3->num_rows == 1) {
    // Play White
    $sql = "DELETE FROM friendly_match WHERE (user_id = '$user_id' AND friend_id = '$friend_id') AND status = 'done' ";
    $mysqli->query($sql);
    $sql = "SELECT game_id FROM game WHERE white_id = '$user_id' AND black_id = '$friend_id' AND status='started' ORDER BY game_id DESC LIMIT 1";
    $game_id = $mysqli->query($sql);
    $game_id = $game_id->fetch_assoc()['game_id'];
    echo json_encode(['gameId' => $game_id, 'playerColor' => $start_color]);
    exit();

} else if ($result_4->num_rows == 1) {
    // Play Black
    $sql = "DELETE FROM friendly_match WHERE (user_id = '$friend_id' AND friend_id = '$user_id') AND status = 'done' ";
    $mysqli->query($sql);
    $sql = "SELECT game_id FROM game WHERE white_id = '$friend_id' AND black_id = '$user_id' AND status='started'ORDER BY game_id DESC LIMIT 1";
    $game_id = $mysqli->query($sql);
    $game_id = $game_id->fetch_assoc()['game_id'];
    echo json_encode(['gameId' => $game_id, 'playerColor' => 'black']);
    exit();
}

$mysqli->close();