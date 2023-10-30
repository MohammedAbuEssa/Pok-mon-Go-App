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
      type: DataTypes.STRING,
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
      type: DataTypes.INTEGER,
    },
    acquireable: {
      type: DataTypes.INTEGER,
    },
    spawns: {
      type: DataTypes.BOOLEAN,
    },
    regional: {
      type: DataTypes.BOOLEAN,
    },
    raidable: {
      type: DataTypes.INTEGER,
    },
    hatchable: {
      type: DataTypes.INTEGER,
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
