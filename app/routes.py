
from sunau import AUDIO_UNKNOWN_SIZE
from app import app, db
from app.models import Champion
from flask import render_template, url_for, request, jsonify
import datetime
import random

# Route for the home page. The majority of the page will be displayed here. 
@app.route('/')
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
    champ_name = champ.name

    # Retrieve a seeded answer based on days since epoch in db
    seed = (datetime.datetime.utcnow() - datetime.datetime(1970,1,1)).days
    random.seed(seed)
    answer_index = random.randint(1,159)
    answer_champ = Champion.query.get(answer_index)
    ans_name = answer_champ.name
    
    # Compare champ year with answer
    if (champ.role == answer_champ.role):
        role_feedback = "correct"
    else:
        role_feedback = "incorrect"

    # Compare champ year guess with answer
    if (int(champ.year) >= int(answer_champ.year)):
        year_feedback = "lower"
    elif (int(champ.year) <= int(answer_champ.year)):
        year_feedback = "higher"
    else:
        year_feedback = "correct"

    # Compare champ skins guess with answer
    if (int(champ.skins) >= int(answer_champ.skins)):
        skins_feedback = "lower"
    elif (int(champ.skins) <= int(answer_champ.skins)):
        skins_feedback = "higher"
    else:
        skins_feedback = "correct"
        
    # Currently returns a JSON object with champion data
    return jsonify({'champion' : ans_name, 'role' : role_feedback, 
    'year' : year_feedback, 'skins' : skins_feedback}) 
