from datetime import datetime

from oyk.extensions import db


class Task(db.Model):
    __tablename__ = "oyk_tasks"

    # Authentication
    id = db.Column(
        db.Integer,
        primary_key=True,
        index=True,
    )
    world_id = db.Column(
        db.Integer,
        db.ForeignKey("oyk_worlds.id"),
        nullable=False,
    )
    world = db.relationship(
        "World",
        back_populates="tasks",
        lazy="select",
    )

    # Task Identity
    title = db.Column(
        db.String(120),
        nullable=False,
    )
    content = db.Column(
        db.Text,
        nullable=False,
    )
    status_id = db.Column(
        db.Integer,
        db.ForeignKey("oyk_task_status.id"),
        nullable=False,
    )
    status = db.relationship(
        "TaskStatus",
        back_populates="tasks",
        lazy="select",
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
        return f"<Task: {self.title}>"

    def __str__(self):
        return self.title

    def to_dict(self, include_status=True):
        data = {
            "id": self.id,
            "title": self.title,
            "content": self.content,
        }
        if include_status:
            data["status"] = self.status.to_dict(include_tasks=False)
        return data

    def save(self):
        self.validate()
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


class TaskStatus(db.Model):
    __tablename__ = "oyk_task_status"

    # Authentication
    id = db.Column(
        db.Integer,
        primary_key=True,
        index=True,
    )
    world_id = db.Column(
        db.Integer,
        db.ForeignKey("oyk_worlds.id"),
        nullable=False,
    )
    world = db.relationship(
        "World",
        back_populates="task_status",
        lazy="select",
    )

    # Status Identity
    name = db.Column(
        db.String(64),
        nullable=False,
    )
    colour = db.Column(
        db.String(9),
        nullable=True,
    )
    sort_order = db.Column(
        db.SmallInteger,
        default=0,
        nullable=False,
    )

    # Status
    is_completed = db.Column(db.Boolean, default=False)

    # Relationships
    tasks = db.relationship(
        "Task",
        back_populates="status",
        lazy="dynamic",
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
        return f"<TaskStatus: {self.name}>"

    def __str__(self):
        return self.name

    def to_dict(self, include_tasks=True):
        data = {
            "id": self.id,
            "name": self.name,
            "colour": self.colour,
            "sort_order": self.sort_order,
            "is_completed": self.is_completed,
        }
        if include_tasks:
            data["tasks"] = [task.to_dict(include_status=False) for task in self.tasks.all()]
        return data

    def validate(self):
        # TODO: Validate that the sort_order is unique for the world, and increment it if not
        pass

    def save(self):
        self.validate()
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
