import re

from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token
from app.repositories import user_repo
from app.core import User
from app.services import WeakPassword, DuplicateEmail, InvalidCredentials

def register(email: str, password: str, username: str) -> dict:
    if not _valid_password(password):
        raise WeakPassword
    if user_repo.find_by_email(email): 
        raise DuplicateEmail
    user = User(
        id=None,
        email=email,
        password_hash=generate_password_hash(password),
        username=username,
        locale="en",
        units="metric"
    )
    user_repo.insert(user)
    return _token_pair(user.id)

def login(email: str, password: str) -> dict:
    user = user_repo.find_by_email(email)
    if not user or not check_password_hash(user.password_hash, password):
        raise InvalidCredentials
    return _token_pair(user.id)

def _token_pair(uid: int) -> dict:
    uid_str = str(uid)       
    return {
        "access_token":  create_access_token(identity=uid_str),
        "refresh_token": create_refresh_token(identity=uid_str),
    }

def _valid_password(password: str) -> bool:
    return bool(
        len(password) >= 8
        and re.search(r"[A-Za-z]", password)
        and re.search(r"\d", password)
        and re.search(r"[!\"#$%&'()*+,\-./:;<=>?@$begin:math:display$$end:math:display$\\^_`{|}~]", password)
    )

