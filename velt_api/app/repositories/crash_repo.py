from app.db import get_cursor
from app.core import Crash

_LIST_USER = """
            SELECT c.* FROM crashes c
            JOIN devices d on d.id = c.device_id
            WHERE d.user_id = %s
            ORDER BY c.ts DESC
"""

def list_by_user(user_id: int) -> list[Crash]:
    with get_cursor(dict_results=True) as cur:
        cur.execute(_LIST_USER, (user_id,))
        rows = cur.fetchall()

        crashes: list[Crash] = []
        for row in rows:
            crashes.append(Crash(**row))
        return crashes
    
    

