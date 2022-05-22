/**
 * Scripts relating to modals
 * Functions dynamically populate modals based on statistics
 */

/**
 * Used for opening various modals on the main site page
 * @param {*} type 
 * @param {*} id 
 */
 function openModal(type,id) {
    // Get the modal
    var modal = document.getElementById(type);

    // Get element to close modal
    var span = document.getElementById(id);
    modal.style.display = "block";

    // Clicking on cross icon closes modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Clicking outside of modal closes modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

/**
 * Victory modal functionality
 * @param {*} guesses number of guesses player made
 */
 function gameVictory(guesses) {
    var guessesMadeDiv = $("<div></div>");
    let totalguesses = guesses + 1;
    var guessesMade = fontColor($("<span></span>").text('You won in ' + totalguesses + ' guesses.'));
    guessesMadeDiv.append(guessesMade);
    $("#victoryScreen").append(guessesMadeDiv);

    var gamesWonDiv = $("<div></div>");
    var gamesWon = fontColor($("<span></span>").text('Total games won: ' + localStorage.gamesWon));
    gamesWonDiv.append(gamesWon);
    $("#victoryScreen").append(gamesWonDiv);

    var gamesPlayedDiv = $("<div></div>");
    var gamesPlayed = fontColor($("<span></span>").text('Total games played: ' + localStorage.gamesPlayed));
    gamesPlayedDiv.append(gamesPlayed);
    $("#victoryScreen").append(gamesPlayedDiv);

    var gamesWRDiv = $("<div></div>");
    var gamesWR = fontColor($("<span></span>").text('Win rate: ' + (localStorage.gamesWon/localStorage.gamesPlayed).toFixed(2)));
    gamesWRDiv.append(gamesWR);
    $("#victoryScreen").append(gamesWRDiv);

    var averageGuessesDiv = $("<div></div>");
    var averageGuesses = fontColor($("<span></span>").text('Average guesses: ' + (localStorage.totalGuesses/localStorage.gamesPlayed).toFixed(2)));
    averageGuessesDiv.append(averageGuesses);
    $("#victoryScreen").append(averageGuessesDiv);

    openModal('victory-modal', 'victory-close');
}

/**
 * Defeat modal functionality
 */
function gameDefeat() {
    var guessesMadeDiv = $("<div></div>");
    var guessesMade = fontColor($("<span></span>").text('You failed to guess the champion.'));
    guessesMadeDiv.append(guessesMade);
    $("#defeatScreen").append(guessesMadeDiv);

    var gamesWonDiv = $("<div></div>");
    var gamesWon = fontColor($("<span></span>").text('Total games won: ' + localStorage.gamesWon));
    gamesWonDiv.append(gamesWon);
    $("#defeatScreen").append(gamesWonDiv);

    var gamesPlayedDiv = $("<div></div>");
    var gamesPlayed = fontColor($("<span></span>").text('Total games played: ' + localStorage.gamesPlayed));
    gamesPlayedDiv.append(gamesPlayed);
    $("#defeatScreen").append(gamesPlayedDiv);

    var gamesWRDiv = $("<div></div>");
    var gamesWR = fontColor($("<span></span>").text('Win rate: ' + (localStorage.gamesWon/localStorage.gamesPlayed).toFixed(2)));
    gamesWRDiv.append(gamesWR);
    $("#defeatScreen").append(gamesWRDiv);

    var averageGuessesDiv = $("<div></div>");
    var averageGuesses = fontColor($("<span></span>").text('Average guesses: ' + (localStorage.totalGuesses/localStorage.gamesPlayed).toFixed(2)));
    averageGuessesDiv.append(averageGuesses);
    $("#defeatScreen").append(averageGuessesDiv);

    openModal('defeat-modal', 'defeat-close');
}

/**
* Dynamically update and display local storage statistics 
* Called when statistics modal is opened
*/
function populate_analytics() {
    if(localStorage.counterOne === undefined) {
        localStorage.counterOne = 0;
    }
    if(localStorage.counterTwo === undefined) {
        localStorage.counterTwo = 0;
    }
    if(localStorage.counterThree === undefined) {
        localStorage.counterThree = 0;
    }
    if(localStorage.counterFour === undefined) {
        localStorage.counterFour = 0;
    }
    if(localStorage.counterFive === undefined) {
        localStorage.counterFive = 0;
    }
    if(localStorage.counterSix === undefined) {
        localStorage.counterSix = 0;
    }
    if(localStorage.counterSeven === undefined) {
        localStorage.counterSeven = 0;
    }
    if(localStorage.counterEight === undefined) {
        localStorage.counterEight = 0;
    }
    let winpercentage = (localStorage.gamesWon / localStorage.gamesPlayed).toFixed(2);
    let averageguesses = (localStorage.totalGuesses/localStorage.gamesPlayed).toFixed(2);
    $('#gamesplayed').text('Games Played: ' + localStorage.gamesPlayed);
    $('#gameswon').text('Games Won: ' + (localStorage.gamesWon));
    $('#winpercentage').text('Win Percentage: ' + winpercentage);
    $('#averageguesses').text('Average Guesses: ' + averageguesses);
    $('#counterOne').text('Games ended with 1 guess: ' + localStorage.counterOne);
    $('#counterTwo').text('Games ended with 2 guesses: ' + localStorage.counterTwo);
    $('#counterThree').text('Games ended with 3 guesses: ' + localStorage.counterThree);
    $('#counterFour').text('Games ended with 4 guesses: ' + localStorage.counterFour);
    $('#counterFive').text('Games ended with 5 guesses: ' + localStorage.counterFive);
    $('#counterSix').text('Games ended with 6 guesses: ' + localStorage.counterSix);
    $('#counterSeven').text('Games ended with 7 guesses: ' + localStorage.counterSeven);
    $('#counterEight').text('Games ended with 8 guesses: ' + localStorage.counterEight);
}