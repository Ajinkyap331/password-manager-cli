import { password as passwordPrompt, confirm } from "@inquirer/prompts";
import { vaultEncryption } from "../utils/crypto.js";
import keytar from "keytar";
import {
  getMasterPasswordPrompt,
  saveToKeychainPrompt,
} from "../utils/prompts.js";
import { JSONFilePreset } from "lowdb/node";
import {
  SERVICE_NAME,
  ACCOUNT_NAME,
  STORAGE_DIRECTORY,
  DEFAULT_DATA,
} from "../config.js";
import { DecryptionError } from "../utils/errors.js";

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
  const db = await JSONFilePreset(STORAGE_DIRECTORY, DEFAULT_DATA);
  return db;
};

export const addItem = async (newPasswordEntry) => {
  const db = await initStorage();
  const isNew = !db.data.vault;

  const masterPassword = await getMasterPassword(isNew);

  let passwords = [];
  if (!isNew) {
    passwords = await vaultEncryption.decrypt(db.data.vault, masterPassword);
  }

  passwords.push(newPasswordEntry);

  const encryptedVault = await vaultEncryption.encrypt(passwords, masterPassword);
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
    return await vaultEncryption.decrypt(db.data.vault, masterPassword);
  } catch (error) {
    if (error instanceof DecryptionError) {
      await keytar.deletePassword(SERVICE_NAME, ACCOUNT_NAME);
      throw new DecryptionError(
        "Decryption failed. The master password may be incorrect or the vault is corrupted. Stored keychain password has been cleared."
      );
    }
    throw error;
  }
};

export const clear = async (indexToRemove) => {
  const db = await initStorage();
  if (!db.data.vault) return;

  const masterPassword = await getMasterPassword();
  let passwords = await vaultEncryption.decrypt(db.data.vault, masterPassword);

  if (indexToRemove >= 0 && indexToRemove < passwords.length) {
    passwords.splice(indexToRemove, 1);
    const encryptedVault = await vaultEncryption.encrypt(passwords, masterPassword);
    await db.update((data) => {
      data.vault = encryptedVault;
    });
  }
};

export const updateItem = async (indexToUpdate, updatedEntry) => {
  const db = await initStorage();
  if (!db.data.vault) return;

  const masterPassword = await getMasterPassword();
  let passwords = await vaultEncryption.decrypt(db.data.vault, masterPassword);

  if (indexToUpdate >= 0 && indexToUpdate < passwords.length) {
    passwords[indexToUpdate] = { ...passwords[indexToUpdate], ...updatedEntry };
    const encryptedVault = await vaultEncryption.encrypt(passwords, masterPassword);
    await db.update((data) => {
      data.vault = encryptedVault;
    });
  }
};
