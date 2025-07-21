from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services import auth_service

bp = Blueprint("auth", __name__)

@bp.post("/auth/register")
def register():
    data = request.get_json() or {}
    try:
        tokens = auth_service.register(
            email=data["email"],
            password=data["password"],
            username=data["username"]
        )
        return tokens, 201 # recurso creado
    except KeyError:
        return {"error": "email, password and username are required"}, 400 # datos faltantes, bad request
    except auth_service.DuplicateEmail:
        return {"error": "email already registered"}, 409 # conflictos
    except auth_service.WeakPassword:
        return {"error": "password too weak"}, 409


@bp.post("/auth/login")
def login():
    data = request.get_json() or {}
    try:
        return auth_service.login(
            email=data["email"],
            password=data["password"]
        ), 200 # ok
    except (KeyError, auth_service.InvalidCredentials):
        return {"error": "invalid credentials"}, 401 # Unauthorized

@bp.post("/auth/refresh")
@jwt_required(refresh=True)
def refresh():
    uid = get_jwt_identity() 
    # Devuelve un nuevo *access token*; NO genera otro refresh.  
    return {"access_token": auth_service._token_pair(uid)["access_token"]}, 200