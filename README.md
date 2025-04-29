
# HemoBridge Project

HemoBridge is a comprehensive solution designed to streamline and enhance healthcare management. This project aims to provide an efficient platform for managing patient data, appointments, and medical records.

## Features

- **Patient Management**: Easily add, update, and manage patient information.
- **Appointment Scheduling**: Simplified scheduling and tracking of appointments.
- **Medical Records**: Secure storage and retrieval of patient medical history.
- **User-Friendly Interface**: Intuitive design for seamless navigation.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/HemoBridge_Project.git
    ```
2. Navigate to the project directory:
    ```bash
    cd HemoBridge_Project
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the application:
    ```bash
    npm start
    ```

## Usage

1. Open the application in your browser at `http://localhost:3000`.
2. Log in or create an account.
3. Start managing patient data and appointments.

## Technologies Used

- **Frontend**: React, HTML, CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB

## API Documentation

### Authentication Routes

#### Login
- **URL**: `/auth/login`
- **Method**: `POST`
- **Request Body**:
    ```json
    {
        "email": "user@example.com",
        "password": "password123"
    }
    ```
- **Response**:
    ```json
    {
        "success": true,
        "message": "Authentication successful",
        "user": {
            "id": "user-id",
            "email": "user@example.com",
            "role": "donor"
        }
    }
    ```

#### Logout
- **URL**: `/auth/logout`
- **Method**: `POST`
- **Response**:
    ```json
    {
        "success": true,
        "message": "Logged out successfully"
    }
    ```

### User Management Routes

#### Register Donor
- **URL**: `/users/register/donor`
- **Method**: `POST`
- **Request Body**:
    ```json
    {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "password": "password123",
        "phoneNumber": "1234567890",
        "bloodType": "O+",
        "address": "123 Main St"
    }
    ```
- **Response**:
    ```json
    {
        "success": true,
        "message": "New donor user created successfully",
        "user": {
            "id": "user-id",
            "email": "john.doe@example.com",
            "role": "donor"
        }
    }
    ```

#### Register Caregiver
- **URL**: `/users/register/care-giver`
- **Method**: `POST`
- **Request Body**:
    ```json
    {
        "firstName": "Jane",
        "lastName": "Smith",
        "email": "jane.smith@example.com",
        "password": "password123",
        "phoneNumber": "9876543210",
        "address": "456 Elm St"
    }
    ```
- **Response**:
    ```json
    {
        "success": true,
        "message": "New care giver user created successfully"
    }
    ```

#### Fetch Current User Profile
- **URL**: `/profile`
- **Method**: `GET`
- **Headers**:
    ```json
    {
        "Authorization": "Bearer <JWT-TOKEN>"
    }
    ```
- **Response**:
    ```json
    {
        "success": true,
        "data": {
            "id": "user-id",
            "email": "user@example.com",
            "phone_number": "1234567890",
            "role": "donor",
            "created_at": "2025-04-13T12:00:00Z",
            "updated_at": "2025-04-13T12:00:00Z"
        }
    }
    ```
- **Error (Unauthorized)**:
    ```json
    {
        "success": false,
        "message": "Unauthorized. Please log in."
    }
    ```

### Health Care Facility Routes

#### Create Facility
- **URL**: `/facility`
- **Method**: `POST`
- **Headers**:
    ```json
    {
        "Authorization": "Bearer <JWT-Token>"
    }
    ```
- **Request Body**:
    ```json
    {
        "name": "City Hospital",
        "address": "789 Pine St",
        "email": "contact@cityhospital.com",
        "phoneNumber": "5551234567",
        "operationalHours": "9 AM - 5 PM"
    }
    ```
- **Response**:
    ```json
    {
        "success": true,
        "message": "New health care facility created successfully",
        "data": {
            "id": "facility-id",
            "name": "City Hospital",
            "address": "789 Pine St",
            "contactInfo": {
                "email": "contact@cityhospital.com",
                "phoneNumber": "5551234567"
            },
            "operationalHours": "9 AM - 5 PM"
        }
    }
    ```

#### Fetch Facilities (By Id)
- **URL**: `/facility/:facilityId`
- **Method**: `GET`
- **Headers**:
    ```json
    {
        "Authorization": "Bearer <JWT-Token>"
    }
    ```
- **Response**:
    ```json
    {
        "success": true,
        "message": "Health care facility retrieved successfully",
        "data": {
            "id": "facility-id",
            "name": "City Hospital",
            "address": "789 Pine St",
            "contactInfo": {
                "email": "contact@cityhospital.com",
                "phoneNumber": "5551234567"
            },
            "operationalHours": "9 AM - 5 PM"
        }
    }
    ```

#### Fetch Facilities (Paginated)
- **URL**: `/facility/:page`
- **Method**: `GET`
- **Headers**:
    ```json
    {
        "Authorization": "Bearer <JWT-Token>"
    }
    ```
- **Response**:
    ```json
    {
        "success": true,
        "message": "Health care facilities retrieved successfully",
        "data": {
            "list": [
                {
                    "id": "facility-id",
                    "name": "City Hospital",
                    "address": "789 Pine St",
                    "contactInfo": {
                        "email": "contact@cityhospital.com",
                        "phoneNumber": "5551234567"
                    },
                    "operationalHours": "9 AM - 5 PM"
                }
            ],
            "currentPage": 1,
            "totalPages": 10
        }
    }
    ```

---
## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature-name
    ```
3. Commit your changes:
    ```bash
    git commit -m "Add feature-name"
    ```
4. Push to the branch:
    ```bash
    git push origin feature-name
    ```
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
