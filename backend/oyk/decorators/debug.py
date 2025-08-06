"""
Debug-only decorators for development and debugging purposes.
"""

from functools import wraps
from flask import current_app, abort


def require_debug(f):
    """
    Decorator to make routes available only in debug mode.

    Usage:
        @app.route('/debug-endpoint')
        @require_debug
        def debug_function():
            return "This is only available in debug mode"
    """

    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not current_app.config.get("DEBUG", False):
            abort(404)
        return f(*args, **kwargs)

    return decorated_function


def require_dev(f):
    """
    Decorator to make routes available only in development environment.

    Usage:
        @app.route('/dev-endpoint')
        @require_dev
        def dev_function():
            return "This is only available in development"
    """

    @wraps(f)
    def decorated_function(*args, **kwargs):
        if current_app.config.get("FLASK_ENV") != "development":
            abort(404)
        return f(*args, **kwargs)

    return decorated_function
