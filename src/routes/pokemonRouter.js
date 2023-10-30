const express = require("express");
const pokemonRouter = express.Router();
const { Pokemon, Type, Weather } = require("../model/relations");

// Create route
pokemonRouter.post("/api/pokemonadd", async (req, res, next) => {
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
pokemonRouter.get("/api/pokemon/:id", async (req, res, next) => {
  try {
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
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = pokemonRouter;
