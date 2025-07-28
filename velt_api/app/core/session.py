from dataclasses import dataclass
from datetime import datetime

@dataclass
class Session:
    id: int | None
    user_id: int 
    start_time: datetime
    end_time: datetime | None = None
    created_at: datetime | None = None
