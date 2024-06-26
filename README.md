# E-Shop API
## Table of Contents

- [Introduction](#introduction)
- [Features](#installation)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [File Structure](#file-structure)
- [API Endpoints](#api-endpoints)
    - [User Authentication](#user-uthentication)
    - [User Management](#user-management)
- [Contributing](#contributing)

## Introduction

The E-Shop API is a backend service for an e-commerce application, providing functionalities such as user authentication, product catalog management, and order processing. This API is built using Node.js, Express, MongoDB, and other modern technologies.

## Features

- User authentication and authorization
- Admin functionalities to manage users
- Product catalog management (to be implemented)
- Order processing (to be implemented)
- Email verification for user registration

## Technology Stack

- Backend: Node.js, Express
- Database: MongoDB, Mongoose
- Authentication: JWT
- Email Service: Nodemailer

## Installation

To get started with the E-Shop API, follow these steps:

1. Clone the repository:
```bash
git clone https://github.com/Butawantemi/e-shop
cd e-shop
```
2. Install dependencies:
```bash
npm install
```
3. Set up environment variables:
Create a .env file in the root directory and add the following variables:
```makefile
PORT=4000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL=your_email
PASSWORD=your_email_password
API_URL=/api
```
4. Start the application:
```bash
npm start
```

## Configuration

Ensure you have the following environment variables configured in your .env file:

- PORT: The port on which the server will run.
- MONGO_URI: Your MongoDB connection string.
- JWT_SECRET: Secret key for JWT token generation.
- EMAIL: Email address used for sending verification emails.
- PASSWORD: Password for the email account used for sending emails.
- API_URL: Base URL for the API.

## File Structure

Here is the basic structure of the project:
```bash
├── src
│   ├── Config
│   │   └── jwtToken.js
│   ├── Controllers
│   │   └── auth.controller.js
│   ├── Middleware
│   │   └── authMiddleware.js
│   ├── Models
│   │   └── user.model.js
│   ├── Routes
│   │   └── userRoutes.js
│   ├── Utils
│   │   └── sendEmail.js
│   ├── app.js
│   └── server.js
├── .env
├── .gitignore
├── package.json
├── README.md
```
## API Endpoints
- User Authentication
  - Register User: POST /api/users/register
  - Login User: POST /api/users/login
  - Verify Email: GET /api/users/verify-email?token=your_verification_token

- User Management
  - Get All Users: GET /api/v1/users
  - Get Single User: GET /api/v1/users/:id
  - Update User: PUT /api/v1/users/:id
  - Delete User: DELETE /api/v1/users/:id
  - Block User: PUT /api/v1/users/block/:id
  - Unblock User: PUT /api/v1/users/unblock/:id