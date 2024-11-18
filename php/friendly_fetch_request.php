<?php
session_start();
$mysqli = require __DIR__ . "/database.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $user_id = $_SESSION["user_id"];
    $friend_id = $_GET["friend_id"];

    // Check if the friend request already exists in either direction
    $checkSql = "SELECT status, type FROM friendly_match WHERE (user_id = '$user_id' AND friend_id = '$friend_id') OR (user_id = '$friend_id' AND friend_id = '$user_id')";
    $result = $mysqli->query($checkSql);

    if ($result->num_rows > 0) {
        // Make sure the person who create the request is not yourself
        $checkSql = "SELECT status FROM friendly_match WHERE user_id = '$user_id' AND friend_id = '$friend_id' AND status='pending' ";
        $result2 = $mysqli->query($checkSql);
        if ($result2->num_rows > 0) {
            echo json_encode(['status' => 'success', 'friend_status' => 'waiting']);
        }else{
            $row = $result->fetch_assoc();
            echo json_encode(['status' => 'success', 'friend_status' => $row['status'], 'type' => $row['type']]);
        }

    } else {
        echo json_encode(['status' => 'success', 'friend_status' => 'none']);
    }

    $mysqli->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>
