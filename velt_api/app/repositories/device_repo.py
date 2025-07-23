from app.db import get_cursor
from app.core import Device

_INSERT = """
        INSERT INTO devices (user_id, hardware_id, alias, status)
        VALUES (%s, %s, %s, %s)
"""
_LIST = "SELECT * FROM devices WHERE user_id=%s"
_GET_BY_ID = "SELECT * FROM devices WHERE id=%s" 
_UPDATE = """
        UPDATE devices 
        SET alias=%s, status=%s
        WHERE id=%s
"""
_DELETE = "DELETE FROM devices WHERE id=%s"

def create(device: Device) -> Device:
    with get_cursor(dict_results=True) as cur:
        cur.execute(_INSERT, (
            device.user_id, device.hardware_id,
            device.alias, device.status
        ))
        device.id = cur.lastrowid
    return device 

def list(user_id: int) -> list[Device]:
    with get_cursor(dict_results=True) as cur:
        cur.execute(_LIST, (user_id,))
        rows = cur.fetchall()

        devices: list[Device] = [] 
        for row in rows:
            devices.append(Device(**row))
        return devices 

def get_by_id(id: int) -> Device | None:
    with get_cursor(dict_results=True) as cur:
        cur.execute(_GET_BY_ID, (id,))
        row = cur.fetchone()
    if row:
        return Device(**row)
    return None

def update(device: Device) -> bool:
    with get_cursor(dict_results=True) as cur:
        cur.execute(_UPDATE, (device.alias, device.status, device.id))
    return cur.rowcount > 0

def delete(device_id: int) -> bool:
    with get_cursor(dict_results=True) as cur:
        cur.execute(_DELETE, (device_id,))
    return cur.rowcount > 0
