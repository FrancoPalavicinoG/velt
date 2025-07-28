from flask import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services import device_service

bp = Blueprint("devices", __name__)

@bp.post("/devices")
@jwt_required()
def create_device():
    uid = get_jwt_identity()
    data = request.get_json()
    device = device_service.create_device(
        user_id=uid,
        hardware_id=data["hardware_id"],
        alias=data["alias"]
    )
    return device.__dict__, 201

@bp.get("/devices")
@jwt_required()
def list_devices():
    uid = get_jwt_identity()
    devices = device_service.list_devices(uid)
    return [device.__dict__ for device in devices], 200

@bp.get("/devices/<int:device_id>")
@jwt_required()
def get_device(device_id):
    uid = get_jwt_identity()
    try:
        device = device_service.get_device(uid, device_id)
        return device.__dict__, 200
    except device_service.DeviceNotFound:
        return {"error": "device not found"}, 404
    except device_service.OwnershipError:
        return {"error": "forbidden"}, 403

@bp.patch("/devices/<int:device_id>")
@jwt_required()
def update_device(device_id):
    uid = get_jwt_identity()
    data = request.get_json()
    try:
        device = device_service.update_device(
            user_id=uid,
            device_id=device_id,
            alias=data["alias"],
            status=data["status"]
        )
        return device.__dict__, 200
    except device_service.DeviceNotFound:
        return {"error": "device not found"}, 404
    except device_service.OwnershipError:
        return {"error": "forbidden"}, 403

@bp.delete("/devices/<int:device_id>")
@jwt_required()
def delete_device(device_id):
    uid = get_jwt_identity()
    try:
        delete = device_service.delete_device(uid, device_id)
        if delete:
            return "", 204
        return {"error": "device not found"}, 404
    except device_service.DeviceNotFound:
        return {"error": "device not found"}, 404
    except device_service.OwnershipError:
        return {"error": "forbidden"}, 403
