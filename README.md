# Q&A Discussion Board Application

This is a final project for the class [CSCI 1320: Modern Web & Mobile Applications](http://cs.brown.edu/courses/csci1320/) taught at [Brown University](https://www.brown.edu).

The goal of this project is to create an open source Q&A Discussion Board web application comparable to [Piazza](https://piazza.com/), [CampusWire](https://campuswire.com), and [Ed Discussion](https://edstem.org/).

Technologies used:
- [React](https://reactjs.org) for the frontend via [Create React App](https://create-react-app.dev)
- [Django](https://www.djangoproject.com) for the backend/API
- [PostgreSQL](https://www.postgresql.org) for the database
- [Nginx](https://nginx.org/) for the reverse proxy and as a static web server
- [Docker](https://www.docker.com) for deployment and tying everything else together

## Setup/Getting Started

### Dependencies

To run this project, the following dependencies must be installed:
- [Yarn](https://yarnpkg.com/getting-started/install): package manager for frontend
- [Docker](https://docs.docker.com/get-docker/): for running the project's containers
- [Docker Compose](https://docs.docker.com/compose/install/): for setting up the container network
- [Python 3.9+](https://www.python.org/downloads/): for local development

### Python Virtual Environment

Setting up a Python virtual environment using `requirements.txt` may be helpful for local development (especially for IDEs), but it is not required to run the application since Docker takes care of that. If you choose to set up a virtual environment, tools like [pyenv](https://github.com/pyenv/pyenv) and [venv](https://docs.python.org/3/library/venv.html) may be helpful.

### Setting up Environment Variables

**Important**: before anything is run, a `.env` file must be set up in the project root directory. You may make a copy of `.env.example` to make your `.env`; just make sure that you generate a new key and password using some kind of password generator like the following:

```bash
openssl rand -base64 32
```

Keep in mind that these passwords/keys must not have whitespace or any kind of quotes in them.

Additionally, you may want to set `DEBUG` to `True` for local development.

### Building and Running the Project

After the previous steps are completed, use the following command in the root project directory to build and run the project containers:

```bash
make run
```

Once the scripts stop running, the project should be accessible at `http://localhost`.

### Database Setup/Migrations

At this point, the database is not yet set up to work with the Django app. To run the necessary database migrations, run `make backend-shell` and use the following command to run migrations:

```bash
python manage.py migrate
```

You will need to run migrations once during setup and every time when models in the Django app are changed. For more information, read the [Django documentation on migrations](https://docs.djangoproject.com/en/3.1/topics/migrations/).

### Closing Notes

That's it! Everything should be all set up.

To stop the project, run the following command in the root project directory:

```bash
make down
```

For more handy `make` commands, take a look at the `Makefile`!

Every time you want to run the project again, just run `make run`.

## Frontend Development

All frontend code and assets are located in the `frontend` directory. The `frontend` directory is essentially a [Create React App](https://create-react-app.dev) project.

You can run the dev server through `yarn start`, but that wouldn't work if you also wanted to call the backend API from the frontend.

To test everything end to end, you can run `make run` in the root project directory to run the backend and frontend containers. To recompile the frontend, run the following command in the root project directory:

```bash
make frontend
```

This will also automatically update the frontend container, so you can refresh the webapp to see new changes.

## Backend Development

All backend code and assets are located in the `backend` directory (in the root directory). The `backend` directory is a Django project.
- `backend/backend`: contains backend project config and files
- `backend/api`: contains all of the logic for the API; all routes to `api/v0/` go here

To run the backend, you can run `make run` in the root project directory. To restart/rebuild the backend after changes, run the following command in the root project directory:

```bash
make backend
```

Note that the command above will restart the backend Docker container, so make sure no sensitive operations are happening when it is run.

If you want to have access to the shell of the backend container to run Django commands (e.g. running `manage.py` commands and migrations), run the following in the root project directory:

```bash
make backend-shell
```

To exit the shell, run `exit`.

## Database Access

To access the PostgreSQL command line client, run `make db-shell` in the root project directory and then run `psql -d app` within the shell. Then you can run standard PostgreSQL commands.

## Resetting Everything

In the event something goes terribly wrong and you want to start from a clean slate again:
- shut down all of the containers through the command `docker-compose down -v` to wipe PostgreSQL data
- find the image id for this project's backend container image through `docker images` and then run `docker rmi <backend-image-id>` to delete it
