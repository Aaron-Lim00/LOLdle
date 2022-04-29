# Flask application instance
from flask import Flask, url_for
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

from app import routes
