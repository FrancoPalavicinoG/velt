# ---- Autenticación JSON Web Tokens ------------------------------------------
from flask_jwt_extended import JWTManager
#  • JWTManager administra la creación y verificación de access / refresh
#    tokens.  La instancia se crea aquí y se enlaza después con
#    jwt.init_app(app) dentro de create_app().

# ---- CORS (Cross-Origin Resource Sharing) -----------------------------------
from flask_cors import CORS
#  • CORS añade las cabeceras “Access-Control-Allow-*” para que
#    peticiones JS (tu app React Native o un frontend web) puedan llamar
#    a la API aunque estén en un dominio/puerto distinto.

# ---- Rate limiting (protección contra abuso) --------------------------------
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
#  • Limiter limita el nº de requests por IP o por usuario.
#  • get_remote_address infiere la IP del cliente (o la cabecera X-Forwarded-For).

# ── Instanciar las extensiones (aún sin enlazarlas a la app) ──────────────────
jwt     = JWTManager()                      # instancia “vacía”
cors    = CORS()                            # CORS con configuración por defecto
limiter = Limiter(key_func=get_remote_address)
#          Usa la IP remota como clave; luego podrás definir reglas:
#          @limiter.limit("120 per minute") en cada ruta o globalmente