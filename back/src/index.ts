import { SERVER_PORT } from "./Config/envs";
import { AppDataSource } from "./data-source";
import server from "./server";

server.listen(8888, () => {
  console.log(`Server running on port http://127.0.0.1:${SERVER_PORT}`);
  try {
    connectToDB();
  } catch (error) {
    setTimeout(() => connectToDB(), 10000);
  }
});

const connectToDB = async () => {
  await AppDataSource.initialize();
};
