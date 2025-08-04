import pymysql
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

# Configure PyMySQL to handle MySQL properly
pymysql.install_as_MySQLdb()

db = SQLAlchemy()
migrate = Migrate()
