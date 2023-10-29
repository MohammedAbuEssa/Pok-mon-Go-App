require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? {
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      }
    : {};
const POSTGRES_URI =
  process.env.NODE_ENV === "test"
    ? "sqlite::memory:"
    : process.env.DATABASE_URL;
let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

const pokemontModel = require("./PokemonModel")(sequelize, DataTypes);
const typeModel = require("./TypeModel")(sequelize, DataTypes);
const weatherModel = require("./WeatherModel")(sequelize, DataTypes);

module.exports = {
  sequelize,
  DataTypes,
  pokemontModel,
  typeModel,
  weatherModel
};
