import os from "os";
import path from "path";
import { JSONFilePreset } from "lowdb/node";
import { password as passwordPrompt, confirm } from "@inquirer/prompts";
import { encrypt, decrypt } from "../utils/crypto.js";
import keytar from "keytar";
import {
  getMasterPasswordPrompt,
  saveToKeychainPrompt,
} from "../utils/prompts.js";

const SERVICE_NAME = "PMC-CLI";
const ACCOUNT_NAME = "MasterPassword";

const getMasterPassword = async (isNew = false) => {
  if (!isNew) {
    const storedPassword = await keytar.getPassword(SERVICE_NAME, ACCOUNT_NAME);
    if (storedPassword) {
      return storedPassword;
    }
  }

  const masterPassword = await passwordPrompt(getMasterPasswordPrompt(isNew));

  const shouldSave = await confirm(saveToKeychainPrompt);

  if (shouldSave) {
    await keytar.setPassword(SERVICE_NAME, ACCOUNT_NAME, masterPassword);
    console.log("Master Password saved to System Keychain.");
  }

  return masterPassword;
};

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

  const masterPassword = await getMasterPassword(isNew);

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

  const masterPassword = await getMasterPassword();

  try {
    return await decrypt(db.data.vault, masterPassword);
  } catch (error) {
    console.error("Decryption failed. " + error.message);
    // If decryption fails, maybe the keychain password is wrong/stale?
    // Optionally delete it so the user can re-enter.
    await keytar.deletePassword(SERVICE_NAME, ACCOUNT_NAME);
    process.exit(1);
  }
};

export const clear = async (indexToRemove) => {
  const db = await initStorage();
  if (!db.data.vault) return;

  const masterPassword = await getMasterPassword();
  let passwords = await decrypt(db.data.vault, masterPassword);

  if (indexToRemove >= 0 && indexToRemove < passwords.length) {
    passwords.splice(indexToRemove, 1);
    const encryptedVault = await encrypt(passwords, masterPassword);
    await db.update((data) => {
      data.vault = encryptedVault;
    });
  }
};

export const updateItem = async (indexToUpdate, updatedEntry) => {
  const db = await initStorage();
  if (!db.data.vault) return;

  const masterPassword = await getMasterPassword();
  let passwords = await decrypt(db.data.vault, masterPassword);

  if (indexToUpdate >= 0 && indexToUpdate < passwords.length) {
    passwords[indexToUpdate] = { ...passwords[indexToUpdate], ...updatedEntry };
    const encryptedVault = await encrypt(passwords, masterPassword);
    await db.update((data) => {
      data.vault = encryptedVault;
    });
  }
};
