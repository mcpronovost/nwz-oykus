# Authentication API Documentation

This document describes the JWT-based authentication system implemented in the Oykus backend.

## Overview

The authentication system provides three main endpoints:

- `/api/auth/register` - User registration
- `/api/auth/login` - User login
- `/api/auth/verify` - Token verification

## Endpoints

### Register User

**POST** `/api/auth/register`

Register a new user with email, username, password, and playername.

**Request Body:**

```json
{
  "email": "user@example.com",
  "username": "username",
  "password": "password123",
  "playername": "PlayerName"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Registration successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "playername": "PlayerName",
    "abbr": "P"
  }
}
```

### Login User

**POST** `/api/auth/login`

Authenticate a user with username and password.

**Request Body:**

```json
{
  "username": "username",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "playername": "PlayerName",
    "abbr": "P"
  }
}
```

### Verify Token

**POST** `/api/auth/verify`

Verify a JWT token and return user information.

**Request Body:**

```json
{
  "token": "jwt_token_here"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Token is valid",
  "user": {
    "id": "user_id",
    "playername": "PlayerName",
    "abbr": "P"
  }
}
```

## Security Features

1. **Password Hashing**: Passwords are hashed using bcrypt with salt
2. **JWT Tokens**: Authentication tokens expire after 24 hours
3. **Input Validation**: All inputs are validated before processing
4. **Error Handling**: Proper error responses for various scenarios

## Environment Variables

Set the following environment variable for production:

- `JWT_SECRET_KEY`: Secret key for JWT token signing (defaults to "jwt-secret-key" in development)

## Usage in Frontend

To use the authentication in your frontend application:

1. Store the JWT token in localStorage or secure storage
2. Include the token in the Authorization header for protected requests:
   ```
   Authorization: Bearer <jwt_token>
   ```
3. Handle token expiration by redirecting to login when receiving 401 responses

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP status codes:

- `400` - Bad Request (missing or invalid data)
- `401` - Unauthorized (invalid credentials or expired token)
- `500` - Internal Server Error
