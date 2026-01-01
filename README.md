# Password Manager CLI (PMC)

A secure command-line interface (CLI) tool for managing your passwords efficiently.

[Github Repo Link](https://github.com/Ajinkyap331/password-manager-cli)

## Features

- **End-to-End Encryption**: All passwords are encrypted with **AES-256-GCM** using a Master Password.
- **System Keychain Integration**: Securely store your Master Password in your OS keychain (macOS, Windows, or Linux) for seamless access.
- **Interactive Mode**: Securely add passwords via interactive prompts to keep them out of your terminal history.
- **Clipboard Integration**: Copy passwords directly to your clipboard for quick use.
- **Standalone Local Storage**: Your vault is stored locally in `~/.config/pmc/passwords.json`.

## Installation

To set up the CLI for development and make it globally accessible on your system:

```bash
just setup
```

## Usage

```bash
pmc --help
```

## User Guide

### 1. Setup & Adding Passwords
The safest way to add a password is using the interactive mode. This prevents your password from being saved in your terminal history.

```bash
pmc add
```
*You will be prompted for the URL, Username, and Password.*

### 2. Listing Passwords
To see all your stored accounts (passwords remain hidden):

```bash
pmc list
```
*Note the **index** number of the entry you want to use.*

### 3. Copying to Clipboard
To use a password, copy it directly to your clipboard using its index:

```bash
pmc copy <index>
```
*Example: `pmc copy 0`*

### 4. Updating an Entry
If you change a password or username:

```bash
pmc update <index>
```
*This will prompt you with the current values, which you can edit or keep.*

### 5. Deleting an Entry
To remove a password permanently:

```bash
pmc delete <index>
```

### 6. Serving via HTTP
Start a local HTTP server to interact with other applications (e.g., UI or browser extensions).

```bash
pmc serve
```
*Starts a server at `http://localhost:7474`. You can query passwords via `GET /password?url=<url>`.*

---

### Security Tip: The Master Password
The first time you use PMC, you'll create a **Master Password**.
- **Keychain:** We recommend saying "Yes" when asked to save it to the System Keychain. This allows you to use PMC without typing your Master Password every time.
- **Lost Password:** If you lose your Master Password, **your data cannot be recovered**. Keep it safe!

## Contribution

Contributions are welcome! If you'd like to improve PMC, please follow these steps:

1. **[Fork the repository](https://github.com/Ajinkyap331/password-manager-cli)** on GitHub.
2. **Clone your fork** locally: `git clone https://github.com/YOUR_USERNAME/password-manager-cli.git`.
3. **Create a new branch** for your feature or bugfix: `git checkout -b feature-name`.
4. **Make your changes** and ensure everything works as expected.
5. **Commit your changes**: `git commit -m "Add feature name"`.
6. **Push to your branch**: `git push origin feature-name`.
7. **Create a Pull Request** on the original repository.

Please ensure your code follows the existing style and structure of the project.
