# HemoBridge_Project
## API Documentation

### Base URL
The base URL for the API is: `http://localhost:8000`
Pre-Deployment Url: `https://hemobridge-project.onrender.com/`

---

### Authentication Routes

#### 1. Register a New User
**Endpoint:** `/auth/register`  
**Method:** `POST`  
**Description:** Registers a new user.  
**Request Body:**
```json
{ 
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "securepassword123",
  "role": "donor",
  "notificationPreferences": {
    "email": true,
    "sms": false,
    "push": true,
    "donationReminders": true,
    "eligibilityUpdates": true,
    "emergencyAlerts": true,
    "marketingCommunications": false
  }
}
```
**Response:**
- **201 Created**
```json
{
    "success": true,
    "message": "User created successfully"
}
```
- **400 Bad Request**
```json
{
    "success": false,
    "message": "Error creating user"
}
```

---

#### 2. Login User
**Endpoint:** `/auth/login`  
**Method:** `POST`  
**Description:** Logs in an existing user.  
**Request Body:**
```json
{
    "email": "string",
    "password": "string"
}
```
**Response:**
- **200 OK**
```json
{
    "success": true,
    "message": "Welcome back [User Name]"
}
```
- **400 Bad Request**
```json
{
    "success": false,
    "message": "Invalid email or password"
}
```

---

### Error Handling
All errors are returned in the following format:
```json
{
    "success": false,
    "message": "Error message",
    "stack": "Error stack trace (only in development mode)"
}
```

---

### Middleware
- **Error Handler:** Handles errors and returns appropriate status codes and messages.
- **Cookie Parser:** Parses cookies for authentication.

---

### Environment Variables
The following environment variables are required:
- `HOST`: The host address (e.g., `localhost`).
- `MONGO_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for JWT.
- `NODE_ENV`: Environment mode (`development` or `production`).

---

### Models

#### User Model
The `User` model contains the following fields:
- `name` (String, required)
- `email` (String, required, unique)
- `password` (String, required)
- `role` (String, default: `donor`, enum: `donor`, `healthcare_staff`, `blood_bank_staff`, `admin`)
- `status` (String, default: `pending`, enum: `active`, `pending`, `suspended`, `inactive`)
- `verificationToken` (String)
- `verificationTokenExpiresAt` (Date)
- `resetToken` (String)
- `resetTokenExpires` (Date)
- `failedLoginAttempts` (Number)
- `lastLogin` (Date, default: current date)
- `createdAt` (Date, default: current date)
- `updatedAt` (Date)
- `notificationPreferences` (Object with fields for email, SMS, push notifications, etc.)

---

### Utilities

#### `generateVerificationCode`
Generates a 6-digit random verification code.

#### `generateTokenAndSetCookie`
Generates a JWT token and sets it as a cookie in the response.

---

### Logging
The application uses `winston` for logging. Logs are stored in `./logs/server.log`.

---

### Database
The application connects to MongoDB using the `MONGO_URI` environment variable.

---

### Running the Application
1. Clone the repository.
2. Install dependencies: `npm install`
3. Create a `.env` file with the required environment variables.
4. Start the server:
     - Development: `npm run dev`
     - Production: `npm start`

---

### Future Enhancements
- Add email verification functionality.
- Implement password reset feature.
- Expand API endpoints for additional user roles and functionalities.
- Add unit and integration tests.
- Improve error handling and logging.

