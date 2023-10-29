"use strict";
// Set All relations
const { pokemontModel, typeModel, weatherModel } = require("./index");

pokemontModel.belongsToMany(typeModel, { through: "PokemonTypes" });
pokemontModel.belongsToMany(weatherModel, { through: "PokemonWeathers" });

typeModel.belongsToMany(pokemontModel, { through: "PokemonTypes" });
weatherModel.belongsToMany(pokemontModel, { through: "PokemonWeathers" });

module.exports = {
  pokemontModel,
  typeModel,
  weatherModel,
};
