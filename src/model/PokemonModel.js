// Main Model
const Pokemon = (Sequelize, DataTypes) =>
  Sequelize.define("Pokemon", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pokedexNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imgName: {
      type: DataTypes.STRING,
    },
    generation: {
      type: DataTypes.INTEGER,
    },
    evolutionStage: {
      type: DataTypes.INTEGER,
    },
    evolved: {
      type: DataTypes.BOOLEAN,
    },
    familyID: {
      type: DataTypes.INTEGER,
    },
    crossGen: {
      type: DataTypes.BOOLEAN,
    },
    statTotal: {
      type: DataTypes.INTEGER,
    },
    ATK: {
      type: DataTypes.INTEGER,
    },
    DEF: {
      type: DataTypes.INTEGER,
    },
    STA: {
      type: DataTypes.INTEGER,
    },
    legendary: {
      type: DataTypes.BOOLEAN,
    },
    acquireable: {
      type: DataTypes.BOOLEAN,
    },
    spawns: {
      type: DataTypes.BOOLEAN,
    },
    regional: {
      type: DataTypes.BOOLEAN,
    },
    raidable: {
      type: DataTypes.BOOLEAN,
    },
    hatchable: {
      type: DataTypes.BOOLEAN,
    },
    shiny: {
      type: DataTypes.BOOLEAN,
    },
    nest: {
      type: DataTypes.BOOLEAN,
    },
    new: {
      type: DataTypes.BOOLEAN,
    },
    notGettable: {
      type: DataTypes.BOOLEAN,
    },
    futureEvolve: {
      type: DataTypes.BOOLEAN,
    },
    "100CPat40": {
      type: DataTypes.INTEGER,
    },
    "100CPat39": {
      type: DataTypes.INTEGER,
    },
  });

module.exports = Pokemon;

