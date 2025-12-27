import os from "os";
import path from "path";
import { JSONFilePreset } from "lowdb/node";

const initStorage = async () => {
  const homeDirectory = os.homedir();
  const storageDirectory = path.join(
    homeDirectory,
    ".config",
    "pmc",
    "passwords.json"
  );

  const defaultData = { passwords: [] };
  const db = await JSONFilePreset(storageDirectory, defaultData);

  return db;
};

export const addItem = async (password) => {
  initStorage().then((db) =>
    db.update(({ passwords }) => passwords.push(password))
  );
};

export const getPasswords = async () => (await initStorage()).data.passwords;

export const clear = async (indexToRemove) =>
  initStorage().then((db) =>
    db.update(({ passwords }) => passwords.splice(indexToRemove, 1))
  );
