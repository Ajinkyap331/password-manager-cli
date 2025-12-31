import { vaultEncryption } from "../src/utils/crypto.js";
import { DecryptionError } from "../src/utils/errors.js";
import assert from "node:assert";
import test from "node:test";

test("VaultEncryption - encrypt and decrypt", async (t) => {
  const data = { secret: "my-password-123" };
  const password = "master-password";

  await t.test("should successfully encrypt and then decrypt data", async () => {
    const encrypted = await vaultEncryption.encrypt(data, password);
    
    assert.ok(encrypted.salt, "should have salt");
    assert.ok(encrypted.iv, "should have iv");
    assert.ok(encrypted.authTag, "should have authTag");
    assert.ok(encrypted.encryptedData, "should have encryptedData");

    const decrypted = await vaultEncryption.decrypt(encrypted, password);
    assert.deepStrictEqual(decrypted, data, "decrypted data should match original data");
  });

  await t.test("should throw DecryptionError with incorrect password", async () => {
    const encrypted = await vaultEncryption.encrypt(data, password);
    
    await assert.rejects(
      async () => {
        await vaultEncryption.decrypt(encrypted, "wrong-password");
      },
      {
        name: "DecryptionError",
        message: "Invalid master password or corrupted data.",
      }
    );
  });

  await t.test("should throw error with corrupted data", async () => {
    const encrypted = await vaultEncryption.encrypt(data, password);
    const corruptedVault = { ...encrypted, encryptedData: "corrupted" };

    await assert.rejects(
      async () => {
        await vaultEncryption.decrypt(corruptedVault, password);
      },
      DecryptionError
    );
  });
});
