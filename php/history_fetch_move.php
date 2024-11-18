<?php
session_start();
$mysqli = require __DIR__ . "/database.php";

header('Content-Type: application/json');

// Get the raw POST data and decode the JSON
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Assume you have user IDs stored in session after login
$user_id = $_SESSION['user_id'];
$game_id = $data['game_id'];
$move_number = $data['move_number'];

if($move_number==0){
    // Original Position
    echo json_encode(['original_position' => 'true']);
} else if ($move_number>0){
    $sql = "SELECT current_position FROM game_history WHERE game_id = '$game_id' AND move_number = '$move_number'";
    $result = $mysqli->query($sql);
    if($result->num_rows >0){
        $current_position = $result->fetch_assoc()['current_position'];
        echo json_encode(['current_position' => $current_position]);
    }else{
        echo json_encode(['status' => 'false']);
    }
    
}

$mysqli->close();