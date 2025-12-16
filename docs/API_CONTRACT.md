# Backend API Contract for Password Manager CLI

This document outlines the API endpoints, methods, and data structures expected from the backend service that the Password Manager CLI (PMC) interacts with.

**Base URL Structure:** `http://<hostIP>:5421/`

The `<hostIP>` is configured using the `pmc host link <IP_ADDRESS>` command.

---

## 1. Passwords API

This API is responsible for managing password entries.

### a. `GET /passwords` - Retrieve All Passwords

Retrieves a list of all password entries stored in the backend.

*   **Method:** `GET`
*   **Path:** `/passwords`
*   **Authentication:** (Assumed to be handled by backend, not explicitly defined in current CLI)
*   **Request Headers:** (None explicitly sent by CLI for now, could include Authorization in future)
*   **Request Body:** (None)
*   **Response:** `200 OK` - A JSON array of password objects.

    ```json
    [
      {
        "id": "uuid-v4-string-1",
        "url": "example.com",
        "username": "user@example.com",
        "password": "secure_password_1"
      },
      {
        "id": "uuid-v4-string-2",
        "url": "another.com",
        "username": "another_user",
        "password": "secure_password_2"
      },
      // ... more password objects
    ]
    ```

### b. `POST /passwords` - Add a New Password

Adds a new password entry to the backend.

*   **Method:** `POST`
*   **Path:** `/passwords`
*   **Authentication:** (Assumed)
*   **Request Headers:**
    *   `Content-Type: application/json`
*   **Request Body:** A JSON object containing the new password's details.

    ```json
    {
      "url": "new-site.com",
      "username": "new_user",
      "password": "new_secure_password"
    }
    ```
*   **Response:** `200 OK` or `201 Created` - The newly created password object, including its generated `id`.

    ```json
    {
      "id": "uuid-v4-string-3",
      "url": "new-site.com",
      "username": "new_user",
      "password": "new_secure_password"
    }
    ```

### c. `DELETE /passwords/:id` - Delete a Password by ID

Deletes a specific password entry from the backend using its unique ID.

*   **Method:** `DELETE`
*   **Path:** `/passwords/{id}` (where `{id}` is the unique identifier of the password)
*   **Authentication:** (Assumed)
*   **Request Headers:** (None)
*   **Request Body:** (None)
*   **Response:** `200 OK` (or `204 No Content`) - Indicates successful deletion. No content is typically returned for 204.

    ```json
    // Example for 200 OK
    {
      "message": "Password deleted successfully"
    }
    ```
    or
    (No Content for 204)

---

## 2. Host Configuration

The `pmc host link <IP_ADDRESS>` command primarily configures the local CLI's storage to remember the backend server's IP address. There is no explicit "Host API" endpoint for this action in the backend. The `hostIP` is used by the CLI to construct the base URL for the Passwords API.

---