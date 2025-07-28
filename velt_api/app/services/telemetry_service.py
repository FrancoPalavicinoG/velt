from app.repositories import telemetry_repo
from app.core import Telemetry
from datetime import datetime, timezone

def _parse_iso(ts_str: str) -> datetime:
    """Convierte '2025-07-28T17:05:03.123Z' → datetime aware (UTC)."""
    return datetime.fromisoformat(ts_str.replace("Z", "+00:00")).astimezone(timezone.utc)

def ingest_bulk(raw_samples: list[dict]) -> int:
    samples: list[Telemetry] = []
    for item in raw_samples:
        samples.append(
            Telemetry(
                id = None,
                device_id = item["device_id"],
                session_id = item.get("session_id"),
                ts = _parse_iso(item["ts"]),
                ax = item.get("ax"),
                ay = item.get("ay"),
                az = item.get("az"),
                gx = item.get("gx"),
                gy = item.get("gy"),
                gz = item.get("gz")
            )
        )

    return telemetry_repo.bulk_insert(samples)
    