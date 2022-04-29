import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    # change this later!!
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    # for database configurations
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
