"use strict";
// Set All relations
const { Pokemon, Type, Weather } = require("./index");

Pokemon.belongsToMany(Type, { through: "PokemonType" });
Pokemon.belongsToMany(Weather, { through: "PokemonWeather" });

Type.belongsToMany(Pokemon, { through: "PokemonType" });
Weather.belongsToMany(Pokemon, { through: "PokemonWeather" });

module.exports = {
  Pokemon,
  Type,
  Weather,
};
