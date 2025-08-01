from dataclasses import dataclass
from datetime import datetime

@dataclass
class User:
    id: int | None
    email: str
    password_hash: str
    username: str | None = None
    locale: str = "en" 
    units: str = "metric"
    created_at: datetime | None = None
    last_login_at: datetime | None = None