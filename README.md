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