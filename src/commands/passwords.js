import {
  addPassword,
  listPasswords,
  copyPassword,
  deletePassword,
} from "../services/passwordService.js";

export const passwordCommands = (program) => {
  program
    .command("list")
    .description("list all passwords")
    .action(listPasswords);

  program
    .command("add")
    .description("add a password")
    .argument("url", "url")
    .argument("username", "username")
    .argument("password", "password")
    .action(addPassword);

  program
    .command("copy")
    .description("copy the password to clipboard")
    .argument("index", "index")
    .action(copyPassword);

  program
    .command("delete")
    .description("Delete Password")
    .argument("index", "index")
    .action(deletePassword);
};