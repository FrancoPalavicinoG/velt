from app.db import get_cursor
from app.core import Session
from datetime import timezone

_INSERT = """
        INSERT INTO sessions (user_id, start_time)
        VALUES (%s, %s)
"""
_LIST = "SELECT * FROM sessions WHERE user_id=%s"
_GET_BY_ID = "SELECT * FROM sessions WHERE id=%s" 
_UPDATE = """
        UPDATE sessions 
        SET end_time=%s
        WHERE id=%s
"""
_DELETE = "DELETE FROM sessions WHERE id=%s"


def create(session: Session) -> Session:
    with get_cursor(dict_results=True) as cur:
        cur.execute(_INSERT, (session.user_id, session.start_time))
        session.id = cur.lastrowid
    return session

def list(user_id: int) -> list[Session]:
    with get_cursor(dict_results=True) as cur:
        cur.execute(_LIST, (user_id,))
        rows = cur.fetchall()

    sessions: list[Session] = []
    for row in rows:
        if row["start_time"].tzinfo is None:
            row["start_time"] = row["start_time"].replace(tzinfo=timezone.utc)

        if row["end_time"] is not None and row["end_time"].tzinfo is None:
            row["end_time"] = row["end_time"].replace(tzinfo=timezone.utc)

        sessions.append(Session(**row))  
    return sessions                     

def get_by_id(id: int) -> Session | None:
    with get_cursor(dict_results=True) as cur:
        cur.execute(_GET_BY_ID, (id,))
        row = cur.fetchone()
    if row:
        row["start_time"] = row["start_time"].replace(tzinfo=timezone.utc)
        if row["end_time"] is not None:
            row["end_time"] = row["end_time"].replace(tzinfo=timezone.utc)
        return Session(**row)
    return None 

def update(session: Session) -> bool:
    with get_cursor(dict_results=True) as cur:
        cur.execute(_UPDATE, (session.end_time, session.id))
    return cur.rowcount > 0

def delete(session_id: int) -> bool:
    with get_cursor(dict_results=True) as cur:
        cur.execute(_DELETE, (session_id,))
    return cur.rowcount > 0