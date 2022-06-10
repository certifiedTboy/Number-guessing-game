// DOM selections
let currentUserField = document.querySelector(".username");
let submitButton = document.querySelector("#submit-button");
let resetGameButton = document.querySelector("#reset-game");
let guessedNumber = document.querySelector("#guessed-numbers");
let gameMessage = document.querySelector("#message");
let gameLevel = document.querySelector(".level");
let gameScore = document.querySelector(".score");
let gameInstruction = document.querySelector(".instruction");

let initalGameLevel = 1;
gameLevel.innerText = initalGameLevel;
gameScore.innerText = 0;

//promt user for username
let newUsername = prompt("What is your name");
while (newUsername.trim() === "") {
  newUsername = prompt("Your name is required to play the game!!!");
}

// default user data
let defaultUserData = {
  username: newUsername,
  score: 0,
};

currentUserField.innerText = `You are currently playing as ${newUsername}`;

// check if a user exist
const checkUserExistence = () => {
  const currentUsername = localStorage.getItem("currentUser");
  if (currentUsername) {
    localStorage.removeItem("currentUser");
  }
};

// save user data on local storage
const setCurrentUserData = () => {
  checkUserExistence();
  localStorage.setItem("currentUser", JSON.stringify(defaultUserData));
};

//generate initial random number at default index of 2
let randomIndex = 2;
let theRandomNumber = Math.floor(Math.random() * randomIndex) + 1;
console.log(`the first randomNumber ${theRandomNumber}`);

// further increment of random number index in continuous levels
const generateNewNumber = () => {
  return randomIndex++;
};

//number guessing function
const guessNumberGame = () => {
  if (guessedNumber.value === "") {
    gameMessage.innerText = "No number was entered!";
    return;
  }

  gameMessage.innerText = "";
  if (+guessedNumber.value === theRandomNumber) {
    //update user's score on local storage
    let userDetails = localStorage.getItem("currentUser");
    const currentUserData = JSON.parse(userDetails);
    let { score } = currentUserData;

    //increment user score and game level by 1
    defaultUserData.score++;
    initalGameLevel++;

    //display user's score and current game level on the UI
    gameScore.innerText = defaultUserData.score;
    gameLevel.innerText = initalGameLevel;

    //Empty predicted number on the text input
    guessedNumber.value = "";

    // Runs when user reaches the highest score of 5
    if (defaultUserData.score === 5) {
      alert(`Congratulations ${defaultUserData.username}, You Won!`);
      initalGameLevel = 1;
      gameLevel.innerText = 1;
      resetGameButton.classList.add("winner");
      resetGameButton.innerText = "Play Again!";
      return;
    }
    localStorage.setItem("currentUser", JSON.stringify(defaultUserData));
  } else {
    // runs when user guessed a wrong number
    gameMessage.innerText = "You guessed the wrong number, try again!!!";
    resetGameButton.innerText = "Play Again!";
    resetGameButton.classList.add("danger");
    localStorage.removeItem("currentUser");
    gameScore.innerText = 0;
    guessedNumber.value = "";
    return;
  }

  //change of random number
  if (defaultUserData.score > 0) {
    generateNewNumber();
    gameInstruction.innerText = `Guess a number between 1 and ${randomIndex}`;
    console.log(`increasing random index ${randomIndex}`);

    //generate new random by the increased random index
    theRandomNumber = Math.floor(Math.random() * randomIndex) + 1;
    console.log(`new random number ${theRandomNumber}`);
  }
};

//Reset game function to start game afresh
const resetGame = () => {
  resetGameButton.innerText = "Restart Game";
  gameMessage.innerText = "";
  initalGameLevel = 1;
  gameLevel.innerText = 1;
  gameScore.innerText = 0;
  randomIndex = 2;

  gameInstruction.innerText = `Guess a number between 1 and 2`;
  resetGameButton.classList.remove("danger");
  resetGameButton.classList.remove("winner");
  newUsername = prompt("What is your name");
  while (newUsername.trim() === "") {
    newUsername = prompt("Your name is required to play the game!!!");
  }

  theRandomNumber = Math.floor(Math.random() * randomIndex) + 1;

  console.log(`the rest button random index ${randomIndex}`);
  console.log(`reset button random number: ${theRandomNumber}`);
  checkUserExistence();

  defaultUserData = {
    username: newUsername,
    score: 0,
  };
  localStorage.setItem("currentUser", JSON.stringify(defaultUserData));
  currentUserField.innerText = `You are currently playing as ${newUsername}`;
};

submitButton.addEventListener("click", guessNumberGame);
resetGameButton.addEventListener("click", resetGame);
setCurrentUserData();
