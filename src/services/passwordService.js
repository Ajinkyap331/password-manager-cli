import {
  getAllPasswords,
  createPassword,
  deletePasswordByIndex,
} from "../lib/api.js";
import { copyToClipboard } from "../utils/clipboard.js";

export const addPassword = async (url, username, password) => {
  try {
    await createPassword(url, username, password);
    console.log("Password added successfully.");
  } catch (error) {
    console.error("Failed to add password:", error.message);
  }
};

export const listPasswords = async () => {
  try {
    const passwords = await getAllPasswords();
    console.table(passwords, ["url", "username"]);
  } catch (error) {
    console.error("Failed to list passwords:", error.message);
  }
};

export const copyPassword = async (index) => {
  try {
    const passwords = await getAllPasswords();

    if (index >= 0 && index < passwords.length) {
      const password = passwords[index].password;
      const success = await copyToClipboard(password);
      if (success) console.log("Password copied to clipboard.");
    } else console.error("Invalid index provided.");
  } catch (error) {
    console.error("Failed to copy password:", error.message);
  }
};

export const deletePassword = async (index) => {
  try {
    const passwords = await getAllPasswords();

    if (index >= 0 && index < passwords.length) {
      await deletePasswordByIndex(index);

      console.log("Password deleted successfully.");
    } else console.error("Invalid index provided.");
  } catch (error) {
    console.error("Failed to delete password:", error.message);
  }
};
