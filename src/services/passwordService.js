import { input, password as passwordPrompt } from "@inquirer/prompts";
import {
  getAllPasswords,
  createPassword,
  deletePasswordByIndex,
  updatePasswordByIndex,
} from "../lib/api.js";
import { copyToClipboard } from "../utils/clipboard.js";
import {
  urlPrompt,
  usernamePrompt,
  passwordPromptConfig,
  getUpdateUsernamePrompt,
  updatePasswordPromptConfig,
} from "../utils/prompts.js";

export const listPasswords = async () => {
  try {
    const passwords = await getAllPasswords();
    console.table(passwords, ["url", "username"]);
  } catch (error) {
    console.error("Failed to list passwords:", error.message);
  }
};

export const addPassword = async (url, username, password) => {
  try {
    const finalUrl = url || (await input(urlPrompt));
    const finalUsername = username || (await input(usernamePrompt));
    const finalPassword =
      password || (await passwordPrompt(passwordPromptConfig));

    await createPassword(finalUrl, finalUsername, finalPassword);
    console.log("Password added successfully.");
  } catch (error) {
    console.error("Failed to add password:", error.message);
  }
};

export const copyPassword = async (index) => {
  try {
    const passwords = await getAllPasswords();
    const i = parseInt(index, 10);

    if (!isNaN(i) && i >= 0 && i < passwords.length) {
      const password = passwords[i].password;
      const success = await copyToClipboard(password);
      if (success) console.log("Password copied to clipboard.");
    } else {
      console.error("Invalid index provided.");
    }
  } catch (error) {
    console.error("Failed to copy password:", error.message);
  }
};

export const deletePassword = async (index) => {
  try {
    const passwords = await getAllPasswords();
    const i = parseInt(index, 10);

    if (!isNaN(i) && i >= 0 && i < passwords.length) {
      await deletePasswordByIndex(i);
      console.log("Password deleted successfully.");
    } else {
      console.error("Invalid index provided.");
    }
  } catch (error) {
    console.error("Failed to delete password:", error.message);
  }
};

export const updatePassword = async (index) => {
  try {
    const passwords = await getAllPasswords();
    const i = parseInt(index, 10);

    if (!isNaN(i) && i >= 0 && i < passwords.length) {
      const current = passwords[i];
      const updates = {};

      const newUsername = await input(
        getUpdateUsernamePrompt(current.username)
      );
      if (newUsername) updates.username = newUsername;

      const newPassword = await passwordPrompt(updatePasswordPromptConfig);
      if (newPassword) updates.password = newPassword;

      if (Object.keys(updates).length > 0) {
        await updatePasswordByIndex(i, updates);
        console.log("Password entry updated successfully.");
      } else {
        console.log("No changes made.");
      }
    } else {
      console.error("Invalid index provided.");
    }
  } catch (error) {
    console.error("Failed to update password:", error.message);
  }
};
