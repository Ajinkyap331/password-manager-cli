import crypto from "crypto";
import { promisify } from "util";

const pbkdf2 = promisify(crypto.pbkdf2);

const ALGORITHM = "aes-256-gcm";
const KEY_LENGTH = 32;
const SALT_LENGTH = 16;
const IV_LENGTH = 12;
const ITERATIONS = 100000;

export const encrypt = async (data, password) => {
  const salt = crypto.randomBytes(SALT_LENGTH);
  const iv = crypto.randomBytes(IV_LENGTH);

  const key = await pbkdf2(password, salt, ITERATIONS, KEY_LENGTH, "sha256");
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  const encrypted = Buffer.concat([
    cipher.update(JSON.stringify(data), "utf8"),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag();

  return {
    salt: salt.toString("hex"),
    iv: iv.toString("hex"),
    authTag: authTag.toString("hex"),
    encryptedData: encrypted.toString("hex"),
  };
};

export const decrypt = async (vault, password) => {
  const salt = Buffer.from(vault.salt, "hex");
  const iv = Buffer.from(vault.iv, "hex");
  const authTag = Buffer.from(vault.authTag, "hex");
  const encryptedData = Buffer.from(vault.encryptedData, "hex");

  const key = await pbkdf2(password, salt, ITERATIONS, KEY_LENGTH, "sha256");
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);

  decipher.setAuthTag(authTag);

  try {
    const decrypted = Buffer.concat([
      decipher.update(encryptedData),
      decipher.final(),
    ]);
    return JSON.parse(decrypted.toString("utf8"));
  } catch (error) {
    throw new Error("Invalid master password or corrupted data.");
  }
};
