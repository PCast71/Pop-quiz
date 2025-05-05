document.addEventListener('DOMContentLoaded', () => {
    const scoreList = document.getElementById('high-scores-list');
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    if (highScores.length === 0) {
        scoreList.innerHTML = '<li>No scores yet. Be the first to conquer the code!</li>';
    } else {
        highScores
            .sort((a, b) => b.score - a.score)
            .slice(0, 10)
            .forEach(entry => {
                const li = document.createElement('li');
                li.textContent = `${entry.initials.toUpperCase()} — ${entry.score}`;
                scoreList.appendChild(li);
            });
    }
});

function clearScores() {
    localStorage.removeItem('highScores');
    location.reload();
}
