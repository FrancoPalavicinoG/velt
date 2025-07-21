from app.db import get_cursor
from app.core import User

_FIND_BY_EMAIL = "SELECT * FROM users WHERE email=%s"
_INSERT = """
            INSERT INTO users (email, password_hash, username, locale, units)
            VALUES (%s, %s, %s, %s, %s)
          """

def find_by_email(email: str) -> User | None:
    with get_cursor(dict_results=True) as cur:
        cur.execute(_FIND_BY_EMAIL, (email,))
        row = cur.fetchone()
    if row:
        return User(**row)
    return None


def insert(user: User) -> User:
    with get_cursor(dict_results=True) as cur:
        cur.execute(_INSERT, (
            user.email, user.password_hash, 
            user.username, user.locale, user.units 
        ))
        user.id = cur.lastrowid
    return user 