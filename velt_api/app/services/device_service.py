from app.repositories import device_repo
from app.core import Device, DeviceStatus
from app.services import DeviceNotFound, OwnershipError

def _require_owner(user_id: int, device_id: int) -> Device:
    device = device_repo.get_by_id(device_id)
    if not device:
        raise DeviceNotFound
    if int(device.user_id) != int(user_id):
        raise OwnershipError
    return device

def create_device(user_id: int, hardware_id: str, alias: str) -> Device:
    device = Device(
        id=None,
        user_id=user_id, 
        hardware_id=hardware_id,
        alias=alias,
        status=DeviceStatus.ONBOARDING
    )
    return device_repo.create(device)
 
def list_devices(user_id: int) -> list[Device]:
    return device_repo.list(user_id)

def get_device(user_id: int, device_id: int) -> Device:
    return _require_owner(user_id, device_id)

def update_device(user_id: int, device_id: int, alias: str, status: DeviceStatus) -> Device:
    device = _require_owner(user_id, device_id)
    device.alias = alias
    device.status = status
    device_repo.update(device)
    return device
    
def delete_device(user_id: int, device_id: int) -> bool:
    _require_owner(user_id, device_id)
    return device_repo.delete(device_id)
    