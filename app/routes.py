from app import app, db
from app.models import Champion
from flask import render_template, request, jsonify, abort
import datetime
import random

# Retrieves champion list from database for autocomplete form
@app.route("/", methods=["POST", "GET"])
def home():
    if request.method == "GET":
        # Query data from database to allow updating of champion list
        res = Champion.query.with_entities(Champion.name)

        # Structuring of queries data into a usable list
        champions = [str(r)[2:-3] for r in res]
    
    return render_template("index.html", champions=champions)

# Route for the home page. The majority of the page will be displayed here. 
@app.route('/index')
def index():
    return render_template('index.html')

# Process form 
@app.route('/process', methods=['POST'])
def process():
    # Get data from request object - champion name
    champion = request.form
    champ2 = champion.to_dict()['champion']

    # Find champion data in champion database
    champ = Champion.query.filter_by(name=champ2).first()
    
    # If champion does not exist in database or input is incorrect
    if champ == None:
        abort(403, "Forbidden: Invalid champion name")

    # Retrieve a seeded answer based on days since epoch in db
    seed = (datetime.datetime.utcnow() - datetime.datetime(1970,1,1)).days
    random.seed(seed)
    answer_index = random.randint(1,159)
    answer_champ = Champion.query.get(answer_index)
    
    # Compare champ year with answer
    if (champ.role == answer_champ.role):
        role_feedback = "correct"
    else:
        role_feedback = "incorrect"

    # Compare champ year guess with answer
    if (int(champ.year) > int(answer_champ.year)):
        year_feedback = "lower"
    elif (int(champ.year) < int(answer_champ.year)):
        year_feedback = "higher"
    else:
        year_feedback = "correct"

    # Compare champ skins guess with answer
    if (int(champ.skins) > int(answer_champ.skins)):
        skins_feedback = "lower"
    elif (int(champ.skins) < int(answer_champ.skins)):
        skins_feedback = "higher"
    else:
        skins_feedback = "correct"

    # Check whether guess is correct
    if (champ.name == answer_champ.name):
        champ_feedback = "correct"
    else:
        champ_feedback = "incorrect"
        
    # Currently returns a JSON object with champion data
    return jsonify({
        'champion' : champ_feedback, 
        'name' : champ.name,
        'role' : role_feedback, 
        'rolevalue' : champ.role,
        'year' : year_feedback, 
        'yearvalue' : champ.year,
        'skins' : skins_feedback,
        'skinvalue' : champ.skins
        }) 
