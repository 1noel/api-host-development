const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create a new database connection
const dbPath = path.resolve(__dirname, '../database.sqlite');
const db = new sqlite3.Database(dbPath);

// Initialize database tables
const initializeDatabase = () => {
  db.serialize(() => {
    // Create users table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create student_registration table
    db.run(`
      CREATE TABLE IF NOT EXISTS student_registration (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_name TEXT NOT NULL,
        course TEXT NOT NULL,
        enrollment_date DATETIME NOT NULL,
        user_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    `);

    console.log('Database initialized successfully');
  });
};

module.exports = {
  db,
  initializeDatabase
};
