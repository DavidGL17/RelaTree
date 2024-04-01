#!/bin/bash
# Starts the backend in development mode with the mongodb database

cd database
docker-compose up -d
cd ..
npm run dev