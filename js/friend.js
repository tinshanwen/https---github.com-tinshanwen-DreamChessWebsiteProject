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
        const row = document.createElement('tr'); // Create table row

        const nameCell = document.createElement('td'); // Create name cell
        nameCell.textContent = name;
        row.appendChild(nameCell);

        const idCell = document.createElement('td'); // Create ID cell
        idCell.textContent = data.ids[index];
        idCell.style.display = 'none'; // Hide the ID cell
        row.appendChild(idCell);

        const friendState = await fetchFriendState(data.ids[index]);

        if (friendState === "none") {
            // Add friend Button
            const addFriendCell = document.createElement('td'); // Create action cell
            const addFriendButton = document.createElement('button'); // Create add friend button
            addFriendButton.textContent = 'Add Friend';
            addFriendButton.onclick = function() {
                updateFriendRequest(data.ids[index], "pending"); // Function to send friend request
            };
            addFriendCell.appendChild(addFriendButton);
            row.appendChild(addFriendCell);
        }

        if (friendState === "pending") {
            
            const friendCell = document.createElement('td'); // Create action cell

            // Accept Friend Button
            const confirmFriendButton = document.createElement('button'); // Create accept friend button
            confirmFriendButton.textContent = 'Approve';
            const approveImg = document.createElement('img');
            approveImg.src = '../image/tick.png';
            confirmFriendButton.appendChild(approveImg);
            confirmFriendButton.onclick = function() {
                updateFriendRequest(data.ids[index], "approved"); // Function to send friend request
            };

            // Reject Friend Button
            const rejectFriendButton = document.createElement('button'); // Create reject friend button
            rejectFriendButton.textContent = 'Reject';
            const rejectImg = document.createElement('img');
            rejectImg.src = '../image/cross.png';
            rejectFriendButton.appendChild(rejectImg);
            rejectFriendButton.onclick = function() {
                updateFriendRequest(data.ids[index], "rejected"); // Function to send friend request
            };
            
            friendCell.appendChild(confirmFriendButton);
            friendCell.appendChild(rejectFriendButton);
            row.appendChild(friendCell);
        }

        
        if (friendState === "approved") {
            // Add Approved Notice
            const approveFriendCell = document.createElement('td'); // Create action cell
            const approveFriendDiv = document.createElement('div'); // Create add friend button
            approveFriendDiv.textContent = 'Friends';
            approveFriendCell.appendChild(approveFriendDiv);
            row.appendChild(approveFriendCell);
        }

        if (friendState === "waiting") {
            // Add Approved Notice
            const waitingFriendCell = document.createElement('td'); // Create action cell
            const waitingFriendDiv= document.createElement('div'); // Create add friend button
            waitingFriendDiv.textContent = 'Waiting for response';
            waitingFriendCell.appendChild(waitingFriendDiv);
            row.appendChild(waitingFriendCell);
        }

        userList.appendChild(row);
    }
}

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

// Call the fetchUsernames function to load the usernames when the page loads
document.addEventListener('DOMContentLoaded', function() {
    fetchUsernames();
    setInterval(fetchUsernames, 5000);// Set an interval to call fetchUsernames every 5 seconds 
});
