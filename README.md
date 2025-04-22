# Book Management API with JWT Authentication

This is a  **Book API** built with **Node.js**, **Express.js**, **MongoDB**, and **JWT Authentication**. It allows users to manage a collection of books, with full CRUD functionality, and requires **JWT Authentication** for certain routes (create, update, delete).

## Features

- **JWT Authentication** for secured routes.
- **CRUD** operations on books.
- **MongoDB** database to store books and user credentials.
- **User Registration** and **Login** with password encryption.
- **RESTful API** with routes for book management.

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

### Step 1: Clone the Repository

### bash
- git clone https://github.com/sachin4real/BooksManagement_RestApi.git
- cd BooksManagement_Rest


## API Endpoints

### Authentication Routes

- `POST /api/auth/register`
- `POST /api/auth/login`

### Book Routes (Protected by JWT Authentication)

- `GET /api/books`
- `GET /api/books/:id`
- `POST /api/books`
- `PUT /api/books/:id`
- `DELETE /api/books/:id`
