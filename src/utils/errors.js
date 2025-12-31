export class AppError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class DecryptionError extends AppError {
  constructor(message = "Decryption failed.") {
    super(message);
  }
}

export class KeychainError extends AppError {
  constructor(message = "Keychain operation failed.") {
    super(message);
  }
}

export class StorageError extends AppError {
  constructor(message = "Storage operation failed.") {
    super(message);
  }
}
