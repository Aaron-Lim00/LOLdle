# import winsound
from app import app, db
from flask_login import current_user, login_required, login_user, logout_user
from app.models import Champion, User, Score
from flask import render_template, url_for, request, jsonify, flash, redirect
from app.forms import LoginForm, RegistrationForm
from werkzeug.urls import url_parse
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
    
    if current_user.is_authenticated:
        user_id=current_user.id
        onlineGamesPlayed = Score.query.filter_by(user_id=user_id).all()
        onlineGamesWon = Score.query.filter_by(user_id=user_id).all()
        onlineAverageGuesses= Score.query.filter_by(user_id=user_id).all()
    
    return render_template("index.html", champions=champions, onlineGamesPlayed=onlineGamesPlayed, onlineGamesWon=onlineGamesWon, onlineAverageGuesses=onlineAverageGuesses )



# Route for the home page. The majority of the page will be displayed here. 
# @app.route('/index')
# def index():
#     return render_template('index.html')

# Process form 
@app.route('/process', methods=['POST'])
def process():
    # Get data from request object - champion name
    champion = request.form
    champ2 = champion.to_dict()['champion']

    # Find champion data in champion database
    champ = Champion.query.filter_by(name=champ2).first()

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
        # count +=1
        # wins +=1
        
    else:
        champ_feedback = "incorrect"
        # count +=1
        
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


@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or password')
            return redirect(url_for('login'))
        login_user(user, remember=form.remember_me.data)
        next_page = request.args.get('next')
        if not next_page or url_parse(next_page).netloc != '':
            next_page = url_for('home')
        return redirect(next_page)
    return render_template('login.html', title='Sign In', form=form)

@app.route('/logout')
def logout():
    logout_user()
    # return redirect(url_for('index'))
    return redirect(url_for('login'))

@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(username=form.username.data, email=form.email.data)
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        flash('Congratulations, you are now a registered user!')
        return redirect(url_for('login'))
    return render_template('register.html', title='Register', form=form)

@app.route("/result", methods=['GET', 'POST'])
def quiz():
    if current_user.is_authenticated:
        # score = Score(user_id=user_id, onlineGamesWon = wins, onlineGamesPlayed=count, onlineAverageGuesses=count)
        current_user.score.onlineGamesWon = wins
        # db.session.add(score)
        db.session.commit()
    # return render_template('result.html', onlineGamesWon = count)
    

