# LOLdle
This project was developed and built for the UWA CITS3403 unit in semester 1 of 2022.

The web application, LoLdle is built with the Flask micro web framework for the backend along with Python for dependencies, sqlite databases and jQuery.
Basic HTML, CSS and JavaScript are also used for the frontend. It is designed to be responsive to most screen sizes. 

LoLdle is inspired by daily puzzle games such as Wordle and involves users guessing a daily 'champion' from the popular online game League of Legends. 

Each guess will return dynamic feedback with statistics relating to the champion's role, year of release, and skins available. 
The user has a total of 8 guesses and statistics are saved to local storage which can be shared to the user's social network 
for bragging rights. 

The game is intentionally built to be challenging, aiming to be easy to pickup and play but hard to master. 
As the answer changes each day, users are encouraged to return daily to flex their knowledge above their friends. 

## Getting Started
Note: This application was developed and tested primarily on contemporary Macintosh systems. 
Although it will work on other platforms, instructions provided are targeted at Mac users.

Follow these steps to have a version of the game up and running on a localmachine. 
Navigate to the directory in which you have cloned the repository and then continue. 

### Installation
To install Python3 on mac:

```
$ brew install python3
```

We recommend setting up a virtual environment to install dependencies:
```
$ python3 -m venv flask
$ source flask/bin/activate
$ pip install -r requirements_unix.txt
```

### Deployment
As the flask environments have been set, enter the command to begin:
```
$ flask run
```
Your terminal will give you a local address to navigate to for access.

### Dependencies
alembic==1.7.7
click==8.1.2
Flask==2.1.1
Flask-Migrate==3.1.0
Flask-SQLAlchemy==2.5.1
Flask-WTF==1.0.1
greenlet==1.1.2
importlib-metadata==4.11.3
itsdangerous==2.1.2
Jinja2==3.1.1
Mako==1.2.0
MarkupSafe==2.1.1
python-dotenv==0.20.0
SQLAlchemy==1.4.36
Werkzeug==2.1.1
WTForms==3.0.1
zipp==3.8.0
