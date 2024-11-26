const { STRING } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Pledges = sequelize.define("pledges", {
    pledge_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    pledge_username: { type: DataTypes.STRING, allowNull: false },
    pledge_location: { type: DataTypes.STRING, allowNull: false },
    pledge_status: { type: DataTypes.STRING, allowNull: false },
    pledge_item: { type: DataTypes.STRING, allowNull: false },
    pledge_item_quant: { type: DataTypes.STRING, allowNull: false },
  });

  return Pledges;
};
