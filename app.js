const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Constants for the game
const TARGET_WORD = "APPLE";
const NUM_OF_GUESSES = 6;
const WORD_LENGTH = TARGET_WORD.length;

// Create the keyboard
const keyboard = document.getElementById("keyboard");
letters.forEach((letter) => {
  const key = document.createElement("div");
  key.classList.add("key");
  key.textContent = letter;
  key.setAttribute("id", `key-${letter}`);
  key.setAttribute("data-key", letter);
  keyboard.appendChild(key);
});

const enterKey = document.createElement("div");
enterKey.classList.add("key");
enterKey.textContent = "ENTER";
enterKey.setAttribute("id", "key-ENTER");
enterKey.setAttribute("data-key", "ENTER");
keyboard.appendChild(enterKey);

const backspaceKey = document.createElement("div");
backspaceKey.classList.add("key");
backspaceKey.textContent = "BACKSPACE";
backspaceKey.setAttribute("id", "key-BACKSPACE");
backspaceKey.setAttribute("data-key", "BACKSPACE");
keyboard.appendChild(backspaceKey);

// Create the grid
const grid = document.getElementById("grid");

for (let i = 0; i < NUM_OF_GUESSES * WORD_LENGTH; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  grid.appendChild(cell);
}

let currentGuess = "";
let currentRow = 0;

// Function to handle key presses
keyboard.addEventListener("click", function (event) {
  if (!event.target.classList.contains("key")) return;
  const key = event.target.dataset.key;
  handleKeyPress(key);
});

document.addEventListener("keydown", function (event) {
  const key = event.key.toUpperCase();
  if (key === "ENTER" || key === "BACKSPACE" || letters.includes(key)) {
    handleKeyPress(key);
  }
});

// Handle key press logic
function handleKeyPress(key) {
  if (key === "ENTER") {
    if (currentGuess.length === WORD_LENGTH) {
      checkGuess();
    }
  } else if (key === "BACKSPACE") {
    currentGuess = currentGuess.slice(0, -1);
    updateGrid();
  } else if (currentGuess.length < WORD_LENGTH) {
    currentGuess += key;
    updateGrid();
  }
}
// Update the grid with the current guess
function updateGrid() {
  const row = Array.from(grid.children).slice(
    currentRow * WORD_LENGTH,
    (currentRow + 1) * WORD_LENGTH
  );
  row.forEach((cell, i) => {
    cell.textContent = currentGuess[i] || "";
  });
}

// Check the guess and update the UI
function checkGuess() {
  const row = Array.from(grid.children).slice(
    currentRow * WORD_LENGTH,
    (currentRow + 1) * WORD_LENGTH
  );
  const guess = currentGuess.split("");

  guess.forEach((letter, i) => {
    const cell = row[i];
    if (letter === TARGET_WORD[i]) {
      cell.classList.add("correct");
    } else if (TARGET_WORD.includes(letter)) {
      cell.classList.add("present");
    } else {
      cell.classList.add("absent");
    }
  });

  if (currentGuess === TARGET_WORD) {
    alert("Congratulations! You guessed the word!");
    return;
  }

  currentRow++;
  currentGuess = "";

  if (currentRow === NUM_OF_GUESSES) {
    alert(`Game over! The word was: ${TARGET_WORD}`);
  }
}
