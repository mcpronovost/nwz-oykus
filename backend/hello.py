from flask import Flask
from datetime import datetime
from sqlalchemy import text
from config import config
from database import init_db

app = Flask(__name__)

# Configure the app
app.config.from_object(config["production"])

# Initialize database
init_db(app)


@app.route("/api/")
def hello_world():
    return "<p>Hello, World! How are you sweetie?</p>"


@app.route("/api/auth/profile")
def test_profile():
    return {"user": {"id": 2, "playerName": "John Johnson", "worldsStaff": []}}


@app.route("/api/health")
def health_check():
    """Health check endpoint"""
    try:
        # Test database connection
        from database import db

        with app.app_context():
            db.session.execute(text("SELECT 1"))

        # Check available memory
        import psutil

        memory = psutil.virtual_memory()

        return {
            "status": "healthy",
            "database": "connected",
            "memory_usage": f"{memory.percent}%",
            "available_memory": f"{memory.available / 1024 / 1024:.1f}MB",
            "timestamp": datetime.utcnow().isoformat(),
        }, 200
    except Exception as e:
        return {
            "status": "unhealthy",
            "error": str(e),
            "timestamp": datetime.utcnow().isoformat(),
        }, 500
