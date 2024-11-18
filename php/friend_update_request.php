<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    session_start();
    $mysqli = require __DIR__ . "/database.php";

    $data = file_get_contents("php://input");
    $user = json_decode($data, true); // return a PHP array

    $user_id  = $_SESSION["user_id"];
    $friend_id  = $user["friend_id"];
    $status = $user["status"];

    // Check if the friend request already exists in either direction
    $checkSql = "SELECT * FROM friend WHERE (user_id = '$user_id' AND friend_id = '$friend_id') OR (user_id = '$friend_id' AND friend_id = '$user_id')";
    $result = $mysqli->query($checkSql);

    if ($result->num_rows > 0) {
        // Entry exists, update or delete based on status
        if ($status == "rejected") {
            // Delete Friend Request
            $sql = "DELETE FROM friend WHERE (user_id = '$user_id' AND friend_id = '$friend_id') OR (user_id = '$friend_id' AND friend_id = '$user_id')";
        } else if ($status == "approved") {
            // Update Friends Status
            $sql = "UPDATE friend SET status = 'approved' WHERE (user_id = '$user_id' AND friend_id = '$friend_id') OR (user_id = '$friend_id' AND friend_id = '$user_id')";
        } else {
            echo json_encode(['error' => 'Invalid status provided']);
            $mysqli->close();
            exit;
        }
    } else {
        if ($status == "pending") {
            // Create Friend Request
            $sql = "INSERT INTO friend (user_id, friend_id, status) VALUES ('$user_id', '$friend_id', 'pending')";
        } else {
            echo json_encode(['error' => 'Cannot create friend request with this status']);
            $mysqli->close();
            exit;
        }
    }

    if ($mysqli->query($sql)) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['error' => 'Error updating friends: ' . $mysqli->error]);
    }

    $mysqli->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>
