from app.models import Champion


def test_new_champion():
    """ 
    Given a champion model
    When a new champion is inserted
    Check if it has been added into list correctly without breaking the db
    """
    champ = Champion('9999', 'champname', 'champrole', '2222', '100')
    assert champ.id == '9999'
    assert champ.name == 'champname'
    assert champ.role == 'champrole'
    assert champ.year == '2222'
    assert champ.skins == '100'

test_new_champion()