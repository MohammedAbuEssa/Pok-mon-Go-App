const express = require("express");
const pokemonRouter = express.Router();
const {
  pokemontModel,
  typeModel,
  weatherModel,
} = require("../model/relations");



// Create route
pokemonRouter.post("/api/pokemon", async (req, res, next) => {
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
      types, // Assuming types is an array of type names
      weathers, // Assuming weathers is an array of weather names
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

    // Add associations with types and weathers
    await newPokemon.setTypes(createdTypes);
    await newPokemon.setWeathers(createdWeathers);

    res.status(201).json(newPokemon);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = pokemonRouter;
