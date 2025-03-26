# HemoBridge_Project
## API Documentation

### Base URL
The base URL for the API is: `http://localhost:8000`
Pre-Deployment Url: `https://hemobridge-project.onrender.com/`

---

### Authentication Routes

#### 1. Register a New Donor
**Endpoint:** `/auth/register/donor`  
**Method:** `POST`  
**Description:** Registers a new donor.  
**Request Body:**
```json
{ 
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "securepassword123",
    "phone": "1234567890",
    "dateOfBirth": "1990-01-01",
    "gender": "male",
    "bloodType": "O+",
    "address": "123 Main Street"
}
```
**Response:**
- **201 Created**
```json
{
        "success": true,
        "message": "Donor successfully created",
        "user": {
                "name": "John Doe",
                "email": "johndoe@example.com",
                "role": "donor"
        },
        "donor": {
                "phone": "1234567890",
                "dateOfBirth": "1990-01-01",
                "gender": "male",
                "bloodType": "O+",
                "address": "123 Main Street"
        }
}
```
- **400 Bad Request**
```json
{
        "success": false,
        "message": "Error creating Donor"
}
```

---

#### 2. Register a New Facility
**Endpoint:** `/auth/register/facility`  
**Method:** `POST`  
**Description:** Registers a new healthcare facility.  
**Request Body:**
```json
{
    "facilityName": "HealthCare Center",
    "personnelName": "Jane Doe",
    "email": "janedoe@example.com",
    "phone": "9876543210",
    "personnelRole": "Doctor",
    "address": "456 Health Street",
    "password": "securepassword123"
}
```
**Response:**
- **201 Created**
```json
{
        "success": true,
        "message": "Facility successfully created",
        "user": {
                "name": "Jane Doe",
                "email": "janedoe@example.com",
                "role": "healthcare_staff"
        },
        "facility": {
                "facilityName": "HealthCare Center",
                "personnelName": "Jane Doe",
                "email": "janedoe@example.com",
                "phone": "9876543210",
                "personnelRole": "Doctor",
                "address": "456 Health Street"
        }
}
```
- **400 Bad Request**
```json
{
        "success": false,
        "message": "Error creating Facility"
}
```

---

#### 3. Login User
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
- `role` (String, default: `donor`, enum: `donor`, `healthcare_staff`, `admin`)
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

#### Donor Model
The `Donor` model contains the following fields:
- `userId` (ObjectId, required, reference to `User`)
- `phone` (String, required)
- `dateOfBirth` (Date, required)
- `gender` (String, enum: `male`, `female`, required)
- `bloodType` (String, enum: `A+`, `A-`, `B+`, `B-`, `AB+`, `AB-`, `O+`, `O-`, required)
- `address` (String, required)
- `medicalHistory` (Object with fields for chronic conditions, infectious diseases, etc.)

#### Facility Model
The `Facility` model contains the following fields:
- `userId` (ObjectId, required, reference to `User`)
- `facilityName` (String, required)
- `personnelName` (String, required)
- `personnelRole` (String, required)
- `email` (String, required)
- `phone` (String, required)
- `address` (String, required)
- `facilityType` (String, enum: `hospital`, `blood_bank`, `clinic`, default: `hospital`)

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
- Add support for healthcare staff and facility management.
- Implement donor eligibility tracking and notifications.
- Enhance security with two-factor authentication.
- Add analytics and reporting features.
- Integrate with external APIs for blood donation campaigns.
- Improve UI/UX for the frontend application.
- Add multilingual support.
- Optimize database queries for better performance.
- Implement real-time notifications using WebSockets.
- Add role-based access control for admin and staff users.
- Integrate payment gateway for donations.
- Add mobile app support.
- Implement AI-based donor matching.
- Add support for exporting data in various formats.
- Enhance testing coverage with automated tests.
- Add support for offline mode in the frontend application.
- Implement a chatbot for user support.
- Add support for voice commands.
- Integrate with wearable devices for health tracking.
- Add support for blockchain-based data storage.
- Implement gamification features to encourage donations.
- Add support for augmented reality in the frontend application.
- Implement a recommendation system for donors and recipients.
- Add support for virtual reality in the frontend application.
- Implement a machine learning model for predicting donor eligibility.
- Add support for IoT devices for blood storage monitoring.
- Implement a decentralized system for blood donation.
- Add support for cloud-based data storage.
- Implement a peer-to-peer system for blood donation.
- Add support for edge computing for real-time data processing.
- Implement a distributed system for blood donation.
- Add support for quantum computing for complex data analysis.
- Implement a hybrid system for blood donation.
- Add support for 5G networks for faster data transfer.
- Implement a serverless architecture for better scalability.
- Add support for containerization for easier deployment.
- Implement a microservices architecture for better modularity.
- Add support for DevOps practices for better collaboration.
- Implement a CI/CD pipeline for faster development.
- Add support for agile methodologies for better project management.
- Implement a Kanban board for better task tracking.
- Add support for Scrum practices for better team collaboration.
- Implement a Lean approach for better resource utilization.
- Add support for Six Sigma practices for better quality control.
- Implement a TQM approach for better customer satisfaction.
