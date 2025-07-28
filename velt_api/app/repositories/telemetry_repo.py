from app.db import get_cursor
from app.core import Telemetry

_INSERT = """
        INSERT INTO telemetries (device_id, session_id, ts,
                       ax, ay, az, gx, gy, gz)
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)
"""

def bulk_insert(samples: list[Telemetry]) -> int:
    rows: list[tuple] = []

    for s in samples:
        rows.append((
            s.device_id,            
            s.session_id,           
            s.ts,                   
            s.ax, s.ay, s.az,       
            s.gx, s.gy, s.gz  
        ))

    with get_cursor(dict_results=True) as cur:
        cur.executemany(_INSERT, rows)

    return len(rows)