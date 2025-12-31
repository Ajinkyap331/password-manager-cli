import os from "os";
import path from "path";

export const SERVICE_NAME = "PMC-CLI";
export const ACCOUNT_NAME = "MasterPassword";

export const HOME_DIRECTORY = os.homedir();
export const STORAGE_DIRECTORY = path.join(
  HOME_DIRECTORY,
  ".config",
  "pmc",
  "passwords.json"
);

export const DEFAULT_DATA = { vault: null };
