import jwt
from functools import wraps
from flask import request, jsonify, g, current_app

from oyk.models.user import User


def require_auth(f):
    """
    Decorator to require authentication for a route.

    This decorator:
    1. Extracts the JWT token from the Authorization header
    2. Validates the token
    3. Fetches the user from the database
    4. Ensures the user is active
    5. Attaches the user to Flask's g object for use in the route

    Usage:
        @app.route('/protected')
        @require_auth
        def protected_route():
            # Access current user via g.current_user
            return jsonify({"message": f"Hello {g.current_user.playername}"})
    """

    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            # Get token from Authorization header
            auth_header = request.headers.get("Authorization")
            if not auth_header:
                return (
                    jsonify(
                        {
                            "success": False,
                            "message": "Authorization header is required",
                        }
                    ),
                    401,
                )

            # Check if header starts with "Bearer "
            if not auth_header.startswith("Bearer "):
                return (
                    jsonify(
                        {
                            "success": False,
                            "message": "Authorization header must start with 'Bearer '",
                        }
                    ),
                    401,
                )

            # Extract token
            token = auth_header.split(" ")[1]
            if not token:
                return (
                    jsonify(
                        {"success": False, "message": "Token is required"}
                    ),
                    401,
                )

            # Verify JWT token
            secret_key = current_app.config["JWT_SECRET_KEY"]
            payload = jwt.decode(token, secret_key, algorithms=["HS256"])

            # Get user_id from payload
            user_id = payload.get("user_id")
            if not user_id:
                return (
                    jsonify(
                        {"success": False, "message": "Invalid token payload"}
                    ),
                    401,
                )

            # Fetch user from database
            user = User.query.get(user_id)
            if not user:
                return (
                    jsonify({"success": False, "message": "User not found"}),
                    401,
                )

            # Check if user is active
            if not user.is_active:
                return (
                    jsonify(
                        {"success": False, "message": "Account is deactivated"}
                    ),
                    401,
                )

            g.current_user = user

            return f(*args, **kwargs)

        except jwt.ExpiredSignatureError:
            return (
                jsonify({"success": False, "message": "Token has expired"}),
                401,
            )
        except jwt.InvalidTokenError:
            return jsonify({"success": False, "message": "Invalid token"}), 401
        except Exception as e:
            print(f"Authentication error: {e}")
            return (
                jsonify(
                    {"success": False, "message": "Authentication failed"}
                ),
                401,
            )

    return decorated_function


def optional_auth(f):
    """
    Decorator for optional authentication.

    This decorator will authenticate the user if a valid token is provided,
    but won't fail if no token or invalid token is provided.
    The user will be None in g.current_user if not authenticated.

    Usage:
        @app.route('/optional-auth')
        @optional_auth
        def optional_route():
            if g.current_user:
                return jsonify({"message": f"Hello {g.current_user.playername}"})
            else:
                return jsonify({"message": "Hello anonymous user"})
    """

    @wraps(f)
    def decorated_function(*args, **kwargs):
        g.current_user = None

        try:
            auth_header = request.headers.get("Authorization")
            if not auth_header or not auth_header.startswith("Bearer "):
                return f(*args, **kwargs)

            token = auth_header.split(" ")[1]
            if not token:
                return f(*args, **kwargs)

            secret_key = current_app.config["JWT_SECRET_KEY"]
            payload = jwt.decode(token, secret_key, algorithms=["HS256"])
            user_id = payload.get("user_id")

            if user_id:
                user = User.query.get(user_id)
                if user and user.is_active:
                    g.current_user = user
            return f(*args, **kwargs)

        except (jwt.ExpiredSignatureError, jwt.InvalidTokenError, Exception):
            return f(*args, **kwargs)

    return decorated_function
