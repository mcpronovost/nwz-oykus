from datetime import datetime
from sqlalchemy import text

from oyk.decorators import require_dev
from oyk.routes import health_bp


@health_bp.route("/")
@require_dev
def health_check():
    """Health check endpoint - only available in debug mode"""
    try:
        # 1. Test database connection
        from database import db
        from app import app

        with app.app_context():
            db.session.execute(text("SELECT 1"))

        # 2. Check available memory (RAM)
        import psutil

        memory = psutil.virtual_memory()

        return {
            "status": "healthy",
            "database": "connected",
            "memory_usage": f"{memory.percent}%",
            "available_memory": f"{memory.available / 1024 / 1024:.1f}MB",
            "timestamp": datetime.now().isoformat(),
        }, 200
    except Exception as e:
        return {
            "status": "unhealthy",
            "error": str(e),
            "timestamp": datetime.now().isoformat(),
        }, 500
