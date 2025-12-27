import {
  getAllPasswords,
  createPassword,
  deletePasswordByIndex,
  updatePasswordByIndex,
} from "../lib/api.js";
import { copyToClipboard } from "../utils/clipboard.js";
import { input, password as passwordPrompt } from "@inquirer/prompts";

export const addPassword = async (url, username, password) => {
  try {
    const finalUrl =
      url ||
      (await input({ message: "Enter URL (e.g., google.com):" }));
    const finalUsername =
      username || (await input({ message: "Enter Username:" }));
    const finalPassword =
      password ||
      (await passwordPrompt({ message: "Enter Password:", mask: "*" }));

    await createPassword(finalUrl, finalUsername, finalPassword);
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

export const updatePassword = async (index) => {
  try {
    const passwords = await getAllPasswords();

    if (index >= 0 && index < passwords.length) {
      const current = passwords[index];
      const updates = {};

      const newUsername = await input({
        message: `Enter Username (leave empty to keep: ${current.username}):`,
      });
      if (newUsername) updates.username = newUsername;

      const newPassword = await passwordPrompt({
        message: "Enter New Password (leave empty to keep current):",
        mask: "*",
      });
      if (newPassword) updates.password = newPassword;

      if (Object.keys(updates).length > 0) {
        await updatePasswordByIndex(index, updates);
        console.log("Password entry updated successfully.");
      } else {
        console.log("No changes made.");
      }
    } else console.error("Invalid index provided.");
  } catch (error) {
    console.error("Failed to update password:", error.message);
  }
};
