import uuid
from datetime import datetime

from oyk.extensions import db
from oyk.utils import get_abbr, get_slug


class User(db.Model):
    __tablename__ = "oyk_users"

    # Authentication
    id = db.Column(
        db.String(36),
        primary_key=True,
        default=lambda: str(uuid.uuid4()),
        unique=True,
        nullable=False,
        index=True,
    )
    email = db.Column(
        db.String(255),
        unique=True,
        nullable=False,
    )
    username = db.Column(
        db.String(120),
        unique=True,
        nullable=False,
    )
    password = db.Column(
        db.String(255),
        nullable=False,
    )

    # Player Identity
    playername = db.Column(
        db.String(120),
        unique=True,
        nullable=False,
        index=True,
    )
    abbr = db.Column(
        db.String(3),
        nullable=False,
    )
    is_abbr_auto = db.Column(db.Boolean, default=True)
    slug = db.Column(
        db.String(120),
        unique=True,
        nullable=False,
        index=True,
    )
    is_slug_auto = db.Column(db.Boolean, default=True)

    # Limits
    limit_worlds = db.Column(db.Integer, default=2)
    total_worlds = db.Column(db.Integer, default=0)
    limit_world_themes = db.Column(db.Integer, default=2)
    total_world_themes = db.Column(db.Integer, default=0)

    # Status
    is_active = db.Column(db.Boolean, default=True, index=True)
    is_admin = db.Column(db.Boolean, default=False)

    # Relationships
    characters = db.relationship(
        "Character",
        back_populates="user",
        lazy="select",
        cascade="all, delete-orphan",
    )
    worlds = db.relationship(
        "World",
        back_populates="owner",
        lazy="select",
        cascade="all, delete-orphan",
    )

    # Important Dates
    created_at = db.Column(
        db.DateTime,
        default=datetime.now,
        nullable=False,
    )
    updated_at = db.Column(
        db.DateTime,
        default=datetime.now,
        onupdate=datetime.now,
    )

    def __repr__(self):
        return f"<User: {self.playername}>"

    def __str__(self):
        return self.playername

    def to_dict(self, include_characters=True, include_worlds=True):
        data = {
            "id": self.id,
            "playername": self.playername,
            "abbr": self.abbr,
            "slug": self.slug,
        }
        if include_characters:
            data["characters"] = [
                character.to_dict(include_user=False)
                for character in self.characters
            ]
        if include_worlds:
            data["worlds"] = [
                world.to_dict(include_owner=False)
                for world in self.worlds
            ]
        return data

    def validate(self):
        if self.is_abbr_auto:
            self.abbr = get_abbr(self.playername)
        else:
            if not self.abbr:
                raise ValueError("Abbreviation is required")
            if len(self.abbr) > 3:
                raise ValueError("Abbreviation must be 3 characters or less")
            if not self.abbr.isalpha() or not self.abbr.isupper():
                raise ValueError("Abbreviation must be uppercase letters")
        if self.is_slug_auto:
            self.slug = get_slug(self.playername, self, User)
        else:
            if not self.slug:
                raise ValueError("Slug is required")

    def save(self):
        self.validate()
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
