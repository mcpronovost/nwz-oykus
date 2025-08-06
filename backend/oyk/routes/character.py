from flask import jsonify

from oyk.decorators import require_dev
from oyk.extensions import db
from oyk.models.user import User
from oyk.models.character import Character
from oyk.routes import character_bp


@character_bp.route("/dev-create", methods=["GET"])
@require_dev
def characters_dev_create():
    """Create a test character for development purposes."""
    try:
        user = User.query.first()
        character = Character(
            user_id=user.id,
            name="Pachu'a Wapi Qatlaalawsiq",
            abbr="PWQ",
            is_abbr_auto=True,
            resistance_physical=2,
            resistance_mental=3,
            resistance_spiritual=5,
        )
        character.validate()
        character.save()
        return (
            jsonify(
                {
                    "success": True,
                    "message": "Test character created",
                    "character": character.to_dict(),
                    "user": user.to_dict(),
                }
            ),
            200,
        )
    except Exception as e:
        print(e)
        return (
            jsonify({"success": False, "message": f"{e}"}),
            500,
        )


@character_bp.route("/dev-clean", methods=["GET"])
@require_dev
def characters_clean():
    """Clean up the characters database for development purposes."""
    try:
        Character.query.delete()
        db.session.commit()
        return (
            jsonify({"success": True, "message": "Characters database cleaned"}),
            200,
        )
    except Exception:
        return (
            jsonify({"success": False, "message": "Internal server error"}),
            500,
        )
