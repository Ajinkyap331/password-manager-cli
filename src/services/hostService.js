import { setItem } from "../lib/storage.js";

export const linkManager = async (ip) => {
  try {
    await setItem("host", ip);
    console.log(`Host IP ${ip} linked successfully.`);
  } catch (error) {
    console.error("Failed to link host IP:", error.message);
  }
};
