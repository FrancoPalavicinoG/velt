from dataclasses import dataclass
from enum import Enum

class DeviceStatus(str, Enum):
    ONBOARDING = "onboarding"
    ACTIVE     = "active"
    OFFLINE    = "offline"

@dataclass
class Device:
    id: int | None
    user_id: int
    hardware_id: str 
    alias: str | None
    version: str | None
    status: DeviceStatus = DeviceStatus.ONBOARDING
    battery_level: int | None = None
