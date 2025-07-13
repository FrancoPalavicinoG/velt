from dataclasses import dataclass
from datetime import datetime
from enum import Enum

class CrashSeverity(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

class CrashConfirmation(str, Enum):
    AUTO = "auto"
    USER = "user"
    FALSE_POSITIVE = "false_positive"


@dataclass
class Crash:
    id: int | None
    device_id: int 
    session_id: int | None 
    ts: datetime
    severity: CrashSeverity = CrashSeverity.HIGH
    latitude: float | None
    longitude: float | None
    confirmed: CrashConfirmation = CrashConfirmation.AUTO


