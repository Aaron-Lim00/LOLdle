from app import app, db
from app.models import Champion
from flask import render_template, url_for, request, jsonify

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
    champ_role = champ.role
    champ_year = champ.year 
    champ_skins = champ.skins

    return jsonify({'champion' : champ_name, 'role' : champ_role, 'year' : champ_year, 'skins' : champ_skins}) 
