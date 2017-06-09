FROM bitnami/mongodb:latest

ENV MONGODB_USERNAME=timetracker
ENV MONGODB_PASSWORD=TimeTracker123
ENV MONGODB_DATABASE=timetracker

VOLUME /home/sebastian/code/docker-volumes/mongodb/:/bitnami/mongodb