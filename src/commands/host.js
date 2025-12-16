import { linkManager } from "../services/hostService.js";

export const hostCommands = (program) => {
  program
    .command("link")
    .description("link a password manager")
    .argument("ip", "ip")
    .action(linkManager);
};