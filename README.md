# RelaTree <!-- omit from toc -->

A web app to create and update you family tree. Composed of a backend using node, and a frontend using react and nextjs.

---

- [1. Installation for development](#1-installation-for-development)
- [2. Deployment](#2-deployment)

---

# 1. Installation for development

Look into each readme for how to install and run the backend and frontend.

-   [Backend](./backend/README.md)
-   [Frontend](./frontend/README.md)

# 2. Deployment

To deploy the application on your system, you can use docker compose. To do so, rename the docker-compose-example.yml file to docker-compose.yml. You can then modify the values inside to suit your preferences. You also need to copy the backend.env.example file to backend.env, and same for the frontend.env file. Both files need to be adjusted to your preferences.

You can then run the following command to start the application:

```bash
mkdir db # only the first time
docker-compose up
```
