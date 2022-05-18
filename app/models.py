from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
# from app import login

# define a champion class that inherits from db.Model
class Champion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True, unique=True)
    role = db.Column(db.String(64))
    year = db.Column(db.Integer)
    skins = db.Column(db.Integer)

    # for debugging
    def __repr__(self):
        return '<Champion {}>'.format(self.name)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))

    def __repr__(self):
        return '<User {}>'.format(self.username)

#     def set_password(self, password):
#         self.password_hash = generate_password_hash(password)

#     def check_password(self, password):
#         return check_password_hash(self.password_hash, password)

# class User(UserMixin, db.Model):

#     @login.user_loader
#     def load_user(id):
#         return User.query.get(int(id))

# Still need to write class linking answers to users 
