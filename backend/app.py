import os
from hello import app

# Configure static folder for the built frontend
frontend_dist_path = os.path.join(os.path.dirname(__file__), "frontend", "dist")
if os.path.exists(frontend_dist_path):
    app.static_folder = frontend_dist_path
    app.static_url_path = ""


# Serve the frontend for all non-API routes
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_frontend(path):
    # Don't serve frontend for API routes
    if path.startswith("api/"):
        return app.send_static_file("index.html")

    # Try to serve the requested file
    try:
        return app.send_static_file(path)
    except Exception:
        # If file doesn't exist, serve index.html (for SPA routing)
        return app.send_static_file("index.html")
