import { createBook, getAllBooks, getBookById, updateBook, deleteBook } from '../controllers/bookController.js';
import Book from '../models/bookModel.js';

// Mock the Book model
jest.mock('../models/bookModel.js');

describe('Book Controller Tests', () => {
  let req;
  let res;
  const mockBook = {
    _id: 'book123',
    title: 'Test Book',
    author: 'Test Author',
    publishedYear: 2023,
    genre: 'Fiction'
  };

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    
    // Setup request and response objects
    req = {
      body: {
        title: 'Test Book',
        author: 'Test Author',
        publishedYear: 2023,
        genre: 'Fiction'
      },
      params: {
        id: 'book123'
      }
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('createBook', () => {
    test('should successfully create a new book', async () => {
      // Mock Book constructor and save method
      const mockSavedBook = { ...mockBook };
      const mockBookInstance = {
        save: jest.fn().mockResolvedValue(mockSavedBook)
      };
      Book.mockImplementation(() => mockBookInstance);

      await createBook(req, res);

      // Assertions
      expect(Book).toHaveBeenCalledWith({
        title: 'Test Book',
        author: 'Test Author',
        publishedYear: 2023,
        genre: 'Fiction'
      });
      expect(mockBookInstance.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockSavedBook);
    });

    test('should return error when book creation fails', async () => {
      // Mock save method to throw an error
      const mockError = new Error('Validation failed');
      const mockBookInstance = {
        save: jest.fn().mockRejectedValue(mockError)
      };
      Book.mockImplementation(() => mockBookInstance);

      await createBook(req, res);

      // Assertions
      expect(mockBookInstance.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: mockError.message });
    });
  });

  describe('getAllBooks', () => {
    test('should return all books', async () => {
      // Mock Book.find to return array of books
      const mockBooks = [mockBook, { ...mockBook, _id: 'book456', title: 'Another Book' }];
      Book.find = jest.fn().mockResolvedValue(mockBooks);

      await getAllBooks(req, res);

      // Assertions
      expect(Book.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockBooks);
    });

    test('should handle server errors', async () => {
      // Mock Book.find to throw an error
      const mockError = new Error('Database error');
      Book.find = jest.fn().mockRejectedValue(mockError);

      await getAllBooks(req, res);

      // Assertions
      expect(Book.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: mockError.message });
    });
  });

  describe('getBookById', () => {
    test('should return a book when valid ID is provided', async () => {
      // Mock Book.findById to return a book
      Book.findById = jest.fn().mockResolvedValue(mockBook);

      await getBookById(req, res);

      // Assertions
      expect(Book.findById).toHaveBeenCalledWith('book123');
      expect(res.json).toHaveBeenCalledWith(mockBook);
    });

    test('should return 404 when book is not found', async () => {
      // Mock Book.findById to return null (book not found)
      Book.findById = jest.fn().mockResolvedValue(null);

      await getBookById(req, res);

      // Assertions
      expect(Book.findById).toHaveBeenCalledWith('book123');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Book not found' });
    });

    test('should handle server errors', async () => {
      // Mock Book.findById to throw an error
      const mockError = new Error('Invalid ID format');
      Book.findById = jest.fn().mockRejectedValue(mockError);

      await getBookById(req, res);

      // Assertions
      expect(Book.findById).toHaveBeenCalledWith('book123');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: mockError.message });
    });
  });

  describe('updateBook', () => {
    test('should update and return the book when valid ID is provided', async () => {
      // Mock Book.findByIdAndUpdate to return updated book
      const updatedMockBook = { ...mockBook, title: 'Updated Title' };
      Book.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedMockBook);

      await updateBook(req, res);

      // Assertions
      expect(Book.findByIdAndUpdate).toHaveBeenCalledWith('book123', req.body, { new: true });
      expect(res.json).toHaveBeenCalledWith(updatedMockBook);
    });

    test('should handle validation errors during update', async () => {
      // Mock Book.findByIdAndUpdate to throw an error
      const mockError = new Error('Validation failed');
      Book.findByIdAndUpdate = jest.fn().mockRejectedValue(mockError);

      await updateBook(req, res);

      // Assertions
      expect(Book.findByIdAndUpdate).toHaveBeenCalledWith('book123', req.body, { new: true });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: mockError.message });
    });
  });

  describe('deleteBook', () => {
    test('should delete book and return success message', async () => {
      // Mock Book.findByIdAndDelete to resolve successfully
      Book.findByIdAndDelete = jest.fn().mockResolvedValue(mockBook);

      await deleteBook(req, res);

      // Assertions
      expect(Book.findByIdAndDelete).toHaveBeenCalledWith('book123');
      expect(res.json).toHaveBeenCalledWith({ message: 'Book deleted successfully' });
    });

    test('should handle server errors during deletion', async () => {
      // Mock Book.findByIdAndDelete to throw an error
      const mockError = new Error('Database error');
      Book.findByIdAndDelete = jest.fn().mockRejectedValue(mockError);

      await deleteBook(req, res);

      // Assertions
      expect(Book.findByIdAndDelete).toHaveBeenCalledWith('book123');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: mockError.message });
    });
  });
});