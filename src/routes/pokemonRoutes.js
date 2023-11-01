"use strict";
const express = require("express");
const pokemonRouter = express.Router();
const { upload } = require("../middleware/upload");
const {
  uploadFromExcelHandler,
  createHandler,
  getOneHandler,
  getAllHandlerWithFilters,
  deleteHandler,
} = require("../handlers/pokemonHandlers");

// Create from excel route
pokemonRouter.post(
  "/api/pokemon/upload",
  upload("file"),
  uploadFromExcelHandler
);
// Create route//
pokemonRouter.post("/api/pokemon", createHandler);
// Get route for a specific Pokemon by ID
pokemonRouter.get("/api/pokemon/:id", getOneHandler);
// Get route for all Pokemons with optional filters, pagination, and search
pokemonRouter.get("/api/pokemon", getAllHandlerWithFilters);
// Delete route for a specific Pokemon by ID
pokemonRouter.delete("/api/pokemon/:id", deleteHandler);

module.exports = pokemonRouter;
