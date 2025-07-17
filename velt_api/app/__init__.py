from flask import Flask                       
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

    # 5) --------------- BLUEPRINTS DE RUTAS ---------------------
    from app.routes.auth import bp as auth_bp    
    # Rutas /auth/login, /auth/register, etc. vivirán bajo /api/v1/…
    app.register_blueprint(auth_bp, url_prefix="/api/v1")

    # 6) --------------- HEALTHCHECK ----------------------------------------
    # Endpoint sencillo para probes de liveness/ready.
    @app.get("/health")
    def health():
        return {"status": "ok"}, 200         

    return app