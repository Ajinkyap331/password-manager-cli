import express from "express";
import { getPasswords } from "../lib/storage.js";
export const app = express();
const PORT = 7474;

export const serverCommands = (program) => {
  program
    .command("serve")
    .description("Create a server to interact with UI")
    .action(startServer);
};

app.get("/password", async (req, res) => {
  const url = req.query.url;
  console.log(url);
  try {
    const allPasswords = await getPasswords();
    const passwords = allPasswords.filter((password) => password.url === url);
    res.send(passwords);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
};
