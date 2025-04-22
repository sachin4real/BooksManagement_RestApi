import { registerUser, loginUser } from '../controllers/authController.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// Mock dependencies
jest.mock('../models/userModel.js');
jest.mock('jsonwebtoken');

describe('Auth Controller Tests', () => {
  let req;
  let res;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    
    // Setup request and response objects
    req = {
      body: {
        username: 'testuser',
        password: 'password123'
      }
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('registerUser', () => {
    test('should successfully register a new user', async () => {
      // Mock User constructor and save method
      const mockUserInstance = {
        save: jest.fn().mockResolvedValue(undefined)
      };
      User.mockImplementation(() => mockUserInstance);

      await registerUser(req, res);

      // Assertions
      expect(User).toHaveBeenCalledWith({ 
        username: 'testuser', 
        password: 'password123' 
      });
      expect(mockUserInstance.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'User created successfully' });
    });

    test('should return error response when registration fails', async () => {
      // Mock save method to throw an error
      const mockError = new Error('Username already exists');
      const mockUserInstance = {
        save: jest.fn().mockRejectedValue(mockError)
      };
      User.mockImplementation(() => mockUserInstance);

      await registerUser(req, res);

      // Assertions
      expect(mockUserInstance.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: mockError.message });
    });
  });

  describe('loginUser', () => {
    test('should successfully login user and return JWT token', async () => {
      // Mock successful user retrieval and password comparison
      const mockUser = {
        _id: 'user123',
        comparePassword: jest.fn().mockResolvedValue(true)
      };
      User.findOne = jest.fn().mockResolvedValue(mockUser);
      
      // Mock JWT sign
      const mockToken = 'generated.jwt.token';
      jwt.sign = jest.fn().mockReturnValue(mockToken);

      // Set environment variable for test
      process.env.JWT_SECRET = 'test_secret';

      await loginUser(req, res);

      // Assertions
      expect(User.findOne).toHaveBeenCalledWith({ username: 'testuser' });
      expect(mockUser.comparePassword).toHaveBeenCalledWith('password123');
      expect(jwt.sign).toHaveBeenCalledWith(
        { userId: 'user123' },
        'test_secret',
        { expiresIn: '24h' }
      );
      expect(res.json).toHaveBeenCalledWith({ token: mockToken });
    });

    test('should return error when user does not exist', async () => {
      // Mock User.findOne to return null (user not found)
      User.findOne = jest.fn().mockResolvedValue(null);

      await loginUser(req, res);

      // Assertions
      expect(User.findOne).toHaveBeenCalledWith({ username: 'testuser' });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });

    test('should return error when password is incorrect', async () => {
      // Mock user with failed password comparison
      const mockUser = {
        comparePassword: jest.fn().mockResolvedValue(false)
      };
      User.findOne = jest.fn().mockResolvedValue(mockUser);

      await loginUser(req, res);

      // Assertions
      expect(User.findOne).toHaveBeenCalledWith({ username: 'testuser' });
      expect(mockUser.comparePassword).toHaveBeenCalledWith('password123');
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });

    test('should handle server errors during login', async () => {
      // Mock findOne to throw an error
      const mockError = new Error('Database connection failed');
      User.findOne = jest.fn().mockRejectedValue(mockError);

      await loginUser(req, res);

      // Assertions
      expect(User.findOne).toHaveBeenCalledWith({ username: 'testuser' });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: mockError.message });
    });
  });
});