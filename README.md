# School Management API

A Node.js RESTful API for managing school data, allowing users to add new schools and retrieve schools sorted by proximity to a user-specified location.

## Features

- Add new schools with location data
- List schools sorted by proximity to user location
- Input validation
- Error handling

## Tech Stack

- Node.js
- Express.js
- MySQL
- Haversine formula for distance calculation

## API Endpoints

### Add School
- **Endpoint:** `/addSchool`
- **Method:** POST
- **Payload:**
  ```json
  {
    "name": "School Name",
    "address": "School Address",
    "latitude": 12.345678,
    "longitude": 12.345678
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "School added successfully",
    "data": {
      "id": 1,
      "name": "School Name",
      "address": "School Address",
      "latitude": 12.345678,
      "longitude": 12.345678
    }
  }
  ```

### List Schools
- **Endpoint:** `/listSchools?latitude=12.345678&longitude=12.345678`
- **Method:** GET
- **Parameters:** 
  - `latitude`: User's latitude
  - `longitude`: User's longitude
- **Response:**
  ```json
  {
    "success": true,
    "message": "Schools retrieved successfully",
    "count": 2,
    "data": [
      {
        "id": 1,
        "name": "School Name",
        "address": "School Address",
        "latitude": 12.345678,
        "longitude": 12.345678,
        "created_at": "2023-05-23T12:00:00.000Z",
        "distance": 0.5
      },
      {
        "id": 2,
        "name": "Another School",
        "address": "Another Address",
        "latitude": 12.444444,
        "longitude": 12.444444,
        "created_at": "2023-05-23T12:30:00.000Z",
        "distance": 2.7
      }
    ]
  }
  ```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Configure environment variables in `.env` file:
   ```
   PORT=3000
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=school_management
   NODE_ENV=development
   ```
4. Start the server:
   ```
   npm start
   ```
   For development with auto-restart:
   ```
   npm run dev
   ```

## Testing with Postman

Import the Postman collection at [Postman Collection Link].

## Deployment

This API can be deployed on any Node.js hosting service like Heroku, AWS, or Digital Ocean.

## License

This project is licensed under the MIT License.# Assignment
