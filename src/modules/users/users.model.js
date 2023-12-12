import { sequelize } from "../../config/database/database.js";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { encrypterPass } from "../../pluggins/encripter.pass.js";

export const UserModel = sequelize.define("user_model", {
  id: {
    type: DataTypes.INTEGER(),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  accountId: {
    type: DataTypes.STRING(),
    allowNull: false,
    defaultValue: () => uuidv4(),
  },
  name: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("client", "employee"),
    allowNull: false,
    defaultValue: "client",
  },
  status: {
    type: DataTypes.ENUM("active", "disable"),
    allowNull: false,
    defaultValue: "active",
  }
},
{
  hooks:{
    beforeCreate: async (user) => {
      user.password = await encrypterPass(user.password)
    }
  }
});
