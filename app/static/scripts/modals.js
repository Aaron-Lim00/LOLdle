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
function gameDefeat(answer) {
    var guessesMadeDiv = $("<div></div>");
    var guessesMade = fontColor($("<span></span>").text('You failed to guess the champion.'));
    guessesMadeDiv.append(guessesMade);
    $("#defeatScreen").append(guessesMadeDiv);

    var answerDiv = $("<div></div>");
    var answer = fontColor($("<span></span>").text('The answer was: ' + answer));
   answerDiv.append(answer);
    $("#defeatScreen").append(answerDiv);

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
    let winpercentage;
    let averageguesses;
    let gamesplayed;
    let gameswon;

    if(localStorage.gamesPlayed === undefined) {
        winpercentage = '0.00';
        averageguesses = '0.00';
        gamesplayed = 0;
        gameswon = 0;
    } else {
        winpercentage = (localStorage.gamesWon / localStorage.gamesPlayed).toFixed(2);
        averageguesses = (localStorage.totalGuesses/localStorage.gamesPlayed).toFixed(2);
        gamesplayed = localStorage.gamesPlayed;
        gameswon = localStorage.gamesWon;
    }

    $('#gamesplayed').text('Games Played: ' + gamesplayed);
    $('#gameswon').text('Games Won: ' + gameswon);
    $('#winpercentage').text('Win Percentage: ' + winpercentage + '%');
    $('#averageguesses').text('Avg. Guesses: ' + averageguesses);

    createGraph();
}

function createGraph(){
    const analytics = document.getElementById('myChart');
    const myChart = new Chart(analytics, {
        type: 'bar',
        data: {
            labels: ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight'],
            datasets: [{
                label: '# of Wins in relation to guesses',
                data: [ 
                    localStorage.counterOne, 
                    localStorage.counterTwo, 
                    localStorage.counterThree, 
                    localStorage.counterFour, 
                    localStorage.counterFive, 
                    localStorage.counterSix, 
                    localStorage.counterSeven, 
                    localStorage.counterEight
                ],
                backgroundColor: [
                    gold
                ],
                borderColor: [
                    gold
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            legend: {
                display: false
            }
        }
    });
}