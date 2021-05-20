const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

//list of words to play game
const words = [
  "antifungal",
  "antifungals",
  "bifunctional",
  "Corncockle",
  "cofunction",
  "Ramsons",
  "cofunctions",
  "Hello",
  "Daisy",
  "Wood ",
  "World",
  "How",
  "are",
  "you",
  "Abelia",
  "Abeliophyllum",
  "Abelmoschus",
  "Abies",
  "Abroma",
  "Abromeitiella",
  "Abronia",
  "Abrus",
  "Abutilon",
  "Acacia",
  "Acaena",
  "Acalypha",
  "Acanthaceae",
];

//init word
let randomWord;

//init score
let score = 0;

//init time
let time = 10;

//set difficulty to value in LS or medium
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

//set difficulty select value
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

//focus on text on start
text.focus();

//start counting down
const timeInterval = setInterval(updateTime, 1000);

//generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}
//console.log(getRandomWord());

//add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

//update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

//update time
function updateTime() {
  //console.log(123);
  time--;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);
    //end game
    gameOver();
  }
}

//game over,show end screen
function gameOver() {
  endgameEl.innerHTML = `
<h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
`;
  endgameEl.style.display = "flex";
}

addWordToDOM();

//Event Listeners
//Typing
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    //clear
    e.target.value = "";

    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }
  }
});

//settings btn click
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

// settings select
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  //console.log(difficulty);
  localStorage.setItem("difficulty", difficulty);
});
