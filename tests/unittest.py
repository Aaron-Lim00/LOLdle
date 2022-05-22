import unittest, os
from app import app, db
from app.models import User

class UserModelCase(unittest.TestCase):

    def setUp(self):
            basedir = os.path.abspath(os.path.dirname(__file__))
            app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'test.db')
            self.app = app.test_client()
            db.create_all()
            user1 = User(id=0000000, username='user1', email='user1@mail.com' )
            user2 = User(id=9999999, username='user2', email='user2@mail.com' )
            db.session.add(user1)
            db.session.add(user2)
            db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_password_hash(self):
        temp = User.query.get('0000000')
        temp.set_password('qwerty')
        self.assertFalse(temp.check_password('abdef'))
        self.assertTrue(temp.check_password('qwerty'))

if __name__ == '__main__':
    unittest.main()
