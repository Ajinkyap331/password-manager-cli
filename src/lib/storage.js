import os from "os";
import path from "path";
import { JSONFilePreset } from "lowdb/node";
import { password as passwordPrompt } from "@inquirer/prompts";
import { encrypt, decrypt } from "../utils/crypto.js";

const initStorage = async () => {
  const homeDirectory = os.homedir();
  const storageDirectory = path.join(
    homeDirectory,
    ".config",
    "pmc",
    "passwords.json"
  );

  const defaultData = { vault: null };
  const db = await JSONFilePreset(storageDirectory, defaultData);

  return db;
};

export const addItem = async (newPasswordEntry) => {
  const db = await initStorage();
  const isNew = !db.data.vault;

  const masterPassword = await passwordPrompt({
    message: isNew
      ? "Create a new Master Password for your vault:"
      : "Enter your Master Password to unlock the vault:",
    mask: "*",
  });

  let passwords = [];
  if (!isNew) {
    passwords = await decrypt(db.data.vault, masterPassword);
  }

  passwords.push(newPasswordEntry);

  const encryptedVault = await encrypt(passwords, masterPassword);
  await db.update((data) => {
    data.vault = encryptedVault;
  });
};

export const getPasswords = async () => {
  const db = await initStorage();
  if (!db.data.vault) {
    console.log("Vault is empty.");
    return [];
  }

  const masterPassword = await passwordPrompt({
    message: "Enter your Master Password to unlock the vault:",
    mask: "*",
  });

  try {
    return await decrypt(db.data.vault, masterPassword);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export const clear = async (indexToRemove) => {
  const db = await initStorage();
  if (!db.data.vault) return;

  const masterPassword = await passwordPrompt({
    message: "Enter your Master Password to unlock the vault:",
    mask: "*",
  });

  let passwords = await decrypt(db.data.vault, masterPassword);

  if (indexToRemove >= 0 && indexToRemove < passwords.length) {
    passwords.splice(indexToRemove, 1);
    const encryptedVault = await encrypt(passwords, masterPassword);
    await db.update((data) => {
      data.vault = encryptedVault;
    });
  }
};
