from app import app
from flask import render_template, url_for

# Route for the home page. The majority of the page will be displayed here. 
@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')
