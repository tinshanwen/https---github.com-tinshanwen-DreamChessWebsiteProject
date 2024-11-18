<?php
session_start();
header('Content-Type: application/json');
$mysqli = require __DIR__ . "/database.php";

$sql = "SELECT name, id FROM user WHERE id != {$_SESSION["user_id"]} ";
$result = $mysqli->query($sql);

$names = [];
$ids = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $names[] = $row['name'];
        $ids[] = $row['id'];
    }
    echo json_encode(['status' => 'success', 'names' => $names, 'ids' => $ids]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'No users found']);
}

$mysqli->close();
?>
