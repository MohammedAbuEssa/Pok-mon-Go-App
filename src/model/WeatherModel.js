// Weather Model
const Weather = (Sequelize, DataTypes) =>
  Sequelize.define("Weather", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

module.exports = Weather;
