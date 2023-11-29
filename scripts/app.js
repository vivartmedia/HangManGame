//someone thinks of a word and we keep it secret from the3 other players
//we will display a series of underscores depending on the length of the word
//each turn the player will guess 1 letter from the word
//if guess is correct we weill display the lettter in the blank word
//if incorrect we draw a piece of the hangman or tell teh user they have x amount of guesses left
//Add incorrect guess to a div.
//a Start button
//a Replay button

//we will be need to Id for:
//start button
//replay button
//wrong guesses
//hangman
//guesses/ Input
// ......................................................

//Id section
let startBtn = document.getElementById("startBtn");
let restartBtn = document.getElementById("restartBtn");

let SecretWord = document.getElementById("SecretWord");
let wrongGuesses = document.getElementById("wrongGuesses");
let hangMan = document.getElementById("hangMan");
let userInput = document.getElementById("userInput");

// Variablwes
//randomWord will be for our API call
//Wrong guess will be the user's incorrect input
//displayedWord will be for their correct input.

let randomWord = "";
let wrongGuess = "";
let displayedWord = [];

let guesses = 0;
let maxGuesses = 5;

// startBtn.addEventListener('click', function() {
//     //we will call our API function
//     // random-word-api.herokuapp.com/home
//     // https://random-word-api.herokuapp.com/word
//     ApiCAll();
// })

startBtn.addEventListener('click', function () {
    ApiCAll();
})

restartBtn.addEventListener('click', function () {
    resetGame();
})

function resetGame() {
    randomWord = "";
    wrongGuess = "";
    displayedWord = [];
    guesses = 0;
    wrongGuesses.textContent = "";
    SecretWord.textContent = "[Secret Word]";
    hangMan.textContent = "Hangman / Guesses left";
    userInput.readOnly = true;
    userInput.value = "";
}

function ApiCAll() {
    //We initiate the fetch request from our random word api
    fetch('https://random-word-api.herokuapp.com/word')
        .then((response) => {
            //we're .json() to parse the response into json data
            return response.json();
        })
        .then((data) => {
            console.log(data[0]);
            startGame(data[0]);

            })
}

function startGame(word) {
    displayedWord = [];
    randomWord = word;

    //now we have to change our displayed word to have _ for the lenght of our random word

    for (let i = 0; i < randomWord.length; i++)
    {
        displayedWord[i] = "_"
    }
    //We will update our "game state"
    updateGameStat();     
    userInput.readOnly = false;
}

function updateGameStat() {
    SecretWord.textContent = displayedWord.join(" ");
    hangMan.textContent = `Guesses left ${guesses} / ${maxGuesses}`
}

userInput.addEventListener('keydown', function (event) {
    
    if (event.key === "Enter") {
        let guess = userInput.value.toLowerCase();
        //check if the user's guess is included in our secret word.
        if (randomWord.includes(guess)) {
            //now that we know that guess is included. we have to figure out at what index it's included
            for (let i = 0; i < randomWord.length; i++){
                if (randomWord[i] === guess) {
                    displayedWord[i] = guess;
                }
            }
        } else {
            wrongGuess += guess;
            wrongGuesses.textContent = wrongGuess;
            guesses++;
        }


        updateGameStat();
        userInput.value = "";
        gameEnd();
    }
})


function gameEnd() {
    //checking if user guesses = max guesses = loser
    //check if secred word = to displayedWord winner

    if (guesses === maxGuesses) {
        alert(`You lose, your word was ${randomWord}`);
        resetGame();
    } else if (displayedWord.join("") === randomWord) {
        alert("Yay you won you've guessed: " + randomWord)
    }
}