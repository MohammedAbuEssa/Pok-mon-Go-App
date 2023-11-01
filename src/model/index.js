require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
// let sequelizeOptions =
//   process.env.NODE_ENV === "production"
//     ? {
//         dialectOptions: {
//           ssl: {
//             require: true,
//             rejectUnauthorized: false,
//           },
//         },
//       }
//     : {};
// const POSTGRES_URI =
//   process.env.NODE_ENV === "test"
//     ? "sqlite::memory:"
//     : process.env.DATABASE_URL;
// let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

const sequelize = new Sequelize(
  process.env.PG_DB,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    dialect: "postgres",
  }
);

const pokemontModel = require("./PokemonModel")(sequelize, DataTypes);
const typeModel = require("./TypeModel")(sequelize, DataTypes);
const weatherModel = require("./WeatherModel")(sequelize, DataTypes);

module.exports = {
  sequelize,
  DataTypes,
  Pokemon: pokemontModel,
  Type: typeModel,
  Weather: weatherModel,
};
