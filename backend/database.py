from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import pymysql

# Configure PyMySQL to handle MySQL properly
pymysql.install_as_MySQLdb()

db = SQLAlchemy()
migrate = Migrate()


def init_db(app):
    """Initialize database with MySQL-specific settings"""
    db.init_app(app)
    migrate.init_app(app, db)

    # Create tables if they don't exist
    with app.app_context():
        db.create_all()

    return db
