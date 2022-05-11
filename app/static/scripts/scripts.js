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
            var $container = $("<div>", {"class": "grid-container"});
            
            var name = $("<h4></h4>").text(data.name);

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
            $container.append(rolediv, yeardiv, skindiv);
            $("#feedback-table").append($container);
        })
        // Prevent form submitting data twice
        event.preventDefault();
        $("#input-form")[0].reset();
    })
})

function iconFeedback(feedback) {
    var $icon
    if(feedback === "higher") {
        $icon = $("<i>", {"class": "fa fa-arrow-up"});
    }
    else if(feedback === "lower") {
        $icon = $("<i>", {"class": "fa fa-arrow-down"});
    }
    else if(feedback == "correct") {
        $icon = $("<i>", {"class": "fa fa-check"});
    }
    else if(feedback == "incorrect") {
        $icon = $("<i>", {"class": "fa fa-close"});
    }
    return $icon
}


// Class is used for player guesses
class Guess {
    constructor(name) {
        this.name = name;
    }
}

// Called when user clicks submit button
function guess() {
    if ($('#userinput').val() === '') {
        // skip
    } else {
        let name = $('#userinput').val();
        let newGuess = new Guess(name);
        displayGuess(newGuess)
    }
}

// This function makes a card with feedback
function displayGuess(guess) {
    // The results card
    let card = document.createElement('div');
    card.classList.add("card");

    // Add div with champ name
    let champ = document.createElement('div');
    champ.classList.add("champ-header")
    let championName = document.createTextNode(guess.name);
    champ.appendChild(championName);
    card.appendChild(champ);

    // Add a div containing visual feedback

    // Add div containing feedback about class, year, skins
    let feedback = document.createElement('div');
    feedback.classList.add('feedback');

    let role = document.createElement('div');
    let roleText = document.createTextNode('Role');
    role.appendChild(roleText);
    feedback.appendChild(role);

    let year = document.createElement('div');
    let yearText = document.createTextNode('Year');
    year.appendChild(yearText);
    feedback.appendChild(year);

    let skins = document.createElement('div');
    let skinsText = document.createTextNode('Skins');
    skins.appendChild(skinsText);
    feedback.appendChild(skins);
    
    card.appendChild(feedback);

    // Add the card to results list
    $('#results').append(card);
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

function newGuess() {
    count += 1;
    if(count < 9) {
        document.getElementById("input").placeholder = "GUESS " + count + " OUT OF 8";
    }
    else {
        // ...
    }
}