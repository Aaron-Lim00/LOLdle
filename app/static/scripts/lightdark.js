/**
 * Scripts relating to light and dark mode
 */

 var darkMode = true;

 // Colour variables
 var gold = "#BB8E42";
 var lMode_bg = "#F4F4F3";
 var lMode_col = "#214249";
 var dMode_bg = "#052329";
 var dMode_col = "#F4F4F3";

 /**
 * Variables for CSS changes when site is in light mode
 */
function lightMode() {
    let element = document.body;
    let lightSwitch = document.getElementById("light-switch");

    let inputBox = document.getElementsByClassName("inputbox")[0];
    let userInput = document.getElementById("input");
    let submitButton = document.getElementById("submit");

    element.classList.toggle("light-mode");

    if(lightSwitch.checked) {
        darkMode = false;
        // Input Box Styling
        inputBox.style.backgroundColor=lMode_bg;
        inputBox.style.color ="#033039";

        // User Input Box Styling
        userInput.style.backgroundColor=lMode_bg;
        userInput.style.color=lMode_col;
        userInput.style.borderColor=lMode_col;

        // Submit Button Styling
        submitButton.style.color=lMode_bg;
        submitButton.style.borderColor=lMode_col;
        submitButton.style.backgroundColor=lMode_col;

        // Settings
        let modalContent = document.querySelectorAll(".modal-content");
        let modal = document.querySelectorAll(".modal");
        for (let i = 0; i < modalContent.length; i++){
            modalContent[i].style.backgroundColor=lMode_bg;
            modal[i].style.color=lMode_col;
        }

        // Feedback Cards
        let feedbackCards = document.querySelectorAll(".grid-container > div");
        for (let i = 0; i < feedbackCards.length; i++){
            feedbackCards[i].style.backgroundColor=lMode_bg;
            feedbackCards[i].style.color=lMode_col;
        }

        // Victory and Defeat
        let victory_header = document.getElementById("victory-header");
        let defeat_header = document.getElementById("defeat-header");
        victory_header.style.color=lMode_col;
        defeat_header.style.color=lMode_col;

    }

    else {
        darkMode = true;
        // Input Box Styling
        inputBox.style.backgroundColor=dMode_bg;
        inputBox.style.color=dMode_col;

        // User Input Box Styling
        userInput.style.backgroundColor=dMode_bg;
        userInput.style.color=dMode_col;
        userInput.style.borderColor=dMode_col;
        
        // Submit Button Styling
        submitButton.style.color=dMode_bg;
        submitButton.style.borderColor=dMode_col;
        submitButton.style.backgroundColor=dMode_col;

        // Settings
        let modalContent = document.querySelectorAll(".modal-content");
        let modal = document.querySelectorAll(".modal");
        for (let i = 0; i < modalContent.length; i++){
            modalContent[i].style.backgroundColor="#021119";
            modal[i].style.color=dMode_col;
        }

        // Feedback Cards
        let feedbackCards = document.querySelectorAll(".grid-container > div");
        for (let i = 0; i < feedbackCards.length; i++){
            feedbackCards[i].style.backgroundColor=dMode_bg;
            feedbackCards[i].style.color=dMode_col;
        }

        // Victory and Defeat
        let victory_header = document.getElementById("victory-header");
        let defeat_header = document.getElementById("defeat-header");
        victory_header.style.color=dMode_col;
        defeat_header.style.color=dMode_col;
    }
}

/**
 * Change font colour when switching between light and dark mode
 * @param {*} object 
 * @returns 
 */
 function fontColor(object) {
    if (darkMode == false) {
        object.css("color", lMode_col);
    }
    return object
}