User Management API

This is a Node.js API application for managing user data with basic CRUD operations, user validation, login, registration, and filtering functionality. It uses MongoDB as the database with Mongoose for database interaction and JWT for authentication.

Features

    1. User Registration: Register users with validations (name, email, password, role, phone, city, country).
    2. User Login: Authenticate users with email and password, returning a JWT token.
    3. List Users: Admins can list all users with search (by name and email) and filter (by country) options.
    4. User Details: Fetch user details by ID. Admins can view any user's details, while users can only access their own data.

Tech Stack
Node.js: Backend runtime.
Express.js: Framework for building web apps.
MongoDB & Mongoose: Database and object modeling.
JWT: Authentication tokens.
Bcrypt.js: Password hashing.
Dotenv: Manage environment variables.

Prerequisites
Before you begin, ensure you have installed the following:
Node.js (v14 or higher)
MongoDB (running locally or in the cloud)

Getting Started

    1. Clone the Repository
        - git clone https://github.com/adarsh-27/ownai_user_management.git
        - cd user-management-api

    2. Install Dependencies
        - npm install

    3. Setup Environment Variables
    Create a .env file in the root directory and add the following:
        - MONGO_URI=mongodb://localhost:27017/user_management
        - JWT_SECRET=your_jwt_secret
        - PORT=5000

        Replace MONGO_URI with your MongoDB connection string.
        Replace JWT_SECRET with a random secret string used to sign JWT tokens.

    4. Run the Application
    Start the development server:
        - npm run start

API Endpoints

    1. User Registration
        - POST /api/auth/register
        - Request Body:
            {
                "name": "John Doe",
                "email": "john@example.com",
                "password": "123456",
                "role": "Staff",
                "phone": "1234567890",
                "city": "New York",
                "country": "USA"
            }

    2. User Login
    - POST /api/auth/login
    - Request Body:
        {
            "email": "john@example.com",
            "password": "123456"
        }

    3. Get All Users (Admin Only)
    - GET /api/users
    - Headers: Authorization: Bearer <JWT Token>
    - Query Parameters:
        name (optional): Search by name
        email (optional): Search by email
        country (optional): Filter by country

    4. Get User Details
    - GET /api/users/:id
    - Headers: Authorization: Bearer <JWT Token>
