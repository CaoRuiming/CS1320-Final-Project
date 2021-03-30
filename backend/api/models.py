from django.db import models
from django.conf import settings

# from django.core.validators import MinValueValidator


class UserSettings(models.Model):
    """Model storing user-specific settings."""

    class NotificationSetting(models.IntegerChoices):
        """Enum class representing what kinds of notifications to allow."""

        NONE = 0
        ALL = 1
        FOLLOWED_ONLY = 2

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="user"
    )
    notifications = models.IntegerField(
        choices=NotificationSetting.choices, default=NotificationSetting.FOLLOWED_ONLY
    )
    pronouns = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Course(models.Model):
    """Model for courses."""

    name = models.CharField(max_length=100)
    active = models.BooleanField(default=True)
    join_code = models.CharField(max_length=50, blank=True)
    instructors = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="instructor_courses"
    )
    students = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="student_courses"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Post(models.Model):
    """Model for posts."""

    class Type(models.IntegerChoices):
        """Enum class represening the type of a post."""

        NOTE = 0
        QUESTION = 1

    class Visibility(models.IntegerChoices):
        """Enum class representing the visibility setting of a post."""

        PRIVATE = 0
        PUBLIC = 1

    # ref_id = models.IntegerField(validators=[MinValueValidator(0)])
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        on_delete=models.SET_NULL,
        related_name="posts",
    )
    course = models.ForeignKey("Course", on_delete=models.CASCADE, related_name="posts")
    title = models.CharField(max_length=100)
    content = models.TextField()
    instructor_answer = models.TextField(blank=True)
    student_answer = models.TextField(blank=True)
    parent = models.ForeignKey(
        "Post",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name="child_posts",
    )
    tags = models.ManyToManyField("Tag", related_name="posts")
    type = models.IntegerField(choices=Type.choices, default=Type.QUESTION)
    visibility = models.IntegerField(
        choices=Visibility.choices, default=Visibility.PUBLIC
    )
    anonymous = models.BooleanField(default=True)
    followers = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="followed_posts"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Tag(models.Model):
    """Model for tags that can be assigned to posts."""

    name = models.CharField(max_length=50)
    course = models.ForeignKey("Course", on_delete=models.CASCADE, related_name="tags")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
