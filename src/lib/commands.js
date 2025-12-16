import { passwordCommands } from "../commands/passwords.js";
import { hostCommands } from "../commands/host.js";

export const init = (program) => {
  passwordCommands(program);
  hostCommands(program);
  program.parse();
};
