# Password Manager CLI (PMC)

A command-line interface (CLI) tool for managing your passwords efficiently. This tool allows you to add, list, copy, and delete passwords, as well as link to your password manager's host.

## Features

- **Secure Password Management**: Add, list, copy, and delete passwords.
- **Host Configuration**: Easily link your CLI to a password manager backend by specifying its host IP.
- **Clipboard Integration**: Copy passwords directly to your clipboard for quick use.
- **Modular Structure**: Built with a clear separation of concerns for easy maintenance and extensibility.

## Installation

To set up the CLI for development and make it globally accessible on your system:

```bash
just setup
```

## Usage

```bash
pmc --help
```

### API Contract

For details on the backend API endpoints and data structures that this CLI interacts with, please refer to the [API Contract Documentation](./docs/API_CONTRACT.md).
