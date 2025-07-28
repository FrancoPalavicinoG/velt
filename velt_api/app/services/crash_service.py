from app.repositories import crash_repo
from app.core import Crash

def list_crashes(user_id: int) -> list[Crash]:
    return crash_repo.list_by_user(user_id)
