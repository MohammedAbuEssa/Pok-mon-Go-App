const express = require("express");
const pokemonRouter = express.Router();
const { Pokemon, Type, Weather } = require("../model/relations");

// Create route
pokemonRouter.post("/api/pokemons", async (req, res, next) => {
  try {
    // Extract Pokemon data from the request body
    const {
      name,
      pokedexNumber,
      imgName,
      generation,
      evolutionStage,
      evolved,
      familyID,
      crossGen,
      statTotal,
      ATK,
      DEF,
      STA,
      legendary,
      acquireable,
      spawns,
      regional,
      raidable,
      hatchable,
      shiny,
      nest,
      new: isNew, // Using 'new' as a variable name can cause issues, so renaming it to 'isNew'
      notGettable,
      futureEvolve,
      "100CPat40": CPat40,
      "100CPat39": CPat39,
      types,
      weathers,
    } = req.body;

    // Find or create types and weathers
    const [createdTypes] = await Type.findOrCreate({
      where: { name: types },
    });

    const [createdWeathers] = await Weather.findOrCreate({
      where: { name: weathers },
    });

    // Create the Pokemon record
    const newPokemon = await Pokemon.create({
      name,
      pokedexNumber,
      imgName,
      generation,
      evolutionStage,
      evolved,
      familyID,
      crossGen,
      statTotal,
      ATK,
      DEF,
      STA,
      legendary,
      acquireable,
      spawns,
      regional,
      raidable,
      hatchable,
      shiny,
      nest,
      new: isNew,
      notGettable,
      futureEvolve,
      "100CPat40": CPat40,
      "100CPat39": CPat39,
    });
    console.log(Object.getPrototypeOf(newPokemon));
    // Add associations with types and weathers
    await newPokemon.setTypes(createdTypes);
    await newPokemon.setWeather(createdWeathers);

    res.status(201).json(newPokemon);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
// Get route for a specific Pokemon by ID
pokemonRouter.get("/api/pokemons/:id", async (req, res, next) => {
  const pokemonId = req.params.id;

  // Find the Pokemon by ID with its associated types and weathers
  const foundPokemon = await Pokemon.findByPk(pokemonId, {
    include: [
      { model: Type, through: "PokemonType" },
      { model: Weather, through: "PokemonWeather" },
    ],
  });

  if (!foundPokemon) {
    return res.status(404).json({ message: "Pokemon not found" });
  }

  res.status(200).json(foundPokemon);
});

// Get route for all Pokemons with optional filters, pagination, and search
pokemonRouter.get("/api/pokemons", async (req, res, next) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    // Filters
    const filters = {
      generation: req.query.generation,
      legendary: req.query.legendary,
      type: req.query.type,
      weather: req.query.weather,
    };

    // Build filter conditions
    const filterConditions = {};
    if (filters.generation) filterConditions.generation = filters.generation;
    if (filters.legendary !== undefined)
      filterConditions.legendary = filters.legendary;

    // Include associated types and weathers
    const includeConditions = [];
    if (filters.type !== undefined) {
      includeConditions.push({
        model: Type,
        through: "PokemonType",
        where: { name: filters.type },
      });
    }
    if (filters.weather !== undefined) {
      includeConditions.push({
        model: Weather,
        through: "PokemonWeather",
        where: { name: filters.weather },
      });
    }

    const { count, rows: pokemons } = await Pokemon.findAndCountAll({
      where: filterConditions,
      include: includeConditions,
      offset,
      limit: pageSize,
    });

    res.status(200).json({ count, page, pageSize, pokemons });
  } catch (error) {
    console.error(error);
    next(error);
  }
});
// Delete route for a specific Pokemon by ID
pokemonRouter.delete("/api/pokemons/:id", async (req, res, next) => {
  try {
    const pokemonId = req.params.id;

    // Find the Pokemon by ID
    const foundPokemon = await Pokemon.findByPk(pokemonId);

    if (!foundPokemon) {
      return res.status(404).json({ message: "Pokemon not found" });
    }

    // Remove associations with types and weathers
    await foundPokemon.setTypes([]);
    await foundPokemon.setWeather(null);

    // Delete the Pokemon
    await foundPokemon.destroy();

    res.status(204).send(); // 204 No Content for successful deletion
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = pokemonRouter;
