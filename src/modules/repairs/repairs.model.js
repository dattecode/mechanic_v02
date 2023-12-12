import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database/database.js";

export const RepairsModel = sequelize.define("repairs_model", {
  id: {
    type: DataTypes.INTEGER(),
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  date: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  motorsNumber: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(255),
  },
  status: {
    type: DataTypes.ENUM("completed", "pending", "cancelled"),
    allowNull: false,
    defaultValue: "pending",
  },
  userId: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
});
