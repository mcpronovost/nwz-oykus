import sys
import os
from app import app as application

# Add the project directory to Python path
path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if path not in sys.path:
    sys.path.append(path)

if __name__ == "__main__":
    application.run()
