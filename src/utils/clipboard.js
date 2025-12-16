import clipboard from "clipboardy";

export const copyToClipboard = async (text) => {
  try {
    await clipboard.write(text);
    return true;
  } catch (error) {
    console.error("Failed to copy to clipboard:", error.message);
    return false;
  }
};
