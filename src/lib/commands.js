import { passwordCommands } from "../commands/passwords.js";
import { serverCommands } from "../commands/serve.js";

export const init = (program) => {
  passwordCommands(program);
  serverCommands(program);
  program.parse();
};
