import os
from flask import Flask
from flask_cors import CORS

from config import config
from database import init_db

from oyk.routes import health_bp


def create_app(config_name="default"):
    app = Flask(__name__)

    # Configure the app
    app.config.from_object(config[config_name])

    # Configure CORS for development
    if app.config.get("FLASK_ENV") == "development":
        CORS(
            app,
            origins=[
                "http://localhost:5173",
                "http://127.0.0.1:5173",
                "http://localhost:3000",
            ],
            supports_credentials=True,
            allow_headers=["Content-Type", "Authorization"],
            methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        )

    # Initialize database
    init_db(app)

    # Register blueprints
    app.register_blueprint(health_bp)

    return app


app = create_app()

# Configure static folder for the built frontend
frontend_dist_path = os.path.join(
    os.path.dirname(__file__), "frontend", "dist"
)
if os.path.exists(frontend_dist_path):
    app.static_folder = frontend_dist_path
    app.static_url_path = ""


# Serve the frontend for all non-API routes
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_frontend(path):
    # Don't serve frontend for API routes
    if path.startswith("api/"):
        return app.send_static_file("index.html")

    # Try to serve the requested file
    try:
        return app.send_static_file(path)
    except Exception:
        # If file doesn't exist, serve index.html (for SPA routing)
        return app.send_static_file("index.html")
