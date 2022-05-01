from app import app
from flask import render_template, url_for, request, jsonify

# Route for the home page. The majority of the page will be displayed here. 
@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

# Process form 
@app.route('/process', methods=['POST'])
def process():
    # Get data from request object
    champion = request.form['input']

    # Do something
    newChamp = champion

    return jsonify({'champion' : newChamp})