from app import app
from flask import render_template, url_for
from flask_login import current_user, login_user
from app.models import User

# Route for the home page. The majority of the page will be displayed here. 
@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')
