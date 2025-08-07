from flask import jsonify

from oyk.decorators import require_auth
from oyk.models.user import User
from oyk.routes import player_bp


@player_bp.route("/<player_slug>", methods=["GET"])
@require_auth
def player_get(player_slug):
    """Get a player's information."""
    player = User.query.filter_by(slug=player_slug).first()
    if not player:
        return jsonify({"success": False, "message": "Player not found"}), 404
    return jsonify({"success": True, "player": player.to_dict()}), 200
