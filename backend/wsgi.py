import sys
import os

# Add the project directory to Python path
path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if path not in sys.path:
    sys.path.append(path)

# Set environment variables
os.environ["DATABASE_URL"] = (
    "mysql+pymysql://mcpronovost:yourpassword@mcpronovost.mysql.pythonanywhere-services.com/mcpronovost$oykus"
)
os.environ["SECRET_KEY"] = "your-secret-key"
os.environ["FLASK_ENV"] = "production"

from app import app as application

if __name__ == "__main__":
    application.run()
