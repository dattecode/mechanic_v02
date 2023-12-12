import { Sequelize } from "sequelize";
import envs from "../enviorements/enviroments.js";

export const sequelize = new Sequelize(envs.DB_URL, {
  logging: false,
});

export const authenticated = async () => {
  try {
    await sequelize.authenticate();
    console.log("Aunthenticated on");
  } catch (error) {
    console.log(error);
  }
};
export const syncOn = async () => {
  try {
    await sequelize.sync()
    console.log("Sync On");
  } catch (error) {
    console.log(error);
  }
};
