# Book Management API with JWT Authentication

This is a **Book API** built with **Node.js**, **Express.js**, **MongoDB**, and **JWT Authentication**. It allows users to manage a collection of books with **CRUD** functionality, and **JWT Authentication** is required for some routes (create, update, delete).

## Features

- **JWT Authentication** for secured routes.
- **CRUD** operations to manage books.
- **MongoDB** for storing books and user credentials.
- **User Registration** and **Login** with password encryption.

## Technologies

- **Node.js** (Backend)
- **Express.js** (Web framework)
- **MongoDB** (Database)
- **JWT** (Authentication)
- **bcryptjs** (Password hashing)
- **dotenv** (Environment variables)

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) installed.
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running (or use a cloud MongoDB instance like MongoDB Atlas).

### Steps to Set Up

1. **Clone the Repository**

   Open your terminal and run:

   git clone https://github.com/sachin4real/BooksManagement_RestApi.git  
   cd BooksManagement_Rest

2. **Install Dependencies**

   Run the following command to install all the required dependencies:

   npm install

3. **Create `.env` File**

   Add the following to your `.env` file:

   PORT=8000  
   MONGO_URI=mongodb:                           # MongoDB URI  
   JWT_SECRET=your_jwt_secret_key               # JWT Secret key

4. **Run the Application**

   After the installation, start the application using:

   npm start

   The server will now run at `http://localhost:8000`.

## API Endpoints

### Authentication Routes

- **POST** /api/auth/register  
  - Register a new user.

- **POST** /api/auth/login  
  - Login and get a JWT token.

### Book Routes (Protected by JWT Authentication)

- **GET** /api/books  
  - Get all books (public route).

- **GET** /api/books/:id  
  - Get a book by ID (public route).

- **POST** /api/books  
  - Create a new book (protected route).  
  - **Authorization**: `Bearer <your_jwt_token>`

- **PUT** /api/books/:id  
  - Update a book by ID (protected route).  
  - **Authorization**: `Bearer <your_jwt_token>`

- **DELETE** /api/books/:id  
  - Delete a book by ID (protected route).  
  - **Authorization**: `Bearer <your_jwt_token>`



Created with ❤️ by [SachinthaWaduge](https://github.com/sachin4real).
