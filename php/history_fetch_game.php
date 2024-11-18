<?php
session_start();
$mysqli = require __DIR__ . "/database.php";

header('Content-Type: application/json');

// Get the raw POST data and decode the JSON
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Assume you have user IDs stored in session after login
$user_id = $_SESSION['user_id'];

// Prepare the SQL statement to fetch game details
$sql = "
    SELECT 
        g.game_id AS game_id,
        u_white.name AS white_name,
        u_black.name AS black_name,
        g.type AS type
    FROM 
        game g
    JOIN 
        user u_white ON g.white_id = u_white.id
    JOIN 
        user u_black ON g.black_id = u_black.id
    WHERE 
        g.white_id = $user_id OR g.black_id = $user_id;
";

// Execute the query and check for errors
if ($result = $mysqli->query($sql)) {
    $game_id = [];
    $white_name = [];
    $black_name = [];
    $type = [];
    
    // Check if any results were returned
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $game_id[] = $row['game_id'];
            $white_name[] = $row['white_name'];
            $black_name[] = $row['black_name'];
            $type[] = $row['type'];
        }
        echo json_encode(['status' => 'success', 'game_id' => $game_id, 'white_name' => $white_name, 'black_name' => $black_name, 'type' => $type]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No games found']);
    }
} else {
    // Query failed, return error
    echo json_encode(['status' => 'error', 'message' => 'Query failed: ' . $mysqli->error]);
}

$mysqli->close();
?>
