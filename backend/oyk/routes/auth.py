import os
import jwt
import bcrypt
from datetime import datetime, timedelta
from flask import request, jsonify
from werkzeug.exceptions import BadRequest, Unauthorized

from oyk.models.user import User
from oyk.routes import auth_bp


def generate_jwt_token(user_id):
    """Generate a JWT token for the user."""
    payload = {
        "user_id": user_id,
        "exp": datetime.utcnow() + timedelta(hours=24),
        "iat": datetime.utcnow(),
    }

    secret_key = os.environ.get("JWT_SECRET_KEY") or "jwt-secret-key"
    token = jwt.encode(payload, secret_key, algorithm="HS256")
    return token


def verify_jwt_token(token):
    """Verify and decode a JWT token."""
    try:
        secret_key = os.environ.get("JWT_SECRET_KEY") or "jwt-secret-key"
        payload = jwt.decode(token, secret_key, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        raise Unauthorized("Token has expired")
    except jwt.InvalidTokenError:
        raise Unauthorized("Invalid token")


@auth_bp.route("/login", methods=["POST"])
def login():
    """Login route that validates credentials and returns a JWT token."""
    try:
        data = request.get_json()

        if not data:
            raise BadRequest("No data provided")

        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            raise BadRequest("Username and password are required")

        # Find user by username
        user = User.query.filter_by(username=username).first()

        if not user:
            raise Unauthorized("Invalid username or password")

        # Check if user is active
        if not user.is_active:
            raise Unauthorized("Account is deactivated")

        # Verify password
        if not bcrypt.checkpw(
            password.encode("utf-8"), user.password.encode("utf-8")
        ):
            raise Unauthorized("Invalid username or password")

        # Generate JWT token
        token = generate_jwt_token(user.id)

        return (
            jsonify(
                {
                    "success": True,
                    "message": "Login successful",
                    "token": token,
                    "user": user.to_dict(),
                }
            ),
            200,
        )

    except BadRequest as e:
        return jsonify({"success": False, "message": str(e)}), 400
    except Unauthorized as e:
        return jsonify({"success": False, "message": str(e)}), 401
    except Exception as e:
        print(e)
        return (
            jsonify({"success": False, "message": "Internal server error"}),
            500,
        )


@auth_bp.route("/register", methods=["POST"])
def register():
    """Register a new user with hashed password."""
    try:
        data = request.get_json()

        if not data:
            raise BadRequest("No data provided")

        email = data.get("email")
        username = data.get("username")
        password = data.get("password")
        playername = data.get("playername")

        if not all([email, username, password, playername]):
            raise BadRequest(
                "Email, username, password, and playername are required"
            )

        # Check if user already exists
        existing_user = User.query.filter(
            (User.email == email)
            | (User.username == username)
            | (User.playername == playername)
        ).first()

        if existing_user:
            raise BadRequest(
                "User with this email, username, or playername already exists"
            )

        # Hash password
        hashed_password = bcrypt.hashpw(
            password.encode("utf-8"), bcrypt.gensalt()
        )

        # Create new user
        user = User(
            email=email,
            username=username,
            password=hashed_password.decode("utf-8"),
            playername=playername,
            is_abbr_auto=True,
        )

        # Save user to database
        user.save()

        # Generate JWT token
        token = generate_jwt_token(user.id)

        return (
            jsonify(
                {
                    "success": True,
                    "message": "Registration successful",
                    "token": token,
                    "user": user.to_dict(),
                }
            ),
            201,
        )

    except BadRequest as e:
        return jsonify({"success": False, "message": str(e)}), 400
    except Exception as e:
        print(e)
        return (
            jsonify({"success": False, "message": "Internal server error"}),
            500,
        )


@auth_bp.route("/verify", methods=["POST"])
def verify_token():
    """Verify a JWT token and return user information."""
    try:
        data = request.get_json()

        if not data:
            raise BadRequest("No data provided")

        token = data.get("token")

        if not token:
            raise BadRequest("Token is required")

        # Verify token
        payload = verify_jwt_token(token)
        user_id = payload.get("user_id")

        # Get user from database
        user = User.query.get(user_id)

        if not user or not user.is_active:
            raise Unauthorized("Invalid or inactive user")

        return (
            jsonify(
                {
                    "success": True,
                    "message": "Token is valid",
                    "user": user.to_dict(),
                }
            ),
            200,
        )

    except BadRequest as e:
        return jsonify({"success": False, "message": str(e)}), 400
    except Unauthorized as e:
        return jsonify({"success": False, "message": str(e)}), 401
    except Exception as e:
        return (
            jsonify({"success": False, "message": "Internal server error"}),
            500,
        )
