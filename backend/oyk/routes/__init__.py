from flask import Blueprint

# Create blueprints
health_bp = Blueprint("health", __name__, url_prefix="/api")

# Import route modules
from . import health
