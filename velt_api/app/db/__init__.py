import contextlib
import mysql.connector
from flask import current_app, g, Blueprint

def _open_connection():
    """
    Crea una sola conexión MySQL y la devuelve.
    Se llama internamente desde get_db().
    """
    return mysql.connector.connect(
        host=current_app.config["DB_HOST"],
        user=current_app.config["DB_USER"],
        password=current_app.config["DB_PASS"],
        database=current_app.config["DB_NAME"],
        autocommit=True,        
        charset="utf8mb4",
        use_unicode=True,
        pool_name="velt_pool",
        pool_size=5,
    )

def get_db():
    """
    Devuelve la conexión para esta petición Flask.
    Si no existe en `g`, la crea y la guarda en g.db.
    """
    if "db" not in g:
        g.db = _open_connection()
    return g.db

@contextlib.contextmanager
def get_cursor(dict_results: bool = False):
    """
    Uso:
        with get_cursor(True) as cur:
            cur.execute("SELECT ...")
            rows = cur.fetchall()
    - dict_results=True  → rows como dict  {'id': 1, 'email': ...}
    - False (por defecto) → rows como tupla (un poco más rápido)
    """
    cur = get_db().cursor(dictionary=dict_results)
    try:
        yield cur            
    finally:
        cur.close()

bp_db = Blueprint("db", __name__)

@bp_db.record_once
def _setup_teardown(state):
    """
    Este hook se ejecuta una sola vez al registrar el blueprint.
    Añade un `teardown_appcontext` que Flask invoca al final de
    cada request (éxito o excepción).
    """
    @state.app.teardown_appcontext
    def close_connection(exc):
        cnx = g.pop("db", None)
        if cnx is not None:
            cnx.close()