/**
 * Contains javascript functions relating to feedback card functionality and general CSS
 */

/**
 * Create feedback cards with information from server-side game logic return values
 * @param {*} data The JSON object returned by the server
 */
 function createFeedbackCards(data) {
    var $container = $("<div>", {"class": "grid-container"});

    var name = $("<h4></h4>").text(data.name).hide().fadeIn("slow");
    name.css("font-size", "18px");
    name.css("text-transform", "uppercase")
    
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

    rolediv, yeardiv, skindiv = styleCard(rolediv, yeardiv, skindiv, data);

    $("#feedback-table").prepend($container);
    $("#feedback-table").prepend(name);
    $container.append(rolediv, yeardiv, skindiv).fadeIn("slow");
}

/**
 * Styling of feedback cards for correct guesses
 * @param {*} rolediv 
 * @param {*} yeardiv 
 * @param {*} skindiv 
 * @param {*} data 
 * @returns 
 */
function styleCard(rolediv, yeardiv, skindiv, data){
    if(darkMode == false) {
        rolediv.add(yeardiv).add(skindiv).css({"background-color": lMode_bg, "color": lMode_col});
    }

    else if(darkMode == true) {
        rolediv.add(yeardiv).add(skindiv).css({"background-color": dMode_bg, "color": dMode_col});
    }

    if(data.role == "correct") {rolediv.css("background-color", gold);}
    if(data.year == "correct") {yeardiv.css("background-color", gold);}
    if(data.skins == "correct") {skindiv.css("background-color", gold);}

    return rolediv, yeardiv, skindiv
}

/**
 * Create initial header to append feedback cards
 */
function createFeedbackHeaders() {
    var $headercontainer = $("<div>", {"class": "grid-container"});
    var roleheader = $("<p></p>").text("Role");
    var yearheader = $("<p></p>").text("Year");
    var skinheader = $("<p></p>").text("Skins");
    $headercontainer.append(roleheader, yearheader, skinheader);
    $headercontainer.css("border-bottom", "2px solid #BB8E42");
    $("#feedback-header").append($headercontainer).hide().fadeIn("slow");
}

/**
 * Dynamic icon based on user guess 
 * @param {*} feedback 
 * @returns icon for feedback card
 */
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