import app from "./app.js";
import { authenticated, syncOn } from "./config/database/database.js";
import envs from "./config/enviorements/enviroments.js";

async function main() {
  try {
    await authenticated();
    await syncOn();
  } catch (error) {
    console.log(error);
  }
}

main();

app.listen(envs.PORT, () => {
  console.log(`connection port: ${envs.PORT}`);
});
