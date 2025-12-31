export const urlPrompt = { message: "Enter URL (e.g., google.com):" };

export const usernamePrompt = { message: "Enter Username:" };

export const passwordPromptConfig = { message: "Enter Password:", mask: "*" };

export const getUpdateUsernamePrompt = (currentUsername) => ({
  message: `Enter Username (leave empty to keep: ${currentUsername}):`,
});

export const updatePasswordPromptConfig = {
  message: "Enter New Password (leave empty to keep current):",
  mask: "*",
};

export const getMasterPasswordPrompt = (isNew) => ({
  message: isNew
    ? "Create a new Master Password for your vault:"
    : "Enter your Master Password to unlock the vault:",
  mask: "*",
});

export const saveToKeychainPrompt = {
  message: "Save Master Password to System Keychain?",
  default: true,
};
