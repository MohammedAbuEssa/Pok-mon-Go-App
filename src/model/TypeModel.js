// Type Model
const Type = (Sequelize, DataTypes) =>
  Sequelize.define("Type", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

module.exports = Type;
