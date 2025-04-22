import express from 'express';
import { createBook, getAllBooks, getBookById, updateBook, deleteBook } from '../controllers/bookController.js';
import authenticateJWT from '../middleware/authMiddleware.js';

const router = express.Router();

// CRUD Routes with JWT authentication for protected routes
router.post('/', authenticateJWT, createBook);    // Create a new book (protected)
router.get('/', getAllBooks);                     // Get all books (public)
router.get('/:id', getBookById);                  // Get a book by ID (public)
router.put('/:id', authenticateJWT, updateBook);  // Update a book by ID (protected)
router.delete('/:id', authenticateJWT, deleteBook); // Delete a book by ID (protected)

export default router;
