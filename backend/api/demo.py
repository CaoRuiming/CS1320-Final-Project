from django.core import management
from django.contrib.auth.models import User
from api.models import Course, Post, Tag
from api.services import UserService


def setup():
    """
    Function that creates and saves elements to the database for demo purposes.
    Function assumes that the database starts out empty.
    For LOCAL DEV ONLY.
    """
    passwords = []

    # create example users
    passwords.append(UserService.generate_password())
    user1 = User.objects.create_user(
        "josiah_carberry@brown.edu",
        password=passwords[0],
        email="josiah_carberry@brown.edu",
        first_name="Josiah",
        last_name="Carberry",
    )
    user1.save()

    passwords.append(UserService.generate_password())
    user2 = User.objects.create_user(
        "blueno@brown.edu",
        password=passwords[1],
        email="blueno@brown.edu",
        first_name="Blueno",
    )
    user2.save()

    passwords.append(UserService.generate_password())
    user3 = User.objects.create_user(
        "random@brown.edu",
        password=passwords[2],
        email="random@brown.edu",
        first_name="Random",
        last_name="Person",
    )
    user3.save()

    # create course
    course1 = Course(name="Course 1")
    course1.save()
    course1.instructors.add(user1)
    course1.students.add(user2)
    course1.students.add(user3)
    course1.save()

    # create posts
    post1 = Post(
        author=user1,
        course=course1,
        title="I have a question",
        content="idk what im doing",
        anonymous=True,
        type=Post.Type.QUESTION,
        visibility=Post.Visibility.PUBLIC,
    )
    post1.save()

    post2 = Post(
        author=user1,
        course=course1,
        title="I also have a question",
        content="i really dont know what im doing",
        anonymous=False,
        type=Post.Type.NOTE,
        visibility=Post.Visibility.PRIVATE,
    )
    post2.save()

    # create tags
    tag1 = Tag(name="Tag 1", course=course1)
    tag1.save()
    tag2 = Tag(name="Tag 2", course=course1)
    tag2.save()

    post1.tags.add(tag1, tag2)
    post2.tags.add(tag2)

    print("setup successful!")
    print("user passwords in order: " + str(passwords))
