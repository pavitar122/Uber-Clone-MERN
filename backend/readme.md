# Backend API Documentation

## User Registration Endpoint

This document details the `/users/register` endpoint which is used to register a new user.

### Endpoint Details

- **URL:** `/users/register`
- **Method:** `POST`
- **Description:** Registers a new user by accepting user details, hashing the password, storing the user in the database, and generating a JWT token.

### Request Body

The request should be in JSON format and include the following fields:

- **fullname.firstName** (string, required): Must be at least 3 characters.
- **fullname.lastName** (string, optional): If provided, should be at least 3 characters.
- **email** (string, required): Must be a valid email address.
- **password** (string, required): Must be at least 6 characters.

#### Sample Request

```json
{
  "fullname": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "secret123"
}


{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "605c5f5173c0c624f4567890",
    "fullname": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
    // other user details...
  }
}


{
  "errors": [
    {
      "msg": "First name must be at least 3 characters",
      "param": "fullname.firstName",
      "location": "body"
    },
    {
      "msg": "Invalid email address",
      "param": "email",
      "location": "body"
    }
    // additional error objects as applicable...
  ]
}