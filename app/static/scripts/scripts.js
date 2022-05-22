// Constant variables
const results = document.getElementById('results');

var count = 1;
let victory = false;

/**
 * Submits AJAX form request with jquery
 * Return function is used to do client-side game logic and DOM manipulation
 */
$(document).ready(function() {
    $('#input-form').on('submit', function(event) {
        guess = $('#input').val();
        guess = guess[0].toUpperCase() + guess.substring(1);
        $.ajax({
            data : {
                champion : guess
            },
            type : 'POST',
            url : '/process'
        })
        .done(function(data) {
            if(count === 1){createFeedbackHeaders();}
            createFeedbackCards(data)
            if(data.champion === "correct") {
                victory = true;
                saveGuessCounter(count);
                document.getElementById('submit').disabled = true;
                document.getElementById('submit').style.backgroundColor = "rgba(64,64,64, 0.8)";
                document.getElementById('submit').style.cursor = "not-allowed";

                if(localStorage.gamesWon) {
                    localStorage.gamesWon = Number(localStorage.gamesWon) + 1;
                } else {
                    localStorage.gamesWon = 1;
                }

                if(localStorage.gamesPlayed) {
                    localStorage.gamesPlayed = Number(localStorage.gamesPlayed) + 1;
                } else {
                    localStorage.gamesPlayed = 1;
                }

                if(localStorage.totalGuesses) {
                    localStorage.totalGuesses = Number(localStorage.totalGuesses) + count;
                } else {
                    localStorage.totalGuesses = count;
                }

                $('#victory-image').fadeIn(1000)
                setTimeout(function(){
                    $('#victory-image').fadeOut(1000)
                    gameVictory(count-1);
                }, 2500);
                
            }
            else if(data.champion === "incorrect" && count === 8) {
                saveGuessCounter(count);
                document.getElementById('submit').disabled = true;
                document.getElementById('submit').style.backgroundColor = "rgba(64,64,64, 0.8)";
                document.getElementById('submit').style.cursor = "not-allowed";

                if(localStorage.gamesPlayed) {
                    localStorage.gamesPlayed = Number(localStorage.gamesPlayed) + 1;
                } else {
                    localStorage.gamesPlayed = 1;
                }

                if(localStorage.gamesWon) {
                    // 
                } else {
                    localStorage.gamesWon = 0;
                }

                if(localStorage.totalGuesses) {
                    localStorage.totalGuesses = Number(localStorage.totalGuesses) + count - 1;
                } else {
                    localStorage.totalGuesses = count;
                }

                $('#defeat-image').fadeIn(1000)
                setTimeout(function(){
                    $('#defeat-image').fadeOut(1000)
                    gameDefeat();
                }, 2500);
            }
            else {incrementGuess();}
        })
        // Prevent form submitting data twice
        event.preventDefault();
        $("#input-form")[0].reset();
    })
})

/**
 * Increment guess after each user guess
 * Updates placeholder text in game text input
 */
function incrementGuess() {
    count += 1;
    document.getElementById("input").placeholder = "GUESS " + count + " OUT OF 8";
}

/**
 * Clear the local storage on user machine
 */
function clearStorage() {
    // Clear localStorage items 
    if (confirm("WARNING: confirm statistics reset")) {
        localStorage.clear();
    } else {
        //
    }
}

/**
 * Share button functionality
 * Uses local storage to create a formatted string
 * Adds formatted string to user clipboard
 */
function share() {
    let winpercentage = (localStorage.gamesWon / localStorage.gamesPlayed).toFixed(2);
    let averageguesses = (localStorage.totalGuesses/localStorage.gamesPlayed).toFixed(2);
    let gamesplayed = localStorage.gamesPlayed;
    let gameswon = localStorage.gamesWon;
    let guesses = count;

    let result = ``;
    if(victory) {
        result += `Victory!\n`;
    } else {
        result += `Defeat!\n`;
    }
    result += `Game ended with ${guesses} guesses\n`;
    result += `Average number of guesses: ${averageguesses}\n`;
    result += `Total games won: ${gameswon}\n`;
    result += `Total games played: ${gamesplayed}\n`;
    result += `Win percentage: ${winpercentage*100}%\n`;

    navigator.clipboard.writeText(result);
}

/**
 * A function to update localstorage statistics for a particular number of guesses
 * @param {*} count the number of guesses the user made
 */
function saveGuessCounter(count) {
    if (count === 1) {
        if (localStorage.counterOne) {
            localStorage.counterOne = Number(localStorage.counterOne) + 1;
        } else {
            localStorage.counterOne = 1;
        }
    } else if (count === 2) {
        if (localStorage.counterTwo) {
            localStorage.counterTwo = Number(localStorage.counterTwo) + 1;
        } else {
            localStorage.counterTwo = 1;
        }
    } else if (count === 3) {
        if (localStorage.counterThree) {
            localStorage.counterThree = Number(localStorage.counterThree) + 1;
        } else {
            localStorage.counterThree = 1;
        }
    } else if (count === 4) {
        if (localStorage.counterFour) {
            localStorage.counterFour = Number(localStorage.counterFour) + 1;
        } else {
            localStorage.counterFour = 1;
        }
    } else if (count === 5) {
        if (localStorage.counterFive) {
            localStorage.counterFive = Number(localStorage.counterFive) + 1;
        } else {
            localStorage.counterFive = 1;
        }
    } else if (count === 6) {
        if (localStorage.counterSix) {
            localStorage.counterSix = Number(localStorage.counterSix) + 1;
        } else {
            localStorage.counterSix = 1;
        }
    } else if (count === 7) {
        if (localStorage.counterSeven) {
            localStorage.counterSeven = Number(localStorage.counterSeven) + 1;
        } else {
            localStorage.counterSeven = 1;
        }
    } else if (count === 8) {
        if (localStorage.counterEight) {
            localStorage.counterEight = Number(localStorage.counterEight) + 1;
        } else {
            localStorage.counterEight = 1;
        }
    }
}
