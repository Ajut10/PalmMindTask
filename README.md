# LiveChat API Documentation

This is a RESTful API for user management and real-time chat functionality with authentication and authorization features.

## Base URL

```
http://localhost:3000
```

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### 1. Register User

Create a new user account.

- **URL**: `/register`
- **Method**: `POST`
- **Authentication**: Not required
- **Request Body**:

```json
{
  "username": "Boha",
  "email": "test3@test.com",
  "password": "test_password"
}
```

- **Success Response (201)**:

```json
{
  "message": "User registered successfully",
  "user": {
    "username": "Boha",
    "email": "test3@test.com",
    "password": "$2b$10$cFK0fQxxBrHEd.GrMGVpgOpQ5eBlJgpWMNGX6dyMAbj8kUOVwy9NK",
    "role": "user",
    "_id": "6909e435b368db04fb7e6e2a",
    "createdAt": "2025-11-04T11:32:05.480Z",
    "updatedAt": "2025-11-04T11:32:05.480Z",
    "__v": 0
  }
}
```

### 2. Login

Authenticate a user and receive a JWT token.

- **URL**: `/login`
- **Method**: `POST`
- **Authentication**: Not required
- **Request Body**:

```json
{
  "email": "test2@test.com",
  "password": "test_password"
}
```

- **Success Response (200)**:

```json
{
  "message": "Login Successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MDliODM3NjkwNmQzY2RkOTQ1OWZlNSIsImVtYWlsIjoidGVzdDJAdGVzdC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTc2MjI1NjM0OSwiZXhwIjoxNzYyMjU5OTQ5fQ.md7eKcHV4s-n3A04xWOx2bCrcNWJwILybPSn08cBQFk",
  "user": {
    "role": "user",
    "_id": "6909b8376906d3cdd9459fe5",
    "username": "Bora",
    "email": "test2@test.com",
    "password": "$2b$10$ssNk8vQYoh03OXbg0do47OPUyym36EeLfbvEnRFREO5VM5Nx00Pke",
    "createdAt": "2025-11-04T08:24:23.976Z",
    "updatedAt": "2025-11-04T08:24:23.976Z",
    "__v": 0
  }
}
```

### 3. Get All Users

Retrieve a list of all users (Admin only).

- **URL**: `/`
- **Method**: `GET`
- **Authentication**: Required (Admin only)
- **Success Response (200)**:

```json
{
  "users": [
    {
      "_id": "69049b505f849c5450502e04",
      "username": "Bohora",
      "email": "test1@test.com",
      "password": "test_password",
      "createdAt": "2025-10-31T11:19:44.124Z",
      "updatedAt": "2025-10-31T11:19:44.124Z",
      "__v": 0,
      "role": "admin"
    },
    {
      "role": "user",
      "_id": "6909b8376906d3cdd9459fe5",
      "username": "Santu",
      "email": "test2@test.com",
      "password": "$2b$10$ssNk8vQYoh03OXbg0do47OPUyym36EeLfbvEnRFREO5VM5Nx00Pke",
      "createdAt": "2025-11-04T08:24:23.976Z",
      "updatedAt": "2025-11-04T11:43:16.526Z",
      "__v": 0
    },
    {
      "_id": "6909e435b368db04fb7e6e2a",
      "username": "Boha",
      "email": "test3@test.com",
      "password": "$2b$10$cFK0fQxxBrHEd.GrMGVpgOpQ5eBlJgpWMNGX6dyMAbj8kUOVwy9NK",
      "role": "admin",
      "createdAt": "2025-11-04T11:32:05.480Z",
      "updatedAt": "2025-11-04T11:32:05.480Z",
      "__v": 0
    }
  ]
}
```

- **Error Response (403)**:

```json
{
  "message": "Access denied"
}
```

### 4. Update User

Update user information.

- **URL**: `/updateUser/:id`
- **Method**: `PUT`
- **Authentication**: Required
- **URL Parameters**: `id=[string]` (User ID)
- **Request Body**:

```json
{
  "username": "Santu",
  "email": "newemail@example.com"
}
```

- **Success Response (200)**:

```json
{
  "message": "User updated successfully",
  "user": {
    "username": "Santu",
    "email": "newemail@example.com",
    "role": "user",
    "_id": "user_id",
    "updatedAt": "timestamp"
  }
}
```

### 5. Delete User

Delete a user account.

- **URL**: `/deleteUser/:id`
- **Method**: `DELETE`
- **Authentication**: Required
- **URL Parameters**: `id=[string]` (User ID)
- **Success Response (200)**:

```json
{
  "message": "User deleted successfully"
}
```

## Chat Endpoints

### Chat Statistics

Get total chat and user counts (Admin only).

- **URL**: `/chats/count`
- **Method**: `GET`
- **Authentication**: Required (Admin only)
- **Success Response (200)**:

```json
{
  "totalChats": 100,
  "totalUsers": 50,
  "message": "Chat and user counts fetched successfully"
}
```

- **Error Response (403)**:

```json
{
  "message": "Access denied"
}
```

## WebSocket Events

The application also supports real-time chat functionality using Socket.IO.

### Connection

```javascript
socket.on("connection");
```

### Join Chat

```javascript
socket.emit("join", username);
```

- **Response Event**: `user-join`

```json
{
  "message": "username joined the chat"
}
```

### Send Message

```javascript
socket.emit("message", {
  username: "johndoe",
  message: "Hello everyone!",
});
```

- **Response Event**: `message`

```json
{
  "username": "johndoe",
  "message": "Hello everyone!",
  "_id": "message_id"
}
```

### Disconnect

```javascript
socket.on("disconnect");
```

- **Response Event**: `user-left`

```json
{
  "message": "username left the chat"
}
```

## Error Responses

Common error responses include:

- **401 Unauthorized**:

```json
{
  "message": "Invalid Credentials"
}
```

- **403 Forbidden**:

```json
{
  "message": "Access denied"
}
```

- **500 Internal Server Error**:

```json
{
  "message": "Error message",
  "error": "Error details"
}
```

## Schemas

### User Schema

```javascript
{
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}
```

### Chat Schema

```javascript
{
    sender: {
        type: String,
        ref: "User",
        required: true
    },
    receiver: {
        type: String,
        ref: "User",
        required: false
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    room: {
        type: String,
        default: "global"
    }
}
```
