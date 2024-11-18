let gameType;

function fetchUsernames() {
    fetch('../php/friend_fetch_user.php', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        if (data.status === 'success') {
            console.log("Usernames fetched successfully:", data);
            displayUsernames(data);
        } else {
            console.error("Error fetching usernames:", data.message);
        }
    }).catch(function(error) {
        console.error("Fetch error:", error);
    });
}

async function displayUsernames(data) {
    const userList = document.getElementById('userList');
    userList.innerHTML = ''; // Clear the existing list
    

    for (const [index, name] of data.names.entries()) {
        const friendState = await fetchFriendState(data.ids[index]);
        const friendlyState = await fetchFriendlyState(data.ids[index]);
        if (friendState === "approved") {

            const row = document.createElement('tr'); // Create table row

            const nameCell = document.createElement('td'); // Create name cell
            nameCell.textContent = name;
            row.appendChild(nameCell);
    
            const idCell = document.createElement('td'); // Create ID cell
            idCell.textContent = data.ids[index];
            idCell.style.display = 'none'; // Hide the ID cell
            row.appendChild(idCell);

            // For Friendly
            if (friendlyState === "none") {
                // Play Chess Button
                const playChessCell = document.createElement('td'); 
                const playChessButton = document.createElement('button'); 
                playChessButton.textContent = 'Play Chess';
                playChessButton.onclick = function() {
                    updateFriendlyRequest(data.ids[index], "pending", "chess"); 
                };
                playChessCell.appendChild(playChessButton);
                row.appendChild(playChessCell);
    
                // Play Xiang Qi Button
                const playXiangqiCell = document.createElement('td'); 
                const playXiangqiButton = document.createElement('button'); 
                playXiangqiButton.textContent = 'Play Xiang Qi';
                playXiangqiButton.onclick = function() {
                    updateFriendlyRequest(data.ids[index], "pending", "xiangqi"); 
                };
                playXiangqiCell.appendChild(playXiangqiButton);
                row.appendChild(playXiangqiCell);
            }

            if (friendlyState === "pending") {

                // Add Approved type
                const gameTypeCell = document.createElement('td'); // Create action cell
                const gameTypeDiv= document.createElement('div'); // Create add friend button
                gameTypeDiv.textContent = gameType
                gameTypeCell.appendChild(gameTypeDiv);
                row.appendChild(gameTypeCell);

                const friendCell = document.createElement('td'); // Create action cell

                // Accept Friend Button
                const confirmFriendButton = document.createElement('button'); // Create accept friend button
                confirmFriendButton.textContent = 'Approve';
                const approveImg = document.createElement('img');
                approveImg.src = '../image/tick.png';
                confirmFriendButton.appendChild(approveImg);
                confirmFriendButton.onclick = function() {
                    updateFriendlyRequest(data.ids[index], "approved"); // Function to send friend request
                };
    
                // Reject Friend Button
                const rejectFriendButton = document.createElement('button'); // Create reject friend button
                rejectFriendButton.textContent = 'Reject';
                const rejectImg = document.createElement('img');
                rejectImg.src = '../image/cross.png';
                rejectFriendButton.appendChild(rejectImg);
                rejectFriendButton.onclick = function() {
                    updateFriendlyRequest(data.ids[index], "rejected"); // Function to send friend request
                };
                
                friendCell.appendChild(confirmFriendButton);
                friendCell.appendChild(rejectFriendButton);
                row.appendChild(friendCell);
            }
    
            if (friendlyState === "waiting") {
                // Add Approved Notice
                const waitingFriendCell = document.createElement('td'); // Create action cell
                const waitingFriendDiv= document.createElement('div'); // Create add friend button
                waitingFriendDiv.textContent = 'Waiting for response';
                waitingFriendCell.appendChild(waitingFriendDiv);
                row.appendChild(waitingFriendCell);
            }

            if (friendlyState === "approved" || friendlyState === "done") {
                
                startGame(data.ids[index]);

            }

            userList.appendChild(row);
        }
    }
}

function startGame(friendId) {
    fetch('friendly_start.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            type: gameType, 
            friendId: friendId
        })
    })
    .then(response => response.json())
        .then(data => {
        if (data.gameId && data.playerColor) {
            if (gameType == "chess")
                window.location.href = `chessPlay.php?game_id=${data.gameId}&player_color=${data.playerColor}`;
            if (gameType == "xiangqi")
                window.location.href = `xiangqiPlay.php?game_id=${data.gameId}&player_color=${data.playerColor}`;
        } else {
            console.log('Error');
        }
    })
    .catch(error => console.error('Fetch error:', error));
}

// For Friends
function updateFriendRequest(friendId, status) {
    fetch('../php/friend_update_request.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            friend_id: friendId,
            status: status
        })
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        if (data.status === 'success') {
            console.log("Friend request sent successfully.");
        } else {
            console.error("Error sending friend request:", data.message);
        }
    }).catch(function(error) {
        console.error("Fetch error:", error);
    });
}
// For Friends
function fetchFriendState(friendId) {
    return fetch(`../php/friend_fetch_request.php?friend_id=${friendId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        if (data.status === 'success') {
            console.log("Friend state fetched successfully:", data.friend_status);
            return data.friend_status;
        } else {
            console.error("Error fetching friend state:", data.message);
            return null; // Return null or handle error as needed
        }
    }).catch(function(error) {
        console.error("Fetch error:", error);
        return null; // Return null or handle error as needed
    });
}

// For Friendly Match
function updateFriendlyRequest(friendId, status, type) {
    fetch('../php/friendly_update_request.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            friend_id: friendId,
            status: status,
            type: type
        })
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        if (data.status === 'success') {
            console.log("Friendly request sent successfully.");
        } else {
            console.error("Error sending friend request:", data.message);
        }
    }).catch(function(error) {
        console.error("Fetch error:", error);
    });
}

// For Friendly Match
function fetchFriendlyState(friendId) {
    return fetch(`../php/friendly_fetch_request.php?friend_id=${friendId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    }).then(function(response) {
        return response.json();
    }).then(function (data) {
        if (data.type) {
            gameType = data.type;
        }
        if (data.status === 'success') {
            console.log("Friendly state fetched successfully:", data.friend_status);
            return data.friend_status;
        } else {
            console.error("Error fetching friend state:", data.message);
            return null; // Return null or handle error as needed
        }
    }).catch(function(error) {
        console.error("Fetch error:", error);
        return null; // Return null or handle error as needed
    });
}

// Call the fetchUsernames function to load the usernames when the page loads
document.addEventListener('DOMContentLoaded', function() {
    fetchUsernames();
    setInterval(fetchUsernames, 5000);// Set an interval to call fetchUsernames every 5 seconds 
});
