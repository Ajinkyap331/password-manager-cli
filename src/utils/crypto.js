import crypto from "crypto";
import { promisify } from "util";
import { DecryptionError } from "./errors.js";

const pbkdf2 = promisify(crypto.pbkdf2);

export class VaultEncryption {
  constructor() {
    this.ALGORITHM = "aes-256-gcm";
    this.KEY_LENGTH = 32;
    this.SALT_LENGTH = 16;
    this.IV_LENGTH = 12;
    this.ITERATIONS = 100000;
  }

  async encrypt(data, password) {
    const salt = crypto.randomBytes(this.SALT_LENGTH);
    const iv = crypto.randomBytes(this.IV_LENGTH);

    const key = await pbkdf2(
      password,
      salt,
      this.ITERATIONS,
      this.KEY_LENGTH,
      "sha256"
    );
    const cipher = crypto.createCipheriv(this.ALGORITHM, key, iv);

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
  }

  async decrypt(vault, password) {
    const salt = Buffer.from(vault.salt, "hex");
    const iv = Buffer.from(vault.iv, "hex");
    const authTag = Buffer.from(vault.authTag, "hex");
    const encryptedData = Buffer.from(vault.encryptedData, "hex");

    const key = await pbkdf2(
      password,
      salt,
      this.ITERATIONS,
      this.KEY_LENGTH,
      "sha256"
    );
    const decipher = crypto.createDecipheriv(this.ALGORITHM, key, iv);

    decipher.setAuthTag(authTag);

    try {
      const decrypted = Buffer.concat([
        decipher.update(encryptedData),
        decipher.final(),
      ]);
      return JSON.parse(decrypted.toString("utf8"));
    } catch (error) {
      throw new DecryptionError("Invalid master password or corrupted data.");
    }
  }
}

export const vaultEncryption = new VaultEncryption();