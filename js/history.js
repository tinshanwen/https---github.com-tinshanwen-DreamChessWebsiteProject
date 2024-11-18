// Call the fetchGames function to load the games when the page loads
document.addEventListener('DOMContentLoaded', function() {
    fetchGames();
});

function fetchGames() {
    fetch('../php/history_fetch_game.php', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        if (data.status === 'success') {
            console.log("Games fetched successfully:", data);
            displayGames(data);
        } else {
            console.error("Error fetching games:", data.message);
        }
    }).catch(function(error) {
        console.error("Fetch error:", error);
    });
}

async function displayGames(data) {
    const gameList = document.getElementById('gameList');
    gameList.innerHTML = ''; // Clear the existing list

    // Create table header
    const headerRow = document.createElement('tr');
    const headers = ['Game ID', 'White Player', 'Black Player', 'Game Type', 'Actions'];
    
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    gameList.appendChild(headerRow); // Append the header row to the table

    // Iterate over the data arrays, assuming they are all the same length
    for (let i = 0; i < data.game_id.length; i++) {
        const row = document.createElement('tr'); // Create table row
        row.classList.add('history');

        // Create Game ID Cell
        const gameIdCell = document.createElement('td');
        gameIdCell.textContent = data.game_id[i];
        row.appendChild(gameIdCell);

        // Create White Player Name Cell
        const whiteNameCell = document.createElement('td');
        whiteNameCell.textContent = data.white_name[i];
        row.appendChild(whiteNameCell);

        // Create Black Player Name Cell
        const blackNameCell = document.createElement('td');
        blackNameCell.textContent = data.black_name[i];
        row.appendChild(blackNameCell);

        // Create Game Type Cell
        const typeCell = document.createElement('td');
        typeCell.textContent = data.type[i];
        row.appendChild(typeCell);

        // Create "View Game" Button
        const actionCell = document.createElement('td');
        const viewButton = document.createElement('button');
        viewButton.textContent = 'View Game';
        viewButton.onclick = function() {
            if (data.type[i] === 'chess') {
                // Redirect to Chess history page
                window.location.href = `chessHistory.php?game_id=${data.game_id[i]}`;
            } else if (data.type[i] === 'xiangqi') {
                // Redirect to Xiang Qi history page
                window.location.href = `xiangQiHistory.php?game_id=${data.game_id[i]}`;
            }
        };
        actionCell.appendChild(viewButton);
        row.appendChild(actionCell);

        // Append the row to the game list
        gameList.appendChild(row);
    }
}
