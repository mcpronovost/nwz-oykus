from flask import jsonify

from oyk.decorators import require_auth, require_dev
from oyk.extensions import db
from oyk.routes import world_bp
from oyk.models.user import User
from oyk.models.world import World, WorldTheme


@world_bp.route("/<world_slug>/tasks", methods=["GET"])
@require_auth
def world_tasks_get(world_slug):
    """Get all tasks for a world."""
    world = World.query.filter_by(slug=world_slug).first()
    if not world:
        return jsonify({"success": False, "message": "World not found"}), 404
    tasks = []
    return (
        jsonify(
            {
                "success": True,
                "tasks": [task.to_dict() for task in tasks],
                "status": [],
            }
        ),
        200,
    )


@world_bp.route("/dev-create", methods=["GET"])
@require_dev
def worlds_dev_create():
    """Create a test world for development purposes."""
    try:
        user = User.query.first()
        world = World(
            owner_id=user.id,
            name="Qalatlán",
            abbr="Q",
            is_abbr_auto=True,
            slug="qalatan",
            is_slug_auto=True,
        )
        world.validate()
        world.save()
        theme = WorldTheme(
            world_id=world.id,
            name="Default Qalatlán",
            c_primary="#3da5cb",
            c_primary_fg="#ffffff",
            is_active=True,
        )
        theme.validate()
        theme.save()
        return (
            jsonify(
                {
                    "success": True,
                    "message": "Test world created",
                    "world": world.to_dict(),
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


@world_bp.route("/dev-clean", methods=["GET"])
@require_dev
def worlds_clean():
    """Clean up the worlds database for development purposes."""
    try:
        WorldTheme.query.delete()
        World.query.delete()
        db.session.commit()
        return (
            jsonify({"success": True, "message": "Worlds database cleaned"}),
            200,
        )
    except Exception:
        return (
            jsonify({"success": False, "message": "Internal server error"}),
            500,
        )
