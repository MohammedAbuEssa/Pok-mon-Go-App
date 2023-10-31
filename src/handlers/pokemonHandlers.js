const XLSX = require("xlsx");
const { Pokemon, Type, Weather } = require("../model/relations");

async function uploadFromExcelHandler(req, res, next) {
  try {
    // Read the Excel file
    const workbook = XLSX.readFile(req.file.path);
    const workSheets = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(workSheets);

    // Process each row in the Excel sheet
    const pokemonPromises = data.map(async (item) => {
      // Find or create types and weathers
      const [createdTypes] = await Type.findOrCreate({
        where: { name: item.types },
      });

      const [createdWeathers] = await Weather.findOrCreate({
        where: { name: item.weathers },
      });

      // Create the Pokemon record
      const newPokemon = await Pokemon.create({
        name: item.name,
        pokedexNumber: item.pokedexNumber,
        imgName: item.imgName,
        generation: item.generation,
        evolutionStage: item.evolutionStage,
        evolved: item.evolved,
        familyID: item.familyID,
        crossGen: item.crossGen,
        statTotal: item.statTotal,
        ATK: item.ATK,
        DEF: item.DEF,
        STA: item.STA,
        legendary: item.legendary,
        acquireable: item.acquireable,
        spawns: item.spawns,
        regional: item.regional,
        raidable: item.raidable,
        hatchable: item.hatchable,
        shiny: item.shiny,
        nest: item.nest,
        new: item.new,
        notGettable: item.notGettable,
        futureEvolve: item.futureEvolve,
        "100CPat40": item.CPat40,
        "100CPat39": item.CPat39,
      });

      // Add associations with types and weathers
      await newPokemon.setTypes(createdTypes);
      await newPokemon.setWeather(createdWeathers);

      // Return the created Pokemon record
      return newPokemon;
    });

    // Wait for all Pokemon creation promises to resolve
    const pokemonRecords = await Promise.all(pokemonPromises);

    res.status(201).json(pokemonRecords);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function createHandler(req, res, next) {
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
}

async function getOneHandler(req, res, next) {
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
}

async function getAllHandlerWithFilters(req, res, next) {
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
      include: [
        ...includeConditions,
        { model: Type, through: "PokemonType" },
        { model: Weather, through: "PokemonWeather" },
      ],
      offset,
      limit: pageSize,
    });

    res.status(200).json({ count, page, pageSize, pokemons });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function deleteHandler(req, res, next) {
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
}

module.exports = {
  uploadFromExcelHandler,
  createHandler,
  getOneHandler,
  getAllHandlerWithFilters,
  deleteHandler,
};
