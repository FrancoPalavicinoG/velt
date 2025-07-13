from dataclasses import dataclass
from datetime import datetime 

@dataclass
class Telemetry:
    id: int | None
    device_id: int
    session_id: int | None
    ts: datetime
    ax: float | None
    ay: float | None
    az: float | None
    gx: float | None
    gy: float | None
    gz: float | None


