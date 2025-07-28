from app.repositories import session_repo
from app.core import Session
from app.services import SessionNotFound, OwnershipError, SessionAlreadyClosed, InvalidTimeRange
from datetime import datetime, timezone

def _require_owner(user_id: int, session_id: int) -> Session:
    session = session_repo.get_by_id(session_id)
    if not session:
        raise SessionNotFound
    if int(session.user_id) != int(user_id):
        raise OwnershipError
    return session

def create_session(user_id: int) -> Session: 
    now = datetime.now(timezone.utc)
    session = Session(
        id=None,
        user_id=user_id,
        start_time=now
    )
    return session_repo.create(session)

def list_session(user_id: int) -> list[Session]:
    return session_repo.list(user_id)

def get_session(user_id: int, session_id: int) -> Session:
    return _require_owner(user_id, session_id)

def stop_session(user_id: int, session_id: int, end_time: datetime) -> Session:
    session = _require_owner(user_id, session_id)

    if session.end_time is not None:
        raise SessionAlreadyClosed
    
    if end_time <= session.start_time: 
        raise InvalidTimeRange
    
    session.end_time = end_time
    session_repo.update(session)
    return session

def delete_session(user_id: int, session_id: int) -> bool:
    _require_owner(user_id, session_id)
    return session_repo.delete(session_id)