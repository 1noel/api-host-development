const { db } = require('../database');

// Create a new student registration
const createRegistration = (req, res) => {
  const { student_name, course, enrollment_date } = req.body;
  const user_id = req.user.id; // From JWT token

  if (!student_name || !course || !enrollment_date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = 'INSERT INTO student_registration (student_name, course, enrollment_date, user_id) VALUES (?, ?, ?, ?)';
  db.run(query, [student_name, course, enrollment_date, user_id], function(err) {
    if (err) {
      return res.status(500).json({ message: 'Error creating student registration' });
    }

    res.status(201).json({
      message: 'Student registered successfully',
      registration: {
        id: this.lastID,
        student_name,
        course,
        enrollment_date,
        user_id
      }
    });
  });
};

// Get all student registrations for the logged-in user
const getRegistrations = (req, res) => {
  const user_id = req.user.id; // From JWT token

  db.all('SELECT * FROM student_registration WHERE user_id = ?', [user_id], (err, registrations) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    res.json({ registrations });
  });
};

// Get a specific student registration
const getRegistration = (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id; // From JWT token

  db.get('SELECT * FROM student_registration WHERE id = ? AND user_id = ?', [id, user_id], (err, registration) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    if (!registration) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    res.json({ registration });
  });
};

// Update a student registration
const updateRegistration = (req, res) => {
  const { id } = req.params;
  const { student_name, course, enrollment_date } = req.body;
  const user_id = req.user.id; // From JWT token

  if (!student_name || !course || !enrollment_date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = 'UPDATE student_registration SET student_name = ?, course = ?, enrollment_date = ? WHERE id = ? AND user_id = ?';
  db.run(query, [student_name, course, enrollment_date, id, user_id], function(err) {
    if (err) {
      return res.status(500).json({ message: 'Error updating student registration' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'Registration not found or not authorized' });
    }

    res.json({
      message: 'Registration updated successfully',
      registration: {
        id: parseInt(id),
        student_name,
        course,
        enrollment_date,
        user_id
      }
    });
  });
};

// Delete a student registration
const deleteRegistration = (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id; // From JWT token

  db.run('DELETE FROM student_registration WHERE id = ? AND user_id = ?', [id, user_id], function(err) {
    if (err) {
      return res.status(500).json({ message: 'Error deleting student registration' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: 'Registration not found or not authorized' });
    }

    res.json({ message: 'Registration deleted successfully' });
  });
};

module.exports = {
  createRegistration,
  getRegistrations,
  getRegistration,
  updateRegistration,
  deleteRegistration
};
