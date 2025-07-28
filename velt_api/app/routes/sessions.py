from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services import session_service
from datetime import datetime, timezone

bp = Blueprint("session", __name__)

@bp.post("/sessions")
@jwt_required()
def create_session():
    uid = get_jwt_identity()
    session = session_service.create_session(
        user_id=uid
    )
    return session.__dict__, 201

@bp.get("/sessions")
@jwt_required()
def list_sessions():
    uid = get_jwt_identity()
    sessions = session_service.list_session(uid)
    return [session.__dict__ for session in sessions], 200

@bp.get("/sessions/<int:session_id>")
@jwt_required()
def get_session(session_id):
    uid = get_jwt_identity()
    try:
        session = session_service.get_session(uid, session_id)
        return session.__dict__, 200
    except session_service.SessionNotFound:
        return {"error": "session not found"}, 404
    except session_service.OwnershipError:
        return {"error": "forbidden"}, 403
    
@bp.patch("/sessions/<int:session_id>")
@jwt_required()
def stop_session(session_id):
    uid = get_jwt_identity()
    now = datetime.now(timezone.utc)
    try:
        session = session_service.stop_session(
            user_id=uid,
            session_id=session_id,
            end_time=now
        )
        return session.__dict__, 200
    except session_service.SessionNotFound:
        return {"error": "session not found"}, 404
    except session_service.OwnershipError:
        return {"error": "forbidden"}, 403
    
@bp.delete("/sessions/<int:session_id>")
@jwt_required()
def delete_session(session_id):
    uid = get_jwt_identity()
    try:
        delete = session_service.delete_session(uid, session_id)
        if delete:
            return "", 204
        return {"error": "device not found"}, 404
    except session_service.SessionNotFound:
        return {"error": "device not found"}, 404
    except session_service.OwnershipError:
        return {"error": "forbidden"}, 403
