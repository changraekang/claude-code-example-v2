import { Router } from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

// Simple DB connection
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'demo_db',
  waitForConnections: true,
  connectionLimit: 10
});

// GET /api/users - List all users
router.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, username, email, user_type, created_at FROM users ORDER BY created_at DESC'
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/users - Create new user
// Expects: { username, email, user_type }
// IMPORTANT: user_type should be 0 (regular) or 1 (external)
router.post('/users', async (req, res) => {
  try {
    const { username, email, user_type } = req.body;

    if (!username || !email || user_type === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: username, email, user_type'
      });
    }

    // This will FAIL if user_type is not 0 or 1
    const [result] = await pool.execute(
      'INSERT INTO users (username, email, user_type) VALUES (?, ?, ?)',
      [username, email, user_type]
    );

    res.status(201).json({
      success: true,
      data: {
        id: result.insertId,
        username,
        email,
        user_type
      }
    });
  } catch (error) {
    // Will throw error if user_type is invalid
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/users/:id - Get user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, username, email, user_type, created_at FROM users WHERE id = ?',
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/', (req, res) => {
  res.json({
    message: 'Backend API',
    endpoints: {
      'GET /api/users': 'List all users',
      'POST /api/users': 'Create user (requires: username, email, user_type)',
      'GET /api/users/:id': 'Get user by ID'
    },
    note: 'user_type should be 0 (regular user) or 1 (external user)'
  });
});

export default router;
