import unittest, os
from app import app, db
from app.models import Champion

class ChampionModelCase(unittest.TestCase):

    def setUp(self):
        basedir = os.path.abspath(os.path.dirname(__file__))
        app.config['SQLALCHEMY_DATABASE_URI']=\
            'sqlite:///'+os.path.join(basedir,'test.db')
        # Creates virtual test env
        self.app = app.test_client()
        db.create_all()
        champ = Champion('9999', 'champname', 'champrole', '2222', '100')

    def tearDown(self):
        db.session.remove()
        db.drop_all()
    
    def test_inserting_champion(self):
        assert champ.id == '9999'
        assert champ.name == 'champname'
        assert champ.role == 'champrole'
        assert champ.year == '2222'
        assert champ.skins == '100'

    if __name__ == '__main__':
        unittest.main()
