from datetime import datetime

from oyk.extensions import db


class Character(db.Model):
    __tablename__ = "oyk_characters"

    # Authentication
    id = db.Column(
        db.Integer,
        primary_key=True,
        index=True,
    )
    user_id = db.Column(
        db.String(36),
        db.ForeignKey("oyk_users.id"),
        nullable=False,
    )
    user = db.relationship(
        "User",
        back_populates="characters",
        lazy="joined",
    )

    # Character Identity
    name = db.Column(
        db.String(120),
        nullable=False,
    )
    abbr = db.Column(
        db.String(3),
        nullable=False,
    )
    is_abbr_auto = db.Column(db.Boolean, default=True)

    # Stats
    resistance_physical = db.Column(db.SmallInteger, default=0, nullable=False)
    resistance_mental = db.Column(db.SmallInteger, default=0, nullable=False)
    resistance_spiritual = db.Column(db.SmallInteger, default=0, nullable=False)

    attribute_strength = db.Column(db.Integer, default=0, nullable=False)
    attribute_constitution = db.Column(db.Integer, default=0, nullable=False)
    attribute_dexterity = db.Column(db.Integer, default=0, nullable=False)
    attribute_perception = db.Column(db.Integer, default=0, nullable=False)
    attribute_intelligence = db.Column(db.Integer, default=0, nullable=False)
    attribute_willpower = db.Column(db.Integer, default=0, nullable=False)

    skills = db.Column(db.JSON, default=dict)

    # Status
    is_active = db.Column(db.Boolean, default=True, index=True)

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
        return f"<Character: {self.name}>"

    def __str__(self):
        return self.name

    def to_dict(self, include_user=True):
        data = {
            "id": self.id,
            "name": self.name,
            "abbr": self.abbr,
            "resistances": {
                "physical": self.resistance_physical,
                "mental": self.resistance_mental,
                "spiritual": self.resistance_spiritual,
            },
            "attributes": {
                "strength": self.attribute_strength,
                "constitution": self.attribute_constitution,
                "dexterity": self.attribute_dexterity,
                "perception": self.attribute_perception,
                "intelligence": self.attribute_intelligence,
                "willpower": self.attribute_willpower,
            },
            "skills": self.skills,
        }
        if include_user:
            data["user"] = self.user.to_dict(include_characters=False)
        return data

    def validate(self):
        if self.is_abbr_auto:
            self.abbr = self.name[0].upper()
        else:
            if not self.abbr:
                raise ValueError("Abbreviation is required")
            if len(self.abbr) > 3:
                raise ValueError("Abbreviation must be 3 characters or less")
            if not self.abbr.isalpha() or not self.abbr.isupper():
                raise ValueError("Abbreviation must be uppercase letters")
        # Resistances
        self.resistance_physical = (
            0 if self.resistance_physical is None else self.resistance_physical
        )
        self.resistance_mental = (
            0 if self.resistance_mental is None else self.resistance_mental
        )
        self.resistance_spiritual = (
            0 if self.resistance_spiritual is None else self.resistance_spiritual
        )
        if self.resistance_physical < 0 or self.resistance_physical > 10:
            raise ValueError("Physical Resistance must be between 0 and 10")
        if self.resistance_mental < 0 or self.resistance_mental > 10:
            raise ValueError("Mental Resistance must be between 0 and 10")
        if self.resistance_spiritual < 0 or self.resistance_spiritual > 10:
            raise ValueError("Spiritual Resistance must be between 0 and 10")
        if (self.resistance_physical + self.resistance_mental + self.resistance_spiritual) > 10:
            raise ValueError("The sum of resistances must be less than or equal to 10")
        # Attributes
        self.attribute_strength = (
            0 if self.attribute_strength is None else self.attribute_strength
        )
        self.attribute_constitution = (
            0 if self.attribute_constitution is None else self.attribute_constitution
        )
        self.attribute_dexterity = (
            0 if self.attribute_dexterity is None else self.attribute_dexterity
        )
        self.attribute_perception = (
            0 if self.attribute_perception is None else self.attribute_perception
        )
        self.attribute_intelligence = (
            0 if self.attribute_intelligence is None else self.attribute_intelligence
        )
        self.attribute_willpower = (
            0 if self.attribute_willpower is None else self.attribute_willpower
        )
        if self.attribute_strength < 0:
            raise ValueError("Strength Attribute must be greater than 0")
        if self.attribute_constitution < 0:
            raise ValueError("Constitution Attribute must be greater than 0")
        if self.attribute_dexterity < 0:
            raise ValueError("Dexterity Attribute must be greater than 0")
        if self.attribute_perception < 0:
            raise ValueError("Perception Attribute must be greater than 0")
        if self.attribute_intelligence < 0:
            raise ValueError("Intelligence Attribute must be greater than 0")
        if self.attribute_willpower < 0:
            raise ValueError("Willpower Attribute must be greater than 0")

    def save(self):
        self.validate()
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
