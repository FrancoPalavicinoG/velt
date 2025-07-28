from flask import Flask, Blueprint                    
from .config import Config                       
from .extensions import jwt, cors, limiter       
from app.db import bp_db                         # blueprint técnico: cierra conexión MySQL

def create_app() -> Flask:
    app = Flask(__name__)                       

    # Carga la configuración (DB_HOST, JWT_SECRET_KEY, etc.) en app.config
    app.config.from_object(Config)              

    jwt.init_app(app)                           # manejo de tokens JWT
    cors.init_app(app)                          # cabeceras Access-Control-Allow
    limiter.init_app(app)                       # rate-limiting por IP / por endpoint

    # Añade el teardown que cierra g.db al final de cada request.
    app.register_blueprint(bp_db)    

    api_bp = Blueprint("api", __name__, url_prefix="/api/v1")
           

    # 5) --------------- BLUEPRINTS DE RUTAS ---------------------
    from app.routes.auth import bp as auth_bp    
    from app.routes.devices import bp as devices_bp
    from app.routes.sessions import bp as sessions_bp
    from app.routes.telemetries import bp as telemetries_bp
    from app.routes.crashes import bp as crashes_bp
    # Rutas /auth/login, /auth/register, etc. vivirán bajo /api/v1/…
    api_bp.register_blueprint(auth_bp)
    api_bp.register_blueprint(devices_bp)
    api_bp.register_blueprint(sessions_bp)
    api_bp.register_blueprint(telemetries_bp)
    api_bp.register_blueprint(crashes_bp)

    app.register_blueprint(api_bp)

    # 6) --------------- HEALTHCHECK ----------------------------------------
    # Endpoint sencillo para probes de liveness/ready.
    @app.get("/health")
    def health():
        return {"status": "ok"}, 200         

    return app