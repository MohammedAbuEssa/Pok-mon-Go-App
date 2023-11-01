# Pokémon Go App

### [Live URL](https://pokemon-docker.onrender.com/)

Welcome to the **Pokémon Go App**, a dynamic application that allows you to explore the exciting world of Pokémon! Whether you're a seasoned Pokémon Trainer or just starting your journey, this app provides a comprehensive platform for managing, discovering, and interacting with your favorite Pokémon.

# Project Structure

This project follows a specific structure to keep the code organized. Below is an explanation of the key directories and files:

## Directory Structure

- **`/src`**: Contains the source code for the application.

  - **`/routes`**: Defines the API routes and their handlers.

  - **`/model`**: Contains Sequelize models for interacting with the database.

  - **`/middleware`**: Houses middleware functions used in the application.

  - **`/config`**: Configuration files for various environments.
  - **`handlers`**: Contains request handlers for managing Pokemon data.

    - **`pokemonHandlers.js`**: Handles operations related to Pokemon, including uploading from Excel, creation, retrieval, filtering, and deletion.

- **`/assets`**: Holds Pokémon Excel template to use.
- **`/tests`**: Holds test files for unit and integration testing.
- **`docker-compose.yml`**: Docker Compose configuration for setting up the development environment.

- **`package.json`**: Node.js package file containing project dependencies and scripts.

- **`README.md`**: This file, providing an introduction and information on how to run the project.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop) - Containerization platform for easy deployment.

## Features

- **Upload from Excel:** Seamlessly import Pokémon data from Excel sheets to quickly populate your database with new Pokémon records.
- **Create Pokémon:** Easily create new Pokémon records with detailed information, including their stats, types, weathers, and more.
- **Get Pokémon by ID:** Retrieve information about a specific Pokémon by searching for it using its unique ID.
- **Filter and Search:** Explore and filter Pokémon based on their generation, legendary status, type, weather, and various other attributes.
- **Delete Pokémon:** Remove Pokémon records from your database effortlessly.

## Getting Started

To get started with the Pokémon Go App, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/pokemon-go-app.git
   ```
2. **Navigate to the app directory:**
   ```bash
   cd Pok-mon-Go-App/
   ```
3. **Run the following commands to build the Docker image and start the application:**

   - ```bash
     docker-compose up -d node_db
     ```
   - ```bash
     docker compose build
     ```
   - ```bash
     docker compose up
     ```

4. Access the API at http://localhost:8080.

## Uploading Pokémon Records

To upload Pokémon records from an Excel file, use the provided template:

- Download the [pokemon_data_template.xlsx](./assets/pokemon_data_template.xlsx) file.

- Fill in the Pokémon details in the template.

## Documentation

### For comprehensive API documentation, including available endpoints, request/response formats, and usage examples, refer to [API Documentation](https://documenter.getpostman.com/view/11572105/2s9YXcdQ8J).
