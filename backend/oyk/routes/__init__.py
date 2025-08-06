from flask import Blueprint

# Create blueprints
auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")
character_bp = Blueprint("character", __name__, url_prefix="/api/character")
health_bp = Blueprint("health", __name__, url_prefix="/api/health")

# Import route modules
from . import auth
from . import character
from . import health
