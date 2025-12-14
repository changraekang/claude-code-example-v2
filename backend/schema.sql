-- Database schema for demo
-- IMPORTANT: The user_type values are ONLY documented here in comments!

CREATE DATABASE IF NOT EXISTS demo_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE demo_db;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  user_type TINYINT NOT NULL COMMENT '0: regular user, 1: external user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_user_type (user_type),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB COMMENT='User table with type distinction';

-- Sample data
INSERT INTO users (username, email, user_type) VALUES
  ('john_doe', 'john@example.com', 0),
  ('jane_external', 'jane@external.com', 1),
  ('bob_user', 'bob@example.com', 0),
  ('alice_external', 'alice@external.com', 1);
