// Constant variables
const results = document.getElementById('results');

var count = 1;

// Submits AJAX form with jquery
$(document).ready(function() {
    $('#input-form').on('submit', function(event) {
        $.ajax({
            data : {
                champion : $('#input').val() 
            },
            type : 'POST',
            url : '/process'
        })
        .done(function(data) {
            if(count === 1){createFeedbackHeaders();}
            createFeedbackCards(data)
            if(data.champion === "correct") {
                document.getElementById('submit').disabled = true;
                document.getElementById('submit').style.backgroundColor = 'red';

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
                    localStorage.totalGuesses = Number(localStorage.totalGuesses) + count - 1;
                } else {
                    localStorage.totalGuesses = count - 1;
                }

                gameVictory(count-1);
            }
            else if(data.champion === "incorrect" && count === 8) {
                document.getElementById('submit').disabled = true;
                document.getElementById('submit').style.backgroundColor = 'red';

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
                    localStorage.totalGuesses = count - 1;
                }

                gameDefeat();
            }
            else {incrementGuess();}
        })
        // Prevent form submitting data twice
        event.preventDefault();
        $("#input-form")[0].reset();
    })
})

function createFeedbackCards(data) {
    var $container = $("<div>", {"class": "grid-container"});

    var name = $("<h4></h4>").text(data.name).hide().fadeIn("slow");

    var rolediv = $("<div></div>")
    var yeardiv = $("<div></div>")
    var skindiv = $("<div></div>")

    // Assigning role, year and skin values to a var
    var rolevalue = $("<span></span>").text(data.rolevalue);
    var yearvalue = $("<span></span>").text(data.yearvalue);
    var skinvalue = $("<span></span>").text(data.skinvalue);
    
    rolediv.append(iconFeedback(data.role), rolevalue);
    yeardiv.append(iconFeedback(data.year), yearvalue);
    skindiv.append(iconFeedback(data.skins), skinvalue);

    $("#feedback-table").append(name);
    $container.append(rolediv, yeardiv, skindiv).fadeIn("slow");
    $("#feedback-table").append($container);
}

function createFeedbackHeaders() {
    var $headercontainer = $("<div>", {"class": "grid-container"});
    var roleheader = $("<p></p>").text("Role");
    var yearheader = $("<p></p>").text("Year");
    var skinheader = $("<p></p>").text("Skins");
    $headercontainer.append(roleheader, yearheader, skinheader)
    $("#feedback-header").append($headercontainer).hide().fadeIn("slow");
}

function iconFeedback(feedback) {
    var $icon
    if(feedback === "higher") {
        $icon = $("<i>", {"class": "fa fa-arrow-up"});
    }
    else if(feedback === "lower") {
        $icon = $("<i>", {"class": "fa fa-arrow-down"});
    }
    else if(feedback === "correct") {
        $icon = $("<i>", {"class": "fa fa-check"});
    }
    else if(feedback === "incorrect") {
        $icon = $("<i>", {"class": "fa fa-close"});
    }
    return $icon
}

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

function lightMode() {
    var element = document.body;
    var lightSwitch = document.getElementById("light-switch");

    var inputBox = document.getElementsByClassName("inputbox")[0];
    var userInput = document.getElementById("input");
    var submitButton = document.getElementById("submit");

    element.classList.toggle("light-mode");

    if(lightSwitch.checked) {
        // Input Box Styling
        inputBox.style.backgroundColor="#F4F4F3";
        inputBox.style.color ="#033039";

        // User Input Box Styling
        userInput.style.backgroundColor="#F4F4F3";
        userInput.style.color="#214249";
        userInput.style.borderColor="#214249";

        // Submit Button Styling
        submitButton.style.color="#F4F4F3";
        submitButton.style.borderColor="#214249";
        submitButton.style.backgroundColor="#214249";

        // Settings
        var modalContent = document.querySelectorAll(".modal-content");
        var modal = document.querySelectorAll(".modal");
        for (var i = 0; i < modalContent.length; i++){
            modalContent[i].style.backgroundColor="#F4F4F3";
            modal[i].style.color="#214249";
        }

    }

    else {
        // Input Box Styling
        inputBox.style.backgroundColor="#052329";
        inputBox.style.color="#F4F4F3";

        // User Input Box Styling
        userInput.style.backgroundColor="#052329";
        userInput.style.color="#F4F4F3";
        userInput.style.borderColor="#F4F4F3";
        
        // Submit Button Styling
        submitButton.style.color="#052329";
        submitButton.style.borderColor="#F4F4F3";
        submitButton.style.backgroundColor="#F4F4F3";

        // Settings
        var modalContent = document.querySelectorAll(".modal-content");
        var modal = document.querySelectorAll(".modal");
        for (var i = 0; i < modalContent.length; i++){
            modalContent[i].style.backgroundColor="#021119";
            modal[i].style.color="#F4F4F3";
        }
    }
}

function incrementGuess() {
    count += 1;
    document.getElementById("input").placeholder = "GUESS " + count + " OUT OF 8";
}

function gameVictory(guesses) {
    var guessesMadeDiv = $("<div></div>");
    var guessesMade = $("<span></span>").text('You won in ' + guesses + ' guesses.');
    guessesMadeDiv.append(guessesMade);
    $("#victoryScreen").append(guessesMadeDiv);

    var gamesWonDiv = $("<div></div>");
    var gamesWon = $("<span></span>").text('Total games won: ' + localStorage.gamesWon);
    gamesWonDiv.append(gamesWon);
    $("#victoryScreen").append(gamesWonDiv);

    var gamesPlayedDiv = $("<div></div>");
    var gamesPlayed = $("<span></span>").text('Total games played: ' + localStorage.gamesPlayed);
    gamesPlayedDiv.append(gamesPlayed);
    $("#victoryScreen").append(gamesPlayedDiv);

    var gamesWRDiv = $("<div></div>");
    var gamesWR = $("<span></span>").text('Win rate: ' + (localStorage.gamesWon/localStorage.gamesPlayed).toFixed(2));
    gamesWRDiv.append(gamesWR);
    $("#victoryScreen").append(gamesWRDiv);

    var averageGuessesDiv = $("<div></div>");
    var averageGuesses = $("<span></span>").text('Average guesses: ' + (localStorage.totalGuesses/localStorage.gamesPlayed).toFixed(2));
    averageGuessesDiv.append(averageGuesses);
    $("#victoryScreen").append(averageGuessesDiv);

    openModal('victory-modal', 'victory-close');
}

function gameDefeat() {
    var guessesMadeDiv = $("<div></div>");
    var guessesMade = $("<span></span>").text('You failed to guess the champion.');
    guessesMadeDiv.append(guessesMade);
    $("#defeatScreen").append(guessesMadeDiv);

    var gamesWonDiv = $("<div></div>");
    var gamesWon = $("<span></span>").text('Total games won: ' + localStorage.gamesWon);
    gamesWonDiv.append(gamesWon);
    $("#defeatScreen").append(gamesWonDiv);

    var gamesPlayedDiv = $("<div></div>");
    var gamesPlayed = $("<span></span>").text('Total games played: ' + localStorage.gamesPlayed);
    gamesPlayedDiv.append(gamesPlayed);
    $("#defeatScreen").append(gamesPlayedDiv);

    var gamesWRDiv = $("<div></div>");
    var gamesWR = $("<span></span>").text('Win rate: ' + (localStorage.gamesWon/localStorage.gamesPlayed).toFixed(2));
    gamesWRDiv.append(gamesWR);
    $("#defeatScreen").append(gamesWRDiv);

    var averageGuessesDiv = $("<div></div>");
    var averageGuesses = $("<span></span>").text('Average guesses: ' + (localStorage.totalGuesses/localStorage.gamesPlayed).toFixed(2));
    averageGuessesDiv.append(averageGuesses);
    $("#defeatScreen").append(averageGuessesDiv);

    openModal('defeat-modal', 'defeat-close');
}