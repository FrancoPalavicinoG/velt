from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services import crash_service

bp = Blueprint("crashes", __name__)

@bp.post("/crashes")
@jwt_required
def list_crashes():
    uid = get_jwt_identity
    crashes = crash_service.list_crashes(uid)
    return [crash.__dict__ for crash in crashes], 200

