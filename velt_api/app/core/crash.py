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
    latitude: float | None
    longitude: float | None
    severity: CrashSeverity = CrashSeverity.HIGH
    confirmed: CrashConfirmation = CrashConfirmation.AUTO


