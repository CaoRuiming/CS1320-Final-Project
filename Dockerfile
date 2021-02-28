FROM python:3.9
RUN apt-get update && apt-get upgrade -y

WORKDIR /src

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY backend/ backend/

EXPOSE 80
EXPOSE 443

WORKDIR /src/backend
ENTRYPOINT ["daphne", "--bind", "0.0.0.0", "--port", "80", "backend.asgi:application"]
