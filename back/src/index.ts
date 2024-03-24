import { SERVER_PORT } from "./Config/envs";
import server from "./server";

server.listen(SERVER_PORT, () => {
  console.log(`Server running on port: ${SERVER_PORT}`);
});
