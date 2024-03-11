const socket = io();

// Generate 100 checkboxes
const container = document.querySelector('.checkbox-container');
for (let i = 0; i < 100; i++) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.dataset.index = i; // Keep track of the checkbox index
    checkbox.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        socket.emit('checkboxClicked', index);
        // Prevent default checkbox behavior to wait for server sync
        e.preventDefault();
    });
    container.appendChild(checkbox);
}

// Listen for setup
socket.on('setup', ({ checkedCheckboxes, score }) => {
    document.getElementById('user-score').textContent = score;
    updateCheckboxes(checkedCheckboxes);
});

// Listen for updates from server
socket.on('update', ({ checkedCheckboxes, totalChecked, userScores }) => {
    const score = userScores[socket.id];
    document.getElementById('user-score').textContent = score;
    document.getElementById('total-checked').textContent = totalChecked;
    updateCheckboxes(checkedCheckboxes);
});

function updateCheckboxes(checkedCheckboxes) {
    const checkboxes = document.querySelectorAll('.checkbox-container input');
    checkboxes.forEach((checkbox, index) => {
        checkbox.checked = checkedCheckboxes[index];
    });
}
