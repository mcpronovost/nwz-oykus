from flask import jsonify, request

from oyk.decorators import require_auth, require_dev
from oyk.extensions import db
from oyk.routes import world_bp
from oyk.models.user import User
from oyk.models.world import World, WorldTheme
from oyk.models.task import TaskStatus


@world_bp.route("/<world_slug>/tasks", methods=["GET"])
@require_auth
def world_tasks_get(world_slug):
    """Get all tasks for a world."""
    world = World.query.filter_by(slug=world_slug).first()
    if not world:
        return jsonify({"success": False, "message": "World not found"}), 404
    status = world.task_status.order_by(TaskStatus.sort_order.asc()).all()
    return (
        jsonify(
            {
                "success": True,
                "tasks": [status.to_dict() for status in status],
                "status": [
                    {
                        "label": status.name,
                        "value": status.id,
                    }
                    for status in status
                ],
            }
        ),
        200,
    )


@world_bp.route(
    "/<world_slug>/task-status/<status_id>/edit", methods=["PATCH"]
)
@require_auth
def world_task_status_edit(world_slug, status_id):
    """Edit a task status for a world."""
    world = World.query.filter_by(slug=world_slug).first()
    if not world:
        return jsonify({"success": False, "message": "World not found"}), 404
    status = TaskStatus.query.filter_by(
        id=status_id, world_id=world.id
    ).first()
    if not status:
        return (
            jsonify({"success": False, "message": "Task status not found"}),
            404,
        )
    data = request.get_json()
    if not data:
        return jsonify({"success": False, "message": "No data provided"}), 400
    status.name = data["name"]
    status.colour = data["colour"]
    status.sort_order = data["sort_order"]
    status.validate()
    status.save()
    return (
        jsonify(
            {
                "success": True,
                "message": "Task status updated",
                "status": status.to_dict(),
            }
        ),
        200,
    )


@world_bp.route("/<world_slug>/task-status/create", methods=["POST"])
@require_auth
def world_task_status_create(world_slug):
    """Create a new task status for a world."""
    world = World.query.filter_by(slug=world_slug).first()
    if not world:
        return jsonify({"success": False, "message": "World not found"}), 404
    data = request.get_json()
    if not data:
        return jsonify({"success": False, "message": "No data provided"}), 400
    status = TaskStatus(
        world_id=world.id,
        name=data["name"],
        colour=data["colour"],
        sort_order=data["sort_order"],
    )
    status.validate()
    status.save()
    return (
        jsonify(
            {
                "success": True,
                "message": "Task status created",
                "status": status.to_dict(),
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


@world_bp.route("/dev-update", methods=["GET"])
@require_dev
def worlds_dev_update():
    """Update a test world for development purposes."""
    try:
        world = World.query.first()
        worldTheme = WorldTheme.query.filter_by(world_id=world.id).first()
        worldTheme.c_primary = "#227990"
        worldTheme.c_primary_fg = "#ffffff"
        worldTheme.is_active = True
        worldTheme.validate()
        worldTheme.save()
        world.validate()
        world.save()
        return (
            jsonify({"success": True, "message": "Test world updated"}),
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
