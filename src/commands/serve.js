import express from "express";
import { getPasswordByUrl } from "../lib/api.js";
export const app = express();
const PORT = 7474;

export const serverCommands = (program) => {
  program
    .command("serve")
    .description("list all passwords")
    .action(startServer);
};

app.get("/password", async (req, res) => {
  const url = req.query.url
  console.log(url)
  const passwords = await getPasswordByUrl(url);
  res.send(passwords);
});

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
};
