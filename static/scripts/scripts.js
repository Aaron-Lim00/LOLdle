// Constant variables
const results = document.getElementById('results');

// Class is used for player guesses
class Guess {
    constructor(name) {
        this.name = name;
    }
}

// Called when user clicks submit button
function guess() {
    let name = $('#userinput').val();
    let newGuess = new Guess(name);
    displayGuess(newGuess)
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

