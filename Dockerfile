FROM bitnami/mongodb:latest

ENV MONGODB_USERNAME=tt
ENV MONGODB_PASSWORD=tt
ENV MONGODB_DATABASE=timetracker

VOLUME /home/sebastian/code/docker-volumes/mongodb/:/bitnami/mongodb