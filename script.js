let foundWords = [];
let score = 0;
let time = 0;
let timerInterval;
let playerName = '';

// Lista completa de palavras disponíveis
const allWords = ["TIKUNA", "BANIWA", "YANOMAMI", "TUKANO", "DASSANA", "BARÉ", "MAKU", "HUPDA", 
                  "MUNDURUKU", "KAYAPÓ", "XIKRIN", "ARAWETÉ", "PARAKANÃ", "ASURINI", "TEMBÉ", 
                  "TAPAJÓ", "AHANINKA", "SHANENAWA", "MADIJÁ", "YAWANAWÁ"];

document.getElementById('start-game-button').addEventListener('click', () => {
    const nameInput = document.getElementById('player-name');
    playerName = nameInput.value.trim();

    if (!playerName) {
        alert('Por favor, insira seu nome antes de jogar!');
        return;
    }

    document.getElementById('player-display').textContent = playerName;
    document.getElementById('name-section').classList.add('hidden');
    document.querySelector('#player-display').parentElement.classList.remove('hidden');

    initializeGame();
    startTimer();
});

function getRandomWords(wordArray, count) {
    const shuffled = wordArray.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function initializeGame() {
    const words = getRandomWords(allWords, 5); // Seleciona 5 palavras aleatórias
    const grid = document.getElementById('word-search');
    const wordList = document.getElementById('words');
    const scoreDisplay = document.getElementById('score');
    const timeDisplay = document.getElementById('time');

    foundWords = [];
    score = 0;
    time = 0;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = time;

    wordList.innerHTML = words.map(word => `<li>${word}</li>`).join('');

    const size = 11;
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÁÉÍÓÚ";
    let board = Array.from({ length: size }, () => Array(size).fill(''));

    words.forEach(word => {
        let placed = false;
        while (!placed) {
            const row = Math.floor(Math.random() * size);
            const col = Math.floor(Math.random() * size);
            const direction = Math.random() > 0.5 ? "horizontal" : "vertical";

            if (direction === "horizontal" && col + word.length <= size && checkIfSpaceAvailable(board, word, row, col, direction)) {
                for (let i = 0; i < word.length; i++) {
                    board[row][col + i] = word[i];
                }
                placed = true;
            } else if (direction === "vertical" && row + word.length <= size && checkIfSpaceAvailable(board, word, row, col, direction)) {
                for (let i = 0; i < word.length; i++) {
                    board[row + i][col] = word[i];
                }
                placed = true;
            }
        }
    });

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (!board[i][j]) {
                board[i][j] = letters[Math.floor(Math.random() * letters.length)];
            }
        }
    }

    grid.innerHTML = '';
    board.forEach((row, rowIndex) => {
        row.forEach((letter, colIndex) => {
            const cell = document.createElement('div');
            cell.textContent = letter;
            cell.dataset.row = rowIndex;
            cell.dataset.col = colIndex;
            cell.classList.add('cell');
            cell.addEventListener('click', () => selectLetter(cell, words));
            grid.appendChild(cell);
        });
    });
}

function checkIfSpaceAvailable(board, word, row, col, direction) {
    for (let i = 0; i < word.length; i++) {
        if (direction === "horizontal" && board[row][col + i] !== '') {
            return false;
        }
        if (direction === "vertical" && board[row + i][col] !== '') {
            return false;
        }
    }
    return true;
}

function startTimer() {
    const timeDisplay = document.getElementById('time');
    timerInterval = setInterval(() => {
        time++;
        timeDisplay.textContent = time;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function selectLetter(cell, words) {
    cell.classList.toggle('selected');
    const selectedLetters = Array.from(document.querySelectorAll('.selected')).map(el => el.textContent).join('');

    if (words.includes(selectedLetters) && !foundWords.includes(selectedLetters)) {
        foundWords.push(selectedLetters);
        updateScore(10);
        markWordAsFound(selectedLetters);

        if (foundWords.length === words.length) {
            stopTimer();
            saveToRanking(playerName, time);

            document.getElementById('name-section').classList.remove('hidden');
            document.querySelector('#player-display').parentElement.classList.add('hidden');
            document.getElementById('player-name').value = '';

            initializeGame();
        }
    }
}

function updateScore(points) {
    score += points;
    document.getElementById('score').textContent = score;
}

function markWordAsFound(word) {
    const wordList = document.getElementById('words');
    const items = wordList.querySelectorAll('li');

    items.forEach(item => {
        if (item.textContent === word) {
            item.classList.add('found');
        }
    });

    const selectedCells = document.querySelectorAll('.selected');
    selectedCells.forEach(cell => {
        cell.classList.remove('selected');
        cell.classList.add('inactive');
    });
}

function saveToRanking(player, time) {
    if (!player) {
        alert("Por favor, insira seu nome para salvar no ranking!");
        return;
    }
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    ranking.push({ player, time });
    ranking.sort((a, b) => a.time - b.time);
    localStorage.setItem('ranking', JSON.stringify(ranking));
    updateRanking();
}

function updateRanking() {
    const rankingList = document.getElementById('ranking-list');
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    rankingList.innerHTML = ranking
        .map(entry => `<tr><td>${entry.player}</td><td>${entry.time}</td></tr>`)
        .join('');
}

document.getElementById('clear-ranking-button').addEventListener('click', () => {
    if (confirm('Tem certeza de que deseja zerar o ranking?')) {
        localStorage.removeItem('ranking');
        updateRanking();
    }
});

updateRanking();
