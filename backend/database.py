from oyk.extensions import db, migrate


def init_db(app):
    """Initialize database with MySQL-specific settings"""
    db.init_app(app)
    migrate.init_app(app, db)

    # Create tables if they don't exist
    with app.app_context():
        db.create_all()

    return db
