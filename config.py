import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    # change this later!!
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'

    # for database configurations
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    SQLALCHEMY_BINDS = {
        'user': 'sqlite:///' + os.path.join(basedir, 'user.db')
    }

    # # may or may not be required
    # SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
    #     'sqlite:///' + os.path.join(basedir, 'login.db')
    # SQLALCHEMY_TRACK_MODIFICATIONS = False

class DbConfig(object):
    database = "database_name"
    user = "db_user"
    password = "password"
    host = "localhost"
    unix_socket = "/var/run/mysqld/mysqld.sock"
    SQLALCHEMY_DATABASE_URI = 'mysql://'+ user + ':' + password + '@' + host + '/' + database +'?unix_socket='+ unix_socket
    SQLALCHEMY_BINDS = {
        'user': 'mysql://user:pass@localhost/database2'
    }
        
        


