from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services import telemetry_service

bp = Blueprint("telemetries", __name__)

@bp.post("/telemetries")
@jwt_required()
def ingest_telemetry():
    payload = request.get_json()
    insert = telemetry_service.ingest_bulk(payload)
    return {"inserted": insert}, 201