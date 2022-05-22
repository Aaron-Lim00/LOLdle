from app import db

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

