"""Data models for course structure."""

from pydantic import BaseModel, Field


class Lesson(BaseModel):
    """Represents a single lesson."""

    name: str = Field(description="Lesson title from filename")
    duration_minutes: int = Field(default=0, description="Lesson duration in minutes")
    tasks: int = Field(default=0, description="Number of tasks in the lesson")
    order: int = Field(description="Order extracted from numeric prefix")


class Topic(BaseModel):
    """Represents a topic (subfolder in a module)."""

    name: str = Field(description="Topic name from folder name")
    description: str = Field(default="", description="Topic description")
    order: int = Field(description="Order extracted from numeric prefix")
    lessons: list[Lesson] = Field(
        default_factory=list, description="Lessons in this topic"
    )


class Module(BaseModel):
    """Represents a module (top-level folder)."""

    name: str = Field(description="Module name from folder name")
    description: str = Field(default="", description="Module description from index.md")
    order: int = Field(description="Order extracted from numeric prefix")
    topics: list[Topic] = Field(
        default_factory=list, description="Topics in this module"
    )


class Course(BaseModel):
    """Represents the entire course structure."""

    modules: list[Module] = Field(
        default_factory=list, description="All modules in the course"
    )
