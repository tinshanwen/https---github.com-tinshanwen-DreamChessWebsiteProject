<?php
$mysqli = require __DIR__ . "/database.php";

$game_id = $_GET['game_id'];


$sql = "SELECT player_turn, current_position, white_time, black_time, status, result FROM game WHERE game_id = '$game_id'";
$result = $mysqli->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode([  'player_turn' => $row['player_turn'], 
                        'current_position' => $row['current_position'], 
                        'white_time' => $row['white_time'],
                        'black_time' => $row['black_time'],
                        'result' => $row['result'],
                        'status' => $row['status']]);
} else {
    echo json_encode(['error' => 'Game not found']);
}

$mysqli->close();


