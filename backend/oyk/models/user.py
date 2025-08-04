from datetime import datetime
from sqlalchemy import Column, String, Integer, Boolean, DateTime, Text
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.mysql import CHAR
import uuid
from . import db


class User(db.Model):
    __tablename__ = "users"

    # MySQL specific: Use CHAR(36) for UUID
    id = Column(CHAR(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String(255), unique=True, nullable=False, index=True)
    username = Column(String(120), unique=True, nullable=False, index=True)
    password = Column(String(255), nullable=False)

    # Player Identity
    player_name = Column(String(120), unique=True, nullable=False)
    abbr = Column(String(3), unique=True, nullable=False)

    # Limits (optimized for PythonAnywhere free plan constraints)
    limit_worlds = Column(Integer, default=2)
    total_worlds = Column(Integer, default=0)
    limit_world_themes = Column(Integer, default=2)
    total_world_themes = Column(Integer, default=0)

    # Status
    is_active = Column(Boolean, default=True, index=True)
    is_admin = Column(Boolean, default=False)

    # Important Dates
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        """Convert to dictionary for JSON serialization"""
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "player_name": self.player_name,
            "abbr": self.abbr,
            "is_active": self.is_active,
            "is_admin": self.is_admin,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
