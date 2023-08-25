
let storedJsonString = localStorage.getItem("selectedPhotoData");

let selectedPhotoData = JSON.parse(storedJsonString);
console.log("Retrieved selected photo data:", selectedPhotoData);



let hangmanImage = document.querySelector(".hangman-drawing img");
let wordDisplay = document.querySelector(".word-display");
let keyboardDiv = document.querySelector(".keyboard");
let guessesText = document.querySelector(".guess-text b");
let gameModal = document.querySelector(".game-modal ");
let playAgain = document.querySelector(".play-again");

let username = "";
let gameOn = false
let currentList;
let currentWord;
let wrongGuessCount;
let correctLetters;
const maxGuesses = 6

function resetGame() { // restart the game , hangman image, gusses, enable buttons

  correctLetters = [];
  wrongGuessCount = 0;
  hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  
  let keyboardButtons = keyboardDiv.querySelectorAll("button");
  keyboardButtons.forEach(btn => btn.disabled = false);
  
  wordDisplay.innerHTML = currentWord.split("").map(() => '<li class="letter"></li>').join(""); 
  
  gameModal.classList.remove("show");
}


function getRandomWord(wordList) { // give a random word and hint.
  let { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentList = wordList;
  currentWord = word;

  let hintElement = document.querySelector(".hint-text b");
  hintElement.innerText = hint;
  hintElement.style.color = "black";

  resetGame();
}



function gameOver(isWin) {
  let modalText = isWin ? "you found the word:" : "the correct word was:";
  let gameModalImage = gameModal.querySelector("img");
  let gameModalHeading = gameModal.querySelector("h4");
  let gameModalParagraph = gameModal.querySelector("p");

  if (isWin) {
    gameModalImage.src = "images/won.gif";
    gameModalHeading.innerText = "congrats!";
    let winnerUsername = localStorage.getItem("username");
    let usersObj = JSON.parse(localStorage.getItem("usersObj"));

    if (usersObj.hasOwnProperty(winnerUsername)) {
      usersObj[winnerUsername].gamesWon++;

      localStorage.setItem("usersObj", JSON.stringify(usersObj));
    }
  } else {
    gameModalImage.src = "images/loser.gif";
    gameModalHeading.innerText = "Game Over!";
  }

  gameModalParagraph.innerHTML = `${modalText} <b>${currentWord}</b>`;
  gameModal.classList.add("show");
}



function initGame(button, clickedLetter) {   // Check if the letter is in the word
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => { // splits the word into single arrays and check if the letter is there.
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    wrongGuessCount++; // Adding to guess count and changing the hangman image accordingly
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
  }

  button.disabled = true;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

  if (wrongGuessCount === maxGuesses) { // Calling gameover function
    return gameOver(false);
  }
  if (correctLetters.length === currentWord.length) {
    return gameOver(true);
  }
}

    
    // create the keyboard buttons from charcode chart.
    for (let i = 97; i < 123; i++) { 
      const button = document.createElement("button");
      button.innerText = String.fromCharCode(i);
      keyboardDiv.appendChild(button);
      button.addEventListener("click", e => {
        if (currentWord) { // Check if currentWord is defined
          initGame(e.target, String.fromCharCode(i));
        }
      });
    }
    document.getElementById("level1").addEventListener("click", () => getRandomWord(wordListLevel1))
    document.getElementById("level2").addEventListener("click", () => getRandomWord(wordListLevel2))
    document.getElementById("level3").addEventListener("click", () => getRandomWord(wordListLevel3))
    playAgain.addEventListener("click", () => getRandomWord(currentList))

    
  document.addEventListener('DOMContentLoaded', () => { // the moment the page loaded display username and photo
      let userDisplay = document.getElementById("characterName");
      userDisplay.innerHTML = `Hello ${localStorage.getItem("username")}`; // takes the username from storage.
      let displayedPhoto = document.getElementById("displayed-photo");
    displayedPhoto.setAttribute("src", selectedPhotoData.imageSrc);
    displayedPhoto.setAttribute("alt", selectedPhotoData.altText);

    }
  )
  